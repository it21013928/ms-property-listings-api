import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const connectionString = config.get<string>('DATABASE_CONNECTION_STRING');

        // **Optional: Log connection string details (masked)**
        const maskedConnectionString = connectionString.replace(/^(.*)@(.*):(.*)@(.*)\/(.*)$/, 'mongodb://$1@...');
        console.debug(`Connecting to MongoDB with masked URI: ${maskedConnectionString}`);

        return {
          uri: connectionString,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
