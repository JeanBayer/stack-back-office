import { Option } from '@/types';
export const result = [
  {
    'modulo-mision': 'modulo-mision-meta',
    'modulo-mision-dynamic': '1000',
    'modulo-mision-instruccion': 'una instruccion',
  },
  {
    'modulo-mision': 'modulo-mision-simple',
    'modulo-mision-instruccion': 'una instruccion',
  },
  {
    'modulo-mision': 'modulo-mision-pasos',
    'modulo-mision-dynamic': '1',
    'modulo-mision-instruccion': 'una instruccion',
  },
];

export const optionsModuloMision: Option[] = [
  {
    label: 'Misión con meta de compra',
    id: 'modulo-mision-meta',
    tipo: 'instruccion-monto',
    properties: {
      id: 'modulo-mision-dynamic',
      placeholder: 'Monto de compra',
    },
  },
  {
    label: 'Misión simple (sin propiedades)',
    id: 'modulo-mision-simple',
    tipo: 'empty',
  },

  {
    label: 'Misión con instrucción de pasos',
    id: 'modulo-mision-pasos',
    tipo: 'instruccion-pasos',
    properties: {
      id: 'modulo-mision-dynamic',
      message: 'Complete los pasos de la misión.',
      placeholder: 'Seleccione los pasos',
      values: [
        { id: '1', label: '1 paso' },
        { id: '2', label: '2 pasos' },
      ],
    },
  },
];

export const optionsModuloAudiencia: Option[] = [
  {
    label: 'Todos los usuarios',
    id: 'modulo-audiencia-todos',
    tipo: 'empty',
  },
  {
    label: 'Personalizada',
    id: 'modulo-audiencia-personalizada',
    tipo: 'csv',
    properties: {
      id: 'modulo-audiencia-dynamic',
      message: 'Adjunta un archivo csv',
      placeholder: 'Presiona para agregar un archivo',
    },
  },
];
