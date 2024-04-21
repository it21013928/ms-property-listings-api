import { Module } from '@nestjs/common';
import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './core/config/database/database.module';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
