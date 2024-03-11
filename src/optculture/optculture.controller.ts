import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptcultureService } from './optculture.service';
import { CreateOptcultureDto } from './dto/create-optculture.dto';
import { UpdateOptcultureDto } from './dto/update-optculture.dto';

@Controller('optculture')
export class OptcultureController {
  constructor(private readonly optcultureService: OptcultureService) {}

  @Post()
  create(@Body() createOptcultureDto: CreateOptcultureDto) {
    return this.optcultureService.create(createOptcultureDto);
  }

  @Get()
  findAll() {
    return this.optcultureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optcultureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptcultureDto: UpdateOptcultureDto) {
    return this.optcultureService.update(+id, updateOptcultureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optcultureService.remove(+id);
  }
}
