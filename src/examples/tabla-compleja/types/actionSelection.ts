export type Estados = 'disponible' | 'pausado' | 'archivado';
export type ActionMode = 'publicar' | 'disponibilizar' | 'archivar';
export type ActionSelection = {
  estado: Estados;
  actionMode: ActionMode;
};

export const getEstadoByActionMode = (actionMode: ActionMode): Estados => {
  switch (actionMode) {
    case 'disponibilizar':
      return 'disponible';
    case 'publicar':
      return 'disponible';
    case 'archivar':
      return 'archivado';
  }
};
