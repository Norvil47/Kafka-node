import { Injectable } from '@nestjs/common';

@Injectable()
export class KafkaService {
  getConection(): any {
    var kafka = require('kafka-node');
    const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' });
    var Producer = kafka.Producer,
      producer = new Producer(client);

    return producer;
  }
}
