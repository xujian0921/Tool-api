const cluster = require('cluster')
const os = require('os');

if(cluster.isMaster) {
    for(let i =0; i< os.cpus().length / 2  ; i++) {
        createWorker()
    }

    cluster.on('exit', function () {
        setTimeout(() => {
            createWorker()
        }, 3000)
    })

    function createWorker() {
        var worker = cluster.fork();
        var missed = 0;
        var timer = setInterval(function () {
            if (missed == 3) {
                clearInterval(timer);
                process.kill(worker.process.pid);
                return;
            }
            missed++;
            worker.send('ping#' + worker.process.pid);
        }, 10000);

        worker.on('message', function (msg) {
            if (msg == 'pong#' + worker.process.pid) {
                missed--;
            }
        })

        worker.on('exit', function () {
            clearInterval(timer);
        });

    }
} else {
    process.on('uncaughtException', err => {
      console.log(err, '文件流读取异常,避免内存泄漏重启')
      process.exit(1)
    })

    process.on('message', function (msg) {
        if (msg == 'ping#' + process.pid) {
            process.send('pong#' + process.pid);
        }
    });

    require('./app.js');
}