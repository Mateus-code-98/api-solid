import { randomUUID } from 'crypto';

interface IConstructorParams {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
}

export class Gym {
  public id: string;
  public title: string;
  public description?: string | null;
  public phone?: string | null;
  public latitude: number;
  public longitude: number;
  public created_at: Date;

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
