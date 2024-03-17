import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CreateGinesysDto } from './dto/create-ginesys.dto';

export interface GinesysCreationResponse {
  data: {
    checkerId: number;
  };
  message: {
    statusCode: number;
    messageText: string;
  };
}

@Injectable()
export class GinesysService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.httpService.axiosRef.defaults.timeout = this.configService.get<number>(
      'http.timeout',
      5000,
    );
  }

  private prepareRequest(
    endpoint: string,
    data?: any,
  ): {
    url: string;
    headers: { Authorization: string; 'Content-Type': string };
  } {
    const baseUrl = this.configService.get<string>('ginesys.baseUrl');
    const authToken = this.configService.get<string>('ginesys.authToken');

    if (!baseUrl) {
      throw new HttpException(
        'Ginesys Base URL not configured',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      url: `${baseUrl}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
  }

  async createModifyItems(
    createGinesysDto: CreateGinesysDto,
  ): Promise<GinesysCreationResponse> {
    try {
      Logger.log(
        'Create Ginesys DTO',
        JSON.stringify(createGinesysDto, null, 2),
      );
      const { url, headers } = this.prepareRequest(
        'v2/createmodifyitembulk',
        createGinesysDto,
      );
      Logger.log('URL', JSON.stringify(url, null, 2));
      Logger.log('Headers', JSON.stringify(headers, null, 2));
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(url, createGinesysDto, { headers }),
      );
      Logger.log('Axios Headers', JSON.stringify(response.headers, null, 2));
      Logger.log('Axios Status', JSON.stringify(response.status, null, 2));
      Logger.log('Axios Data', JSON.stringify(response.data, null, 2));
      const creationResponse: GinesysCreationResponse = {
        data: response.data.data,
        message: response.data.message,
      };
      Logger.log(
        'Response Data',
        JSON.stringify(creationResponse.data, null, 2),
      );
      Logger.log(
        'Response Message',
        JSON.stringify(creationResponse.message, null, 2),
      );
      // return response.data;
      return creationResponse;
    } catch (error) {
      Logger.log(`Failed to create/modify items: ${error}`);
      throw new HttpException(
        `Failed to create/modify items: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkUpdate(checkerId: number): Promise<any> {
    try {
      const { url, headers } = this.prepareRequest('v1/checker', checkerId);
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(url, { checkerId }, { headers }),
      );
      Logger.log(`Checker Response: ${JSON.stringify(response.status)}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Resource Not Found');
      } else {
        throw new Error(`Failed to fetch: ${error}`);
      }
    }
  }
}
