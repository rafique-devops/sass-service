import { PartialType } from '@nestjs/mapped-types';
import { CreateGinesysDto } from './create-ginesys.dto';

export class UpdateGinesysDto extends PartialType(CreateGinesysDto) {}
