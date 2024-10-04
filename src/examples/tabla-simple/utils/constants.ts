export class Constants {
  public static readonly CACHE_TIME_GET_LIST_POST: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_POST || 0;

  public static readonly PER_PAGE_GET_LIST_POST: number =
    import.meta.env.PUBLIC_PER_PAGE_GET_LIST_POST || 10;

  public static readonly CACHE_TIME_GET_LIST_STATUS: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_STATUS || 0;
}
