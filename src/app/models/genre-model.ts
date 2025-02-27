export class GenreModel {
  _id?: string;
  name: string;
  slug: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.slug = data.summary;
  }
}
