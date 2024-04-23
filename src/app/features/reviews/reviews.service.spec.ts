import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './entities/review.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('ReviewsService', () => {
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            const connectionString = config.get<string>('TEST_DATABASE_CONNECTION_STRING');
            return {
              uri: connectionString,
            };
          },
        }),
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
