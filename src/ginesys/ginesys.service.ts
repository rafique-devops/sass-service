import {
  BadRequestException,
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
import { ItemPromotionDTO, PosBillRequestDTO, ReceiptPromotionDTO } from './dto/posbillRequest.dto';

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
      const { url, headers } = this.prepareRequest(
        'v2/createmodifyitembulk',
        createGinesysDto,
      );
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(url, createGinesysDto, { headers }),
      );
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
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Resource Not Found');
      } else {
        throw new Error(`Failed to fetch: ${error}`);
      }
    }
  }

  async posBill(posbillData: PosBillRequestDTO): Promise<any> {
    try {
      if (!posbillData.OptcultureDetails?.MembershipNumber) {
        throw new HttpException('Membership Number is Mandatory',HttpStatus.BAD_REQUEST)
      }

      const itemPromotion: ItemPromotionDTO[] = [];
      const receiptPromotion: ReceiptPromotionDTO[] = [];
      for (const promotion of posbillData.OptcultureDetails.Promotions)
      {
        switch (promotion.DiscountType) {
          case 'Item':
            itemPromotion.push(new ItemPromotionDTO());
            break;

          case 'Receipt':
            receiptPromotion.push(new ReceiptPromotionDTO());
            break;
        
          default:
            throw new BadRequestException('Invalid Discount Type');
        }
      }
      Logger.log('Response Data', JSON.stringify(posbillData, null, 2));
      return {
        success: true,
        data: posbillData
      };
    } catch (error) {
      Logger.log(`Something Went Wrong: ${error}`);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }
}
