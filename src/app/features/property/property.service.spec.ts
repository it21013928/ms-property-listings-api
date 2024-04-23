import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertySchema } from './entities/property.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PropertyService', () => {
  let propertyController: PropertyController;

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
