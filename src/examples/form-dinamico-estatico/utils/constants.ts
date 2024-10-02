import { Post } from '@form-dinamico-estatico/types';

export class Constants {
  public static readonly FIELDS_POST_WITH_IMAGE: ReadonlyArray<keyof Post> = [
    'imageUrl',
  ] as const;

  public static readonly CACHE_TIME_GET_POST: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_POST || 0;

  public static readonly CACHE_TIME_GET_LIST_POST: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_POST || 0;

  public static readonly PER_PAGE_GET_LIST_POST: number =
    import.meta.env.PUBLIC_PER_PAGE_GET_LIST_POST || 10;

  public static readonly CACHE_TIME_GET_LIST_STATUS: number =
    import.meta.env.PUBLIC_CACHE_TIME_GET_LIST_STATUS || 0;

  public static readonly NAME_INPUTS = {
    'modulo-mision': 'modulo-mision',
    'modulo-mision-instruccion': 'modulo-mision-instruccion',
  } as const;
}

export class NameInputs {
  public static readonly MODULO_MISION = 'modulo-mision';
  public static readonly MODULO_MISION_DYNAMIC = 'modulo-mision-dynamic';
  public static readonly MODULO_MISION_INSTRUCCION =
    'modulo-mision-instruccion';
  public static readonly MODULO_AUDIENCIA = 'modulo-audiencia';
  public static readonly MODULO_AUDIENCIA_DYNAMIC = 'modulo-audiencia-dynamic';
  public static readonly MODULO_ICONO = 'modulo-icono';
  public static readonly MODULO_PREMIO = 'modulo-premio';
  public static readonly MODULO_PREMIO_DYNAMIC = 'modulo-premio-dynamic';
}
