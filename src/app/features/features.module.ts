import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [PropertyModule, ReviewsModule],
})
export class FeaturesModule {}
