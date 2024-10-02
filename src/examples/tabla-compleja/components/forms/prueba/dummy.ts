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
    tipo: 'monto',
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

export const optionsModuloIcono: Option[] = [
  {
    label: 'Compra',
    id: 'modulo-icono-compra',
    tipo: 'radio-image',
    properties: {
      message: 'Cuando la misión está asociada a una compra en BciPlus+',
      placeholder: 'Compra:',
      values: 'https://cdn-icons-png.flaticon.com/512/25/25236.png',
    },
  },
  {
    label: 'Tarjeta',
    id: 'modulo-icono-tarjeta',
    tipo: 'radio-image',
    properties: {
      message:
        'Cuando la misión está asociada a una compra con Tarjeta BciPlus+',
      placeholder: 'Tarjeta:',
      values: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    },
  },
];

export const optionsModuloPremio: Option[] = [
  {
    label: 'Monto fijo',
    id: 'modulo-premio-monto-fijo',
    tipo: 'monto',
    properties: {
      id: 'modulo-premio-dynamic',
      placeholder: 'Monto del premio',
      message: 'Visualizacion: Conseguirás un premio de $[XX] de cashback',
    },
  },
  {
    label: 'Cashback extra generado por la compra',
    id: 'modulo-premio-cashback-extra-compra',
    tipo: 'porcentaje',
    properties: {
      id: 'modulo-premio-dynamic',
      placeholder: 'Porcentaje de aumento',
      message:
        'Visualizacion: Conseguirás [XX]% extra de cashback sobre el total de tu compra',
    },
  },
  {
    label: 'Cashback extra por pago con Tarjeta BciPlus+',
    id: 'modulo-premio-cashback-extra-tarjeta',
    tipo: 'numero',
    properties: {
      id: 'modulo-premio-dynamic',
      placeholder: 'Numero',
      message:
        'Visualizacion: Lograrás que tu tarjeta genere [XX] veces más cashback por tu compra',
    },
  },
];
