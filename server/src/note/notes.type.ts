import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Note')
export class NoteType {
  @Field(() => ID)
  id: string;
  @Field()
  title?: string;
  @Field()
  description: string;
  @Field()
  userId: string;
}
