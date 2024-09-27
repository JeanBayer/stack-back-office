import { FieldsType, FormComponentProps } from '@/types';
import { CSVForm } from './CSVForm';
import { InstruccionInputForm } from './InstruccionInputForm';
import { InstruccionMonto } from './MontoForm';
import { PasosForm } from './pasosForm/PasosForm';
import { SimpleForm } from './SimpleForm';

export const FormRegistry: Record<FieldsType, React.FC<FormComponentProps>> = {
  'instruccion-monto': InstruccionMonto,
  'instruccion-input': InstruccionInputForm,
  'instruccion-pasos': PasosForm,
  simple: SimpleForm,
  empty: () => null,
  csv: CSVForm,
  'radio-image': () => null,
};
