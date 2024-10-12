export type Estados = 'disponible' | 'pausado' | 'archivado';
export type ActionMode =
  | 'publicar'
  | 'disponibilizar'
  | 'archivar'
  | 'desarchivar';

export type ActionSelection = {
  estado: Estados;
  actionMode: ActionMode[];
};
