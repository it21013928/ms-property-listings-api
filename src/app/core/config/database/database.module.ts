import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const connectionString = 'mongodb+srv://wudeshp:Hzr6TS8PtQBtSBJC@propertyrentalplatformc.l46okbo.mongodb.net/property_rental_platform_db?retryWrites=true&w=majority&appName=PropertyRentalPlatformCluster';


@Module({
  imports: [MongooseModule.forRoot(connectionString)],
  exports: [MongooseModule],
})
export class DatabaseModule {}

