import { randomUUID } from 'crypto';

interface IConstructorParams {
  name: string;
  email: string;
  password: string;
}

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public readonly created_at: Date;

  constructor({ email, name, password }: IConstructorParams) {
    this.id = randomUUID();
    this.email = email;
    this.name = name;
    this.password = password;
    this.created_at = new Date();
  }
}
