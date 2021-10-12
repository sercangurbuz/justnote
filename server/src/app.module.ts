import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

import { DateScalar } from './common/scalars/date.scalar';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configs/config';
import { GraphqlConfig } from './configs/config.interface';
import { PrismaModule } from 'nestjs-prisma';
import { NoteModule } from './resolvers/note/note.module';
import { AuthModule } from './resolvers/auth/auth.module';
import { Auth0Controller } from './controllers/auth0.controller';
import { Auth0Service } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          installSubscriptionHandlers: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: true,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: ['query'],
        },
      },
      isGlobal: true,
    }),
    AuthModule,
    NoteModule,
  ],
  controllers: [Auth0Controller],
  providers: [DateScalar, Auth0Service],
})
export class AppModule {}
