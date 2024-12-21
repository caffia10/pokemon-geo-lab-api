import { Global, Module } from '@nestjs/common';
import { DBService } from './service';

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
