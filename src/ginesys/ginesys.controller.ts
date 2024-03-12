import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { CreateGinesysDto } from './dto/create-ginesys.dto';
import { UpdateGinesysDto } from './dto/update-ginesys.dto';

@Controller('ginesys')
export class GinesysController {
  constructor(private readonly ginesysService: GinesysService) {}

  @Post()
  create(@Body() createGinesysDto: CreateGinesysDto) {
    return this.ginesysService.create(createGinesysDto);
  }

  @Get()
  findAll() {
    return this.ginesysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ginesysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGinesysDto: UpdateGinesysDto) {
    return this.ginesysService.update(+id, updateGinesysDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ginesysService.remove(+id);
  }

  @Post('item-master')
  @HttpCode(HttpStatus.OK)
  processJson(@Body() jsonData: JSON): JSON {
    return jsonData;
  }
}
