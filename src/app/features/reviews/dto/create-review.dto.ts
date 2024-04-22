import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateReviewDto {
  @IsString()
  readonly propertyID?: string;

  @IsString()
  readonly customerReview?: string;

  @IsString()
  readonly customerID?: string;

  @IsNumber()
  readonly rate?: number;
}
