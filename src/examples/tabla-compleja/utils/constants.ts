export class Constants {
  public static readonly CACHE_TIME_GET_LIST_POST: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_POST || 0;

  public static readonly PER_PAGE_GET_LIST_POST: number =
    import.meta.env.PUBLIC_PER_PAGE_GET_LIST_POST || 10;

  public static readonly CACHE_TIME_GET_LIST_STATUS: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_STATUS || 0;

  public static readonly ROUTES = {
    POSTS: '/tabla-simple',
    POSTS_FORM: '/form-simple/posts/:id',
    POSTS_FORM_EDIT: '/form-simple/posts/:id/edit',
    POSTS_FORM_CREATE: '/form-simple/posts/create',
  } as const;

  public static readonly KEYS = {
    POSTS: 'posts',
    STATUS: 'status',
  } as const;
}
