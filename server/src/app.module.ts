import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    NoteModule,
  ],
})
export class AppModule {}
