// import { Test, TestingModule } from '@nestjs/testing';
// import { PropertyController } from './property.controller';
// import { PropertyService } from './property.service';

// describe('PropertyController', () => {
//   let controller: PropertyController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PropertyController],
//       providers: [PropertyService],
//     }).compile();

//     controller = module.get<PropertyController>(PropertyController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

describe('PropertyController', () => {
  let controller: PropertyController;
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [PropertyService],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of properties', async () => {
      // Mock property data
      const mockProperty1 = {
        title: 'Mock Property 1',
        description: 'Mock Description 1',
        price: 100000,
        location: 'Mock Location 1',
        bedrooms: 3,
        bathrooms: 2,
        features: ['Feature 1', 'Feature 2'],
      };

      const mockProperty2 = {
        title: 'Mock Property 2',
        description: 'Mock Description 2',
        price: 150000,
        location: 'Mock Location 2',
        bedrooms: 4,
        bathrooms: 3,
        features: ['Feature 3', 'Feature 4'],
      };

      const result: Property[] = [
        mockProperty1 as Property,
        mockProperty2 as Property,
      ]; // Cast each mock object to Property type
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  // describe('findOne', () => {
  //   it('should return a single property', async () => {
  //     const propertyId = 'mockPropertyId';
  //     const result: Property = {/* mock property data */};
  //     jest.spyOn(service, 'findOne').mockResolvedValue(result);

  //     expect(await controller.findOne(propertyId)).toBe(result);
  //   });
  // });

  // describe('create', () => {
  //   it('should create a new property', async () => {
  //     const createPropertyDto: CreatePropertyDto = {/* mock create property dto */};
  //     const result: Property = {/* mock property data */};
  //     jest.spyOn(service, 'create').mockResolvedValue(result);

  //     expect(await controller.create(createPropertyDto)).toBe(result);
  //   });
  // });

  // describe('update', () => {
  //   it('should update an existing property', async () => {
  //     const propertyId = 'mockPropertyId';
  //     const updatePropertyDto: UpdatePropertyDto = {/* mock update property dto */};
  //     const result: Property = {/* mock updated property data */};
  //     jest.spyOn(service, 'update').mockResolvedValue(result);

  //     expect(await controller.update(propertyId, updatePropertyDto)).toBe(result);
  //   });
  // });

  // describe('delete', () => {
  //   it('should delete an existing property', async () => {
  //     const propertyId = 'mockPropertyId';
  //     jest.spyOn(service, 'delete').mockResolvedValue();

  //     await controller.delete(propertyId);
  //     expect(service.delete).toHaveBeenCalledWith(propertyId);
  //   });
  // });
});
