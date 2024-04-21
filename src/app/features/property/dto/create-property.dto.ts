import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreatePropertyDto {
  @IsString()
  readonly title?: string;

  @IsString()
  readonly description?: string;

  @IsNumber()
  readonly price?: number;

  @IsString()
  readonly location?: string;

  @IsNumber()
  readonly bedrooms?: number;

  @IsNumber()
  readonly bathrooms?: number;

  @IsString({ each: true }) // Validate individual elements in the array
  readonly features?: string[];
}
