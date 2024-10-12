import { Card } from '@nextui-org/react';
import { useMisione, useSelectId } from '../../hooks';

export const MisionDetails = () => {
  const { postQuery } = useMisione();
  const { id } = useSelectId();

  if (!id) return <div className="text-center text-gray-500 mt-10">No hay datos disponibles</div>;
  const data = postQuery.data || {};

  const {
    'modulo-premio': premio,
    'modulo-mision': mision,
    'modulo-mision-dynamic': misionDynamic,
    'modulo-icono': icono,
    'modulo-audiencia': audiencia,
    'modulo-audiencia-dynamic': audienciaDynamic,
    'modulo-mision-instruccion': instruccion,
    'modulo-premio-dynamic': premioDynamic
  } = data;

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card
        isBlurred
        className="border-none bg-background/70 dark:bg-default-100/60 max-w-[500px] rounded-lg shadow-lg p-4"
        shadow="lg"
      >
        <ul>
          <li>instruccion: {instruccion}</li>
          <li>audiencia: {audiencia}</li>
          <li>audienciaDynamic: <a href={audienciaDynamic instanceof File ? URL.createObjectURL(audienciaDynamic) : audienciaDynamic} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Descargar CSV</a></li>
          <li>icono: {icono}</li>
          <li>mision: {mision}</li>
          <li>misionDynamic: {misionDynamic}</li>
          <li>premio: {premio}</li>
          <li>premioDynamic: {premioDynamic}</li>
        </ul>
      </Card>
    </div>
  );
};
