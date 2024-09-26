import { FormComponentProps } from '@/types';
import { InstruccionInputForm } from './InstruccionInputForm';
import { MontoForm } from './MontoForm'
import { PasosForm } from './pasosForm/PasosForm';
import { SimpleForm } from './SimpleForm';

export  const FormRegistry: Record<string, React.FC<FormComponentProps>> = {
  'instruccion-monto': MontoForm,
  'instruccion-input': InstruccionInputForm,
  'instruccion-pasos': PasosForm,
  'simple': SimpleForm,
};