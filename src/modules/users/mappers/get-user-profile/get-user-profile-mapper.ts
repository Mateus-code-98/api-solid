import { z } from 'zod';

interface IToDTO {
  user_id?: string;
}

export class GetUserProfileMapper {
  static toDTO(props: IToDTO) {
    const schema = z.object({
      user_id: z.string().uuid(),
    });

    return schema.parse(props);
  }
}
