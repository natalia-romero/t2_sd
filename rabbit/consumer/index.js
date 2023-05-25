const amqp = require('amqplib/callback_api');

const options = {
    clientProperties:
    {
        connection_name: 'producer-service'
    }
};
// - - - - - QUEQUE - - - - - - - - 
function getRandomQueue() {
    let queue = ['queue1', 'queue2', 'queue3', 'queue4', 'queue5'];
    let randomQueue = Math.floor(Math.random() * 4);

    return queue[randomQueue];
}
var randomQueue = getRandomQueue();
console.log('Conectado en cola: ', randomQueue);

amqp.connect('amqp://rabbit:rabbit@localhost', options, (error, connection) => {
    if (error) {
        throw err;
    }

    connection.createChannel((connErr, channel) => {
        if (connErr) {
            throw connErr;
        }

        channel.assertQueue(randomQueue, { durable: true });

        console.log('[*] Esperando mensajes');

        channel.consume(randomQueue, function (msg) {
            console.log(msg.content.toString());
        }, {
            noAck: true
        });
    });
});