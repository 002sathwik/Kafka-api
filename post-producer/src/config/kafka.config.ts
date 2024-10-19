
//kafka.confiig.ts

import { Admin ,Kafka ,logLevel ,Producer } from 'kafkajs';

class KafkaConfig{
    private kafka: Kafka;
    private admin: Admin;
    private producer: Producer;
    private brokers: string = 'localhost:9092';

    constructor(){
        this.kafka = new Kafka({
            clientId: 'post-producer',
            brokers: ['localhost:9092'],
            logLevel: logLevel.NOTHING
        });

        this.admin = this.kafka.admin();
        this.producer = this.kafka.producer();
    }

    async connect(): Promise<void>{
     try {
           await this.admin.connect();
           await this.producer.connect();
           console.log("Kafka connected")
     } catch (error) {
        console.log(error);
     }
    }
    async createTopic(topic: string): Promise<void>{
        try {
            await this.admin.createTopics({
                topics: [{
                    topic,
                    numPartitions: 1
                }]
            });
            console.log(`Topic ${topic} created`);
        } catch (error) {
            console.log(error);
        }   

    }

    async sentToTopic(topic: string, messages: any): Promise<void>{
        try {
            await this.producer.send({
                topic,
                messages:[{value:messages}]
            });
            console.log('Message sent');
        } catch (error) {
            console.log(error);
        }
    }


    async disconnect(): Promise<void>{
        try {
            await this.admin.disconnect();
            await this.producer.disconnect();
        } catch (error) {
            console.log(error);
            
        }
    }

    getProducer(){
        return this.producer;
    }
}

export default new KafkaConfig();