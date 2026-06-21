import { CreateUseDto } from './create_use.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUseDto extends PartialType(CreateUseDto) {}
