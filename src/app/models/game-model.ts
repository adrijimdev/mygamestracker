export class GameModel {
  _id: string;
  name: string;
  description?: string;
  cover: string;

  constructor(data: any) {
    this._id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.cover = data.background_image;
  }
}
