import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ReviewSchema } from './entities/review.entity';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;
  let model: Model<Review>;
  let moduleRef: TestingModule;

  const initializeModel = async () => {
    moduleRef = await Test.createTestingModule({
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

    controller = moduleRef.get<ReviewsController>(ReviewsController);
    service = moduleRef.get<ReviewsService>(ReviewsService);
    model = moduleRef.get<Model<Review>>(getModelToken(Review.name));
  };

  beforeAll(async () => {
    await initializeModel();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await model.deleteMany({}); // Clean up test data
    await moduleRef.close(); // Close the Nest.js module
  });

  // Test create
  it('should create a new review', async () => {
    await initializeModel();

    const createReviewDto: CreateReviewDto = {
      propertyID: '12345',
      customerReview: 'Test Review',
      customerID: '67890',
      rate: 5,
    };

    const createdReview = await controller.create(createReviewDto);

    // Assert that the created review matches the DTO
    expect(createdReview).toMatchObject(createReviewDto);

    // Assert that the review was saved in the database
    const reviews = await model.find().exec();
    expect(reviews).toHaveLength(1);
    expect(reviews[0]).toMatchObject(createReviewDto);
  }, 10000);

  // Test findAll
  it('should find all reviews', async () => {
    await initializeModel();
    const reviews = await controller.findAll();
    expect(reviews).toHaveLength(1); // Assuming one review is created in the previous test
  }, 10000);

  // Test findOne
  it('should find one review by id', async () => {
    await initializeModel();

    const reviews = await model.find().exec();
    const reviewId = reviews[0]._id;

    const review = await controller.findOne(reviewId);

    expect(review).toBeDefined();
    expect(review?._id).toEqual(reviewId);
  }, 10000);

  //Test update
  it('should update a review', async () => {
    await initializeModel();

    const reviews = await model.find().exec();
    const reviewId = reviews[0]._id;

    const updateReviewDto: UpdateReviewDto = {
      propertyID: '12345',
      customerReview: 'Updated Test Review',
      customerID: '67890',
      rate: 4,
    };

    const updatedReview = await controller.update(reviewId, updateReviewDto);

    expect(updatedReview).toBeDefined();
    expect(updatedReview?.customerReview).toEqual(
      updateReviewDto.customerReview,
    );
  }, 10000);

  //Test delete
  it('should delete a review', async () => {
    await initializeModel();

    const reviewsBeforeDelete = await model.find().exec();
    const reviewId = reviewsBeforeDelete[0]._id;

    await controller.remove(reviewId);

    const reviewsAfterDelete = await model.find().exec();

    expect(reviewsAfterDelete).toHaveLength(0);
  }, 10000);
});
