import { Body, Controller, Get } from '@nestjs/common';
import { AntifraudeService } from 'src/aplication/services/antifraude.service';
import { AntifraudeRequest } from 'src/domain/request/antifraude.request';

@Controller('antifraude')
export class AntifraudeController {
  constructor(private readonly service: AntifraudeService) {}

  @Get()
  validate(@Body() body: AntifraudeRequest): any {
    return { mensaje: this.service.validate(body) };
  }
}
