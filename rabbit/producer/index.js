const amqp = require('amqplib/callback_api');

const options = {
    clientProperties:
    {
        connection_name: 'producer-service'
    }
};

function getData(i) {
    var min = 10;
    var max = 20;
    var randomString = Math.random().toString(36).slice(2, min + Math.floor(Math.random() * (max - min + 1)));
    var data = {
        timeStamp: Date.now(),
        msg: randomString
    };
    return 'Device ' + i + ' sending: ' + JSON.stringify(data)
}
function getSeconds() {
    var sec = Math.floor(Math.random() * 9 + 1);
    return sec;
}
function getRandomQueue() {
    let queue = ['queue1', 'queue2', 'queue3', 'queue4', 'queue5'];
    let randomQueue = Math.floor(Math.random() * 4);

    return queue[randomQueue];
}
// - - - - - DISPOSITIVOS - - - - - 
var n = Math.floor(Math.random() * 3 + 1);
console.log('Dispositivos: ', n);


// - - - - -  PRODUCTORES - - - - -  
for (let i = 0; i < n; i++) {

    // - - - - - QUEQUE - - - - - - - - 
    var randomQueue = getRandomQueue();
    console.log('Conectado en cola: ', randomQueue);
    setInterval(function () {
        amqp.connect('amqp://rabbit:rabbit@localhost', options, (error, connection) => {
            if (error) {
                throw error;
            }

            connection.createChannel((connErr, channel) => {
                if (connErr) {
                    throw connErr;
                }
                channel.assertQueue(randomQueue, {
                    durable: true
                });

                channel.sendToQueue(randomQueue, Buffer.from(getData(i + 1)), {
                    persistent: true
                });
            });
        });
    }, getSeconds() * 1000);
}
