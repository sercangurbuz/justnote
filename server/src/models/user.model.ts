import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { NoteType } from './note.model';
import { BaseModel } from './base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  email: string;
  @Field()
  firstname?: string;
  @Field()
  lastname?: string;
  @Field((type) => [NoteType])
  notes: NoteType[];
  @HideField()
  password: string;
}
