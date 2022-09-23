import { Injectable } from '@nestjs/common';
import { TransactionModel } from 'src/domain/models/transaction.model';
import { RegisterTransactionRequest } from 'src/domain/request/registerTransaction.request';
import { KafkaService } from './kafka.service';
import { v4 as uuidv4 } from 'uuid';
import { STATUS } from '../../domain/constants/status.constans';
import { MongoService } from './mongo.service';
import { UpdateTransactionRequest } from 'src/domain/request/updateTransaction.request';
import { AntifraudeService } from 'src/aplication/services/antifraude.service';

@Injectable()
export class TransactionService {
  async registerTransaction(body: RegisterTransactionRequest): Promise<any> {
    var kafka = new KafkaService();
    var data = new TransactionModel();
    var mongo = new MongoService();
    var kafka = new KafkaService();
    var producer = kafka.getConection();
    data.accountExternalIdCredit = body.accountExternalIdCredit;
    data.accountExternalIdDebit = body.accountExternalIdDebit;
    data.tranferTypeId = body.tranferTypeId;
    data.value = body.value;
    data.idTransaction = uuidv4();
    data.status = STATUS.pending;
    var payloads = [{ topic: 'transaction-register', messages: data }];
    await mongo.registerTransaction(data);

    producer.on('ready', function () {
      producer.send(payloads, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
      });
    });
    return data;
  }
  async updateTransaction(body: UpdateTransactionRequest): Promise<any> {
    var mongo = new MongoService();
    var antifraude = new AntifraudeService();
    var antifraude_res = await antifraude.validateStatus(
      body.idTransaction,
      body.value,
    );
    if (antifraude_res.status) {
      var res = await mongo.updateTransaction(
        body,
        antifraude_res.data.mensaje,
      );
      console.log('transaction updated ', res);
      return 'Transaccion actualizada';
    } else return 'Error al actualizar status';
  }
}
