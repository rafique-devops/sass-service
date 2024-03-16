import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GinesysService } from './ginesys.service';

@Controller('api/ginesys')
export class GinesysController {
  constructor(private readonly ginesysService: GinesysService) {}

  @Post('/itemMaster')
  @HttpCode(HttpStatus.OK)
  processJson(@Body() jsonData: JSON): JSON {
    return jsonData;
  }

  @Post('/inventory')
  @HttpCode(HttpStatus.OK)
  inventory(@Body() jsonData: JSON): JSON {
    return jsonData;
  }

  @Post('/onlineInvoice')
  @HttpCode(HttpStatus.OK)
  onlineInvoice(@Body() jsonData: JSON): JSON {
    return jsonData;
  }

  @Post('/posBill')
  @HttpCode(HttpStatus.OK)
  posBill(@Body() jsonData: JSON): JSON {
    return jsonData;
  }
}
