import { Option } from '@/types';

export function findOption(listOptions: Option[], optionModulo: string) {
  return listOptions.find((option) => option.id === optionModulo);
}
