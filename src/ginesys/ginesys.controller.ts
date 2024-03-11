import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { CreateGinesyDto } from './dto/create-ginesy.dto';
import { UpdateGinesyDto } from './dto/update-ginesy.dto';

@Controller('ginesys')
export class GinesysController {
  constructor(private readonly ginesysService: GinesysService) {}

  @Post()
  create(@Body() createGinesyDto: CreateGinesyDto) {
    return this.ginesysService.create(createGinesyDto);
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
  update(@Param('id') id: string, @Body() updateGinesyDto: UpdateGinesyDto) {
    return this.ginesysService.update(+id, updateGinesyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ginesysService.remove(+id);
  }
}
