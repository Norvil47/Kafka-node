import { Module } from '@nestjs/common';
import { AntifraudeService } from './aplication/services/antifraude.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AntifraudeController } from './interface/http/antifraude.controller';

@Module({
  imports: [],
  controllers: [AppController, AntifraudeController],
  providers: [AppService, AntifraudeService],
})
export class AppModule {}
