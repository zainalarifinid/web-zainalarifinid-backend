import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

let logOption: LoggerOptions = ['error', 'schema'];

if (process.env.NODE_ENV === 'development') {
  logOption = 'all';
} else if (process.env.NODE_ENV === 'test') {
  logOption = ['error'];
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: (process.env.TYPEORM_CONNECTION as any) || undefined,
        host: process.env.TYPEORM_HOST || undefined,
        port: Number(process.env.TYPEORM_PORT || 0) || undefined,
        database: process.env.TYPEORM_DATABASE,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        debug: true,
        synchronize: true,
        maxQueryExecutionTime: 5000,
        logging: logOption,
        logger: 'simple-console',
        entities: [`${__dirname}/**/entities/**{.ts,.js}`],
      }),
    }),
  ],
})

export class DatabaseModule {}
