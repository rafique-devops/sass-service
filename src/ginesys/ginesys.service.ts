import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CreateGinesysDto } from './dto/create-ginesys.dto';

@Injectable()
export class GinesysService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.httpService.axiosRef.defaults.timeout = 50000;
  }

  async createModifyItems(
    createGinesysDto: CreateGinesysDto,
  ): Promise<AxiosResponse> {
    try {
      const baseUrl = this.configService.get<string>('ginesys.baseUrl');
      const authToken = this.configService.get<string>('ginesys.authToken');

      const url = `${baseUrl}/v2/createmodifyitembulk`;
      const headers = { Authorization: `Bearer ${authToken}` };

      const response = await lastValueFrom(
        this.httpService.post(url, createGinesysDto, { headers }),
      );
      Logger.log(`CreatedModifyItems Response: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      Logger.log(`Failed to create/modify items: ${error}`);
      throw new Error(`Failed to create/modify items: ${error}`);
    }
  }

  async checkUpdate(checkerId: string): Promise<AxiosResponse> {
    try {
      const baseUrl = this.configService.get<string>('ginesys.baseUrl');
      const authToken = this.configService.get<string>('ginesys.authToken');
      const url = `${baseUrl}/v1/checker`;
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await lastValueFrom(
        this.httpService.post(url, { checkerId }, { headers }),
      );
      Logger.log(`Checker Response: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('Resource Not Found');
      } else {
        throw new Error(`Failed to update: ${error}`);
      }
    }
  }
}
