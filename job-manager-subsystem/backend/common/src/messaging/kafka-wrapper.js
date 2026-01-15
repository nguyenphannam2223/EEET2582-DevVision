const { Kafka } = require('kafkajs');

class KafkaWrapper {
    constructor() {
        this._client = null;
        this._producer = null;
    }

    get client() {
        if (!this._client) {
            throw new Error('Cannot access Kafka client before connecting');
        }
        return this._client;
    }

    get producer() {
        if (!this._producer) {
            throw new Error('Cannot access Kafka producer before connecting');
        }
        return this._producer;
    }

    async connect(clientId, brokers) {
        this._client = new Kafka({
            clientId,
            brokers: brokers.split(','),
        });

        this._producer = this._client.producer();

        try {
            await this._producer.connect();
            console.log('Connected to Kafka');
        } catch (err) {
            console.error('Error connecting to Kafka:', err.message);
        }
    }

    async publish(topic, message) {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }],
            });
        } catch (err) {
            console.error(`Error publishing to topic ${topic}:`, err.message);
        }
    }
}

module.exports = new KafkaWrapper();
