import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { CreateGinesysDto } from './dto/create-ginesys.dto';
import { PosBillRequestDTO } from './dto/posbillRequest.dto';
import { GinesysCreationResponse } from './ginesys.interfaces';

@Controller('ginesys')
export class GinesysController {
  constructor(private readonly ginesysService: GinesysService) {}

  /**
   * Handles errors by throwing appropriate HttpException
   * @param error - The error to handle
   * @param defaultMessage - Default message if error is not an Error instance
   */
  private handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof HttpException) {
      throw error;
    }
    if (error instanceof Error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new HttpException(defaultMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }

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
        JSON.stringify(creationResponse, null, 2),
      );
      return creationResponse;
    } catch (error: unknown) {
      this.handleError(error, 'Failed to process data');
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
      this.handleError(error, 'Failed to fetch update');
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
  async posBill(@Body() posbillData: PosBillRequestDTO): Promise<any> {
    try {
      const processedData = await this.ginesysService.posBill(posbillData);

      return processedData;
    } catch (error) {
      this.handleError(error, 'Failure');
    }
  }
}
