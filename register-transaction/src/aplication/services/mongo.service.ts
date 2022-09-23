import { Injectable } from '@nestjs/common';
import { TransactionModel } from 'src/domain/models/transaction.model';
import { UpdateTransactionRequest } from 'src/domain/request/updateTransaction.request';
import { TransactionSchema } from '../../domain/mongo.schemas/transaction.mongo.schema';

@Injectable()
export class MongoService {
  getConnection(): any {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/transaction');
    return mongoose;
  }
  async registerTransaction(data: TransactionModel) {
    return new Promise(async (resolve, reject) => {
      try {
        var mongoose = this.getConnection();
        const Transaction = mongoose.model('transaction', TransactionSchema);

        const transaction = new Transaction(JSON.parse(JSON.stringify(data)));
        var resp = await transaction.save();
        console.log('Transaction created', resp);
        resolve({ message: 'OK' });
      } catch (ex) {
        resolve({ message: 'ERROR' });
      }
    });
  }
  async updateTransaction(data: UpdateTransactionRequest, status: string) {
    return new Promise(async (resolve, reject) => {
      try {
        var mongoose = this.getConnection();
        const Transaction = mongoose.model('transaction', TransactionSchema);
        var resp = await Transaction.updateOne(
          { idTransaction: data.idTransaction },
          { status: status, dateUpdated: Date.now() },
        );
        console.log('Transaction updated', resp);
        resolve({ message: 'OK' });
      } catch (ex) {
        resolve({ message: 'ERROR' });
      }
    });
  }
}
