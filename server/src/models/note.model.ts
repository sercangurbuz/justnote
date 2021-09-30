import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType('Note')
export class NoteType extends BaseModel {
  note: string;
}
