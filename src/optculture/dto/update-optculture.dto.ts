import { PartialType } from '@nestjs/mapped-types';
import { CreateOptcultureDto } from './create-optculture.dto';

export class UpdateOptcultureDto extends PartialType(CreateOptcultureDto) {}
