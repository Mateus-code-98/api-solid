import { z } from 'zod';

interface IToDTO {
  name: string;
  password: string;
  email: string;
}

export class RegisterMapper {
  static toDTO(props: IToDTO) {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    return schema.parse(props);
  }
}
