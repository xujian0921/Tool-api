const fs = require("fs")
const path = require("path")
const request = require("request")
const PDFParser = require('pdf2json')
const uuid = require('uuid')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, prettyPrint } = format

const dirPath = path.join(__dirname, "../public/downloadPdf")

const logger = createLogger({
  format: combine(
      timestamp(),
      prettyPrint()
  ),
  transports: [new transports.Console({
      format: combine(
          format.colorize(),
          format.simple()
      )
  })]
})

const dealPdfTool = function(url,stream,curPath) {
  return new Promise((resolve,reject) => {
    request(url).pipe(stream).on("close", function (err) {
      let pdfParser = new PDFParser(this, 1)
      pdfParser.loadPDF(curPath)
      pdfParser.on('pdfParser_dataError', errData => reject(new Error(errData.parserError)))
      pdfParser.on('pdfParser_dataReady', () => {
        let data = pdfParser.getRawTextContent()
        let result
        let success
        console.log(data)
        const str1 = data.match(/(Tracking NO.): [\S]*/g)
        const str2 = data.match(/(Data): [\S]*/g)
        console.log(str2, 'str2')
        if(str1) {
          result= str1[0].split(': ')[1]
          success = true
        } else if(str2) {
          console.log(str2)
          result= str2[0].split(': ')[1]
          success = true
        } else {
          result = '未匹配到面单号'
          success = false
        }
         const returnSuccess = {
             success: success,
             message: result
         }
         resolve(returnSuccess)
         logger.log({
            level: 'info',
            param: url,
            message: result,
         })
        fs.access(curPath, (err) => {
          if(!err) { fs.unlinkSync(curPath) }
        })
      })
    })
  })
}


class PdfCtl {
  async deal(ctx) {
    ctx.verifyParams({
      pdfUrl: { type: 'string', required: true }
    })
    const urlInfo = new URL(ctx.query.pdfUrl)
    // 此处是进行了服务器转发加速，不需要的可以删除
    const PDF_FORWORD = process.env.PDF_FORWORD
    let url =  PDF_FORWORD + urlInfo.pathname + urlInfo.search

    let fileName = uuid.v1() + '.pdf'
    let stream = fs.createWriteStream(path.join(dirPath, fileName))
    let curPath = `${dirPath}/${fileName}`
    let returnData

    try {
      returnData = await dealPdfTool(url,stream,curPath)
    } catch (error) {
      logger.log({
        level: 'error',
        param: url,
        message: error
      })
      returnData = {
        success: false,
        message: 'An error occurred while parsing the PDF: InvalidPDFException'
      }
      fs.access(curPath, (err) => {
        if(!err) { fs.unlinkSync(curPath) }
      })
    }
    ctx.body = returnData
  }
}

module.exports = new PdfCtl()