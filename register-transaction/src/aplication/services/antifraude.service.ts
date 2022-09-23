import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AntifraudeService {
  private async configureEndpoint(endpoint, params = {}, method) {
    return axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: method || 'post',
      url: 'http://localhost:3001/' + endpoint,
      data: params || [],
    })
      .then((response) => {
        return { status: true, data: response.data };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, error: error };
      });
  }

  async validateStatus(id: string, value: number): Promise<any> {
    try {
      var obj = {
        idTransaction: id,
        value,
      };
      return await this.configureEndpoint('antifraude', obj, 'GET');
    } catch (ex) {
      return { status: false, error: ex };
    }
  }
}
