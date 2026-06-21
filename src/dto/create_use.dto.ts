import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateUseDto {
  @IsString({ message: 'le nom doit etre une chaine de caractere' })
  @IsNotEmpty({ message: 'le nom ne doit pas etre vide' })
  @MinLength(3, { message: 'le nom doit contenir au moins 3 caracteres' })
  @MaxLength(50, { message: 'le nom ne doit pas depasser 50 caracteres' })
  name: string;
  @IsEmail({}, { message: 'le email doit etre une adresse email valide' })
  @IsNotEmpty({ message: 'le email ne doit pas etre vide' })
  email: string;
  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'le role doit etre admin ou user' })
  role: 'admin' | 'user';
}
