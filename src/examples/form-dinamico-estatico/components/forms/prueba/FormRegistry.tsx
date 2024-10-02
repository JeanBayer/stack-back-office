import { FieldsType, FormComponentProps } from '@/types';
import { CSVForm } from './CSVForm';
import { InstruccionInputForm } from './InstruccionInputForm';
import { MontoForm } from './MontoForm';
import { NumeroForm } from './NumeroForm';
import { PasosForm } from './pasosForm/PasosForm';
import { PorcentajeForm } from './PorcentajeForm';
import { SimpleForm } from './SimpleForm';

export const FormRegistry: Record<FieldsType, React.FC<FormComponentProps>> = {
  monto: MontoForm,
  numero: NumeroForm,
  porcentaje: PorcentajeForm,
  'instruccion-input': InstruccionInputForm,
  'instruccion-pasos': PasosForm,
  simple: SimpleForm,
  empty: () => null,
  csv: CSVForm,
  'radio-image': () => null,
};
