import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from 'src/aplication/services/transaction.service';
import { RegisterTransactionRequest } from 'src/domain/request/registerTransaction.request';
import { UpdateTransactionRequest } from 'src/domain/request/updateTransaction.request';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post('register')
  async register(@Body() body: RegisterTransactionRequest): Promise<any> {
    return { mensaje: await this.service.registerTransaction(body) };
  }
  @Post('update')
  async update(@Body() body: UpdateTransactionRequest): Promise<any> {
    return { mensaje: await this.service.updateTransaction(body) };
  }
}
