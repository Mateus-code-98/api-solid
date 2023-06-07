import { ITENS_PER_PAGE } from './constants';

interface IGetTakeAndSkip {
  page: number;
}

export const getTakeAndSkip = ({ page }: IGetTakeAndSkip) => {
  const take = ITENS_PER_PAGE;
  const skip = (page - 1) * take;

  return { take, skip };
};
