import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertySchema } from './entities/property.entity';

describe('PropertyService', () => {
  let propertyController: PropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://wudeshp:Hzr6TS8PtQBtSBJC@propertyrentalplatformc.l46okbo.mongodb.net/property_rental_platform_test_db?retryWrites=true&w=majority&appName=PropertyRentalPlatformCluster',
        ),
        MongooseModule.forFeature([
          { name: Property.name, schema: PropertySchema },
        ]),
      ],
      controllers: [PropertyController],
      providers: [PropertyService],
    }).compile();

    propertyController = module.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(propertyController).toBeDefined();
  });
});
