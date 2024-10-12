import { ActionSelection } from '@tabla-compleja/types';

export const ACTION_SELECTION: ReadonlyArray<Readonly<ActionSelection>> = [
  {
    estado: 'pausado',
    actionMode: ['disponibilizar'],
  },
  {
    estado: 'archivado',
    actionMode: ['desarchivar'],
  },
  {
    estado: 'disponible',
    actionMode: ['archivar', 'publicar'],
  },
] as const;
