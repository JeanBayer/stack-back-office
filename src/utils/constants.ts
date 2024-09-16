import { Post } from '@/types';

export class Constants {
  public static readonly FIELDS_POST_WITH_IMAGE: ReadonlyArray<keyof Post> = [
    'imageUrl',
  ] as const;

  public static readonly CACHE_TIME_GET_POST: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_POST || 0;
  public static readonly CACHE_TIME_GET_LIST_POST: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_POST || 0;
  public static readonly PER_PAGE_GET_LIST_POST: number =
    import.meta.env.PUBLIC_PUBLIC_PER_PAGE_GET_LIST_POST || 10;
}
