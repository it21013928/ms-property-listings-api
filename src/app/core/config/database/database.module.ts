import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// **Security Note:** Avoid printing the full connection string in the console.
// Consider logging it at a lower level (e.g., debug) for troubleshooting purposes only.

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
