export class GenreModel {
  _id?: string;
  name: string;
  slug: string;

  constructor(data: any) {
    this._id = data.id;
    this.name = data.name;
    this.slug = data.slug;
  }
}
