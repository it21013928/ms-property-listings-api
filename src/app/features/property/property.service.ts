import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
  ) {}

  async findAll(): Promise<Property[]> {
    return await this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property | undefined> {
    return await this.propertyModel.findById(id).exec();
  }

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const newProperty = new this.propertyModel(createPropertyDto);
    return await newProperty.save();
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property | undefined> {
    return await this.propertyModel
      .findByIdAndUpdate(id, updatePropertyDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.propertyModel.findByIdAndDelete(id).exec();
  }
}
