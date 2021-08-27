import { Inject, Injectable } from '@nestjs/common';
import { NoteModel } from '../database/models/note.model';
import { ModelClass } from 'objection';

@Injectable()
export class NoteService {
  constructor(@Inject('NoteModel') private modelClass: ModelClass<NoteModel>) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<NoteModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<NoteModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ id })
      .returning('*')
      .first();
  }
}
