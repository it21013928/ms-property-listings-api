import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './entities/review.entity';

describe('ReviewsService', () => {
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://wudeshp:Hzr6TS8PtQBtSBJC@propertyrentalplatformc.l46okbo.mongodb.net/property_rental_platform_test_db?retryWrites=true&w=majority&appName=PropertyRentalPlatformCluster',
        ),
        MongooseModule.forFeature([
          { name: Review.name, schema: ReviewSchema },
        ]),
      ],
      controllers: [ReviewsController],
      providers: [ReviewsService],
    }).compile();

    reviewsController = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(reviewsController).toBeDefined();
  });
});
