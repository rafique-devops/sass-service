import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { CreateGinesysDto } from './dto/create-ginesys.dto';

@Controller('ginesys')
export class GinesysController {
  constructor(private readonly ginesysService: GinesysService) {}

  @Post('/item-master')
  @HttpCode(HttpStatus.OK)
  async processData(@Body() inputData: CreateGinesysDto) {
    try {
      const creationResponse =
        await this.ginesysService.createModifyItems(inputData);
      // const checkerId = creationResponse.data.id;
      // const updateResponse = await this.ginesysService.checkUpdate(checkerId);
      // const responseData = {
      //   checkerId: updateResponse.status,
      //   updateMessage: updateResponse.data.message,
      // };
      // return responseData;
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
  async checkUpdate(@Body() checkerData: { checkerId: string }) {
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

  @Post('/pos-bill')
  @HttpCode(HttpStatus.OK)
  posBill(@Body() jsonData: any) {
    return jsonData;
  }
}
