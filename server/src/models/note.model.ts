import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';

export enum TodoStatus {
  DONE = 'DONE',
  PENDING = 'PENDING',
}

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
  description: 'Status of todo item',
});

@ObjectType('Note')
export class NoteType extends BaseModel {
  @Field()
  title?: string;
  @Field()
  description: string;
  @Field()
  status: TodoStatus;
  @Field((type) => User)
  user: User;
}