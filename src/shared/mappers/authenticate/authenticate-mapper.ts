import { z } from 'zod';

interface IToDTO {
  email: string;
  password: string;
}

export class AuthenticateMapper {
  static toDTO(props: IToDTO) {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    return schema.parse(props);
  }
}
