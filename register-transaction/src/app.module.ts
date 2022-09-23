import { Module } from '@nestjs/common';
import { TransactionService } from './aplication/services/transaction.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionController } from './interface/http/transaction.controller';

@Module({
  imports: [],
  controllers: [AppController, TransactionController],
  providers: [AppService, TransactionService],
})
export class AppModule {}
