import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiLogsModule } from './modules/api-logs/api-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',

          url: configService.get('DATABASE_URL_API_GATEWAY_HTTP_LOG'),

          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,

          logging:
            configService.get<string>('ENVIRONMENT') === 'development'
              ? true
              : false,
          ssl: configService.get<string>('ENVIRONMENT') === 'test' ? false : true,
          extra: {
            ssl:
              configService.get<string>('ENVIRONMENT') === 'test'
                ? false
                : { rejectUnauthorized: false },
            max: 1,
            connectionTimeoutMillis: 5000,
          },
        };
      },
    }),

    ApiLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
