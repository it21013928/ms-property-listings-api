import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { PropertySchema } from './entities/property.entity';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PropertyController', () => {
  let controller: PropertyController;
  let service: PropertyService;
  let model: Model<Property>;
  let moduleRef: TestingModule;

  const initializeModel = async () => {
    moduleRef = await Test.createTestingModule({
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
          { name: Property.name, schema: PropertySchema },
        ]),
      ],
      controllers: [PropertyController],
      providers: [PropertyService],
    }).compile();

    controller = moduleRef.get<PropertyController>(PropertyController);
    service = moduleRef.get<PropertyService>(PropertyService);
    model = moduleRef.get<Model<Property>>(getModelToken(Property.name));
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
  it('should create a new property', async () => {
    await initializeModel();

    const createPropertyDto: CreatePropertyDto = {
      title: 'Test Property',
      description: 'This is a test property',
      price: 100000,
      location: 'Test Location',
      bedrooms: 3,
      bathrooms: 2,
      features: ['Feature 1', 'Feature 2'],
    };

    const createdProperty = await controller.create(createPropertyDto);

    // Assert that the created property matches the DTO
    expect(createdProperty).toMatchObject(createPropertyDto);

    // Assert that the property was saved in the database
    const properties = await model.find().exec();
    expect(properties).toHaveLength(1);
    expect(properties[0]).toMatchObject(createPropertyDto);
  }, 10000);

  // Test findAll
  it('should find all properties', async () => {
    await initializeModel();
    const properties = await controller.findAll();
    expect(properties).toHaveLength(1); // Assuming one property is created in the previous test
  }, 10000);

  // Test findOne
  it('should find one property by id', async () => {
    await initializeModel();

    const properties = await model.find().exec();
    const propertyId = properties[0]._id;

    const property = await controller.findOne(propertyId);

    expect(property).toBeDefined();
    expect(property?._id).toEqual(propertyId);
  }, 10000);

  //Test update
  it('should update a property', async () => {
    await initializeModel();

    const properties = await model.find().exec();
    const propertyId = properties[0]._id;

    const updatePropertyDto: UpdatePropertyDto = {
      title: 'Updated Test Property',
      description: 'This is an updated test property',
      price: 150000,
      location: 'Updated Test Location',
      bedrooms: 4,
      bathrooms: 3,
      features: ['Updated Feature 1', 'Updated Feature 2'],
    };

    const updatedProperty = await controller.update(
      propertyId,
      updatePropertyDto,
    );

    expect(updatedProperty).toBeDefined();
    expect(updatedProperty?.title).toEqual(updatePropertyDto.title);
  }, 10000);

  //Test delete
  it('should delete a property', async () => {
    await initializeModel();

    const propertiesBeforeDelete = await model.find().exec();
    const propertyId = propertiesBeforeDelete[0]._id;

    await controller.delete(propertyId);

    const propertiesAfterDelete = await model.find().exec();

    expect(propertiesAfterDelete).toHaveLength(0);
  }, 10000);
});
