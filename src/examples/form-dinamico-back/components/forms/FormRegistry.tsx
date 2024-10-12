import { FieldsType, FormComponentProps } from '@/types';
import { MontoForm } from './MontoForm';
import { NumeroForm } from './NumeroForm';
import { PorcentajeForm } from './PorcentajeForm';
import { InstruccionInputForm } from './InstruccionInputForm';
import { PasosForm } from './PasosForm';
import { SimpleForm } from './SimpleForm';
import { CSVForm } from './CSVForm';


export const FormRegistry: Record<FieldsType, React.FC<FormComponentProps>> = {
  monto: MontoForm,
  numero: NumeroForm,
  porcentaje: PorcentajeForm,
  'instruccion-input': InstruccionInputForm,
  'instruccion-pasos': PasosForm,
  simple: SimpleForm,
  empty: () => null,
  csv: CSVForm as unknown as React.FC<FormComponentProps>,
  'radio-image': () => null,
};
