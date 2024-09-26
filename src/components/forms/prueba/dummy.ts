import { Option } from '@/types';

export const optionsModuloMision: Option[] = [
  {
    label: 'Misión con meta de compra',
    id: 'disponible',
    tipo: 'instruccion-monto',
    properties: {
      message: 'Complete los datos de la misión con meta de compra.',
      placeholder: 'Ingrese los detalles',
      tipo: {
        id: 'monto-mision-instruccion-monto-mision',
        placeholder: 'Monto de compra',
      },
    },
  },
  {
    label: 'Misión simple (sin propiedades)',
    id: 'simple',
    tipo: 'simple',
  },
  {
    label: 'Misión con meta de compra (llegar a un monto de compra)',
    id: 'archivado',
    tipo: 'instruccion-input',
    properties: {
      message: 'title ...',
      placeholder: 'Instrucción',
      tipo: {
        id: 'instruccion-input-instruccion',
        placeholder: 'Monto de compra',
      },
    },
  },
  {
    label: 'Misión con instrucción de pasos',
    id: 'pasos',
    tipo: 'instruccion-pasos',
    properties: {
      message: 'Complete los pasos de la misión.',
      placeholder: 'Seleccione los pasos',
      tipo: {
        id: 'cantidad-pasos-mision-instruccion-pasos-mision',
        placeholder: 'Cantidad de pasos',
        values: [
          { id: 1, label: '1 paso' },
          { id: 2, label: '2 pasos' },
        ],
      },
    },
  },
];