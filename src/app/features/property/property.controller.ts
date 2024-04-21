import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('property')
@ApiTags('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async findAll(): Promise<Property[]> {
    return await this.propertyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Property | undefined> {
    return await this.propertyService.findOne(id);
  }

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return await this.propertyService.create(createPropertyDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto): Promise<Property | undefined> {
    return await this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.propertyService.delete(id);
  }
}
