import { Post } from '@/types';

export class Constants {
  public static readonly FIELDS_POST_WITH_IMAGE: ReadonlyArray<keyof Post> = [
    'imagenURL',
  ] as const;
}
