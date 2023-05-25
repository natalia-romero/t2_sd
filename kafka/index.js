const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' })

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
function getRandomTopic() {
    var topic = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5'];
    var randomTopic = Math.floor(Math.random() * 4);

    return topic[randomTopic];
}
// - - - - - DISPOSITIVOS - - - - - 
var n = Math.floor(Math.random() * 3 + 1);
console.log('Dispositivos: ', n);

// - - - - - TOPIC - - - - - - - - 
var randomTopic = getRandomTopic();
console.log('Conectado en topic: ', randomTopic);

// - - - - - CONSUMIDOR - - - - -  
consumer = new kafka.Consumer(client, [{ topic: randomTopic }]);
consumer.on('message', function (message) {
    console.log(message);
});

// - - - - -  PRODUCTORES - - - - -  
for (let i = 0; i < n; i++) {
    producer = new kafka.Producer(client, [{ topic: randomTopic }]);
    producer.on('ready', function () {
        setInterval(function () {
            var index = i + 1;
            producer.send([{ topic: randomTopic, messages: getData(index) }], function (err, data) { //envía la info
            });
        }, getSeconds() * 1000); // segundos
    })
}
