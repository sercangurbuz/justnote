import { BaseModel } from './base.model';

export class NoteModel extends BaseModel {
  static tableName = 'notes';

  title: string;
  description: string;
  userId: string;
}
