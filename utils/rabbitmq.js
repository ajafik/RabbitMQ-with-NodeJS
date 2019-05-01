var amqp = require('amqplib/callback_api');

var config = require("../config/config"),
    rabbit_host = config.get_rabbit_host;

function rabbit_send(queue_name, message, timeout, call) {

    amqp.connect('amqp://' + rabbit_host, function (err, conn) {
        conn.createChannel(function (err, channel) {
            if (err) {
                bail(err);
            }
            var queue = queue_name;
            channel.assertQueue(queue, {
                durable: true
            });
            // Note: on Node 6 Buffer.from(msg) should be used
            var _response = channel.sendToQueue(queue, new Buffer(message), {
                persistent: true
            });
            console.log(" [x] Sent");
            if (_response) {
                return call(_response);
            }

        });

        //If the Producer should timeout
        if (timeout) {
            setTimeout(function () {
                conn.close();
                process.exit(0)
            }, 500);
        }

    });

}

function rabbit_receive(queue_name, call) {

    amqp.connect('amqp://' + rabbit_host, function (err, conn) {
        conn.createChannel(function (err, channel) {
            if (err) {
                bail(err);
            }
            var queue = queue_name;

            channel.assertQueue(queue, {
                durable: true
            });
            channel.prefetch(1);

            // Note: on Node 6 Buffer.from(msg) should be used
            // channel.sendToQueue(queue, new Buffer(message));
            // console.log(" [x] Sent");

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, function (msg) {
                var _isdone = false;
                console.log(" [x] Received %s", msg.content.toString());
                _isdone = true;

                if (_isdone) {
                    console.log(" [x] Done");
                    channel.ack(msg);
                    call(msg.content.toString());
                }

            }, {
                    noAck: false
                });

        });

    });

}

function bail(err) {
    console.error(err);
    process.exit(1);
}

module.exports = {
    rabbit_send,
    rabbit_receive
}