export class GameModel {
  _id?: string;
  name: string;
  description: string;
  cover: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.summary;
    this.cover = data.cover.image_id;
  }
}
