import { Injectable } from '@nestjs/common';
import { AntifraudeRequest } from 'src/domain/request/antifraude.request';
import { STATUS } from '../../domain/constants/status.constans';

@Injectable()
export class AntifraudeService {
  validate(body: AntifraudeRequest): string {
    console.log('event', body);
    var response;
    if (body.value > 1000) response = STATUS.rejected;
    else response = STATUS.approved;
    console.log('response', response);
    return response;
  }
}
