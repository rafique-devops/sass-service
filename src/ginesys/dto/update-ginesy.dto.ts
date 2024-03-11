import { PartialType } from '@nestjs/mapped-types';
import { CreateGinesyDto } from './create-ginesy.dto';

export class UpdateGinesyDto extends PartialType(CreateGinesyDto) {}
