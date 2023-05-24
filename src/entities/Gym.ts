import { randomUUID } from 'crypto';

interface IConstructorParams {
  title: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export class Gym {
  public readonly id: string;
  public title: string;
  public description: string;
  public phone: string;
  public latitude: number;
  public longitude: number;
  public readonly created_at: Date;

  constructor({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: IConstructorParams) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.phone = phone;
    this.latitude = latitude;
    this.longitude = longitude;
    this.created_at = new Date();
  }
}
