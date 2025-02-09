import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { TownModule } from './town/town.module';
import { BuildingModule } from './building/building.module';
import { DBModule } from './server/infrastructure/db/db.module';
import { LoggerModule } from './server/infrastructure/logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RegionModule,
    TownModule,
    BuildingModule,
    DBModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la app
      envFilePath: '.env', // Carga el archivo .env de la raíz del proyecto
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
