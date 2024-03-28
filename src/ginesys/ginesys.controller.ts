import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { CreateGinesysDto } from './dto/create-ginesys.dto';
import { PosBillRequestDTO } from './dto/posbillRequest.dto';

@Controller('ginesys')
export class GinesysController {
  constructor(private readonly ginesysService: GinesysService) {}

  @Post('/item-master')
  @HttpCode(HttpStatus.OK)
  async createModifyItems(
    @Body() inputData: CreateGinesysDto,
  ): Promise<GinesysCreationResponse> {
    try {
      const creationResponse =
        await this.ginesysService.createModifyItems(inputData);
      Logger.log(
        'Creation Response',
        JSON.stringify(creationResponse, null, 2));      
      return creationResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Failed to process data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('checker')
  @HttpCode(HttpStatus.OK)
  async checkUpdate(@Body() checkerData: { checkerId: number }): Promise<any> {
    try {
      const checkResponse = await this.ginesysService.checkUpdate(
        checkerData.checkerId,
      );
      return checkResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Failed to fetch update',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/inventory')
  @HttpCode(HttpStatus.OK)
  inventory(@Body() jsonData: any) {
    return jsonData;
  }

  @Post('/online-invoice')
  @HttpCode(HttpStatus.OK)
  onlineInvoice(@Body() jsonData: any) {
    return jsonData;
  }

// ... imports

  @Post('/pos-bill')
  @HttpCode(HttpStatus.OK)
  async posBill(@Body() posbillData: PosBillRequestDTO) {
    try {
      const processedData = await this.ginesysService.posBill(posbillData);
      return processedData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Rethrow HttpExceptions directly
      } else {
        throw new HttpException('Failure', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
