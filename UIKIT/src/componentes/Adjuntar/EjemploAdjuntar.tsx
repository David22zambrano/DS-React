
// ADJUNTAR ARCHIVOS -------------------------------------------------------
import React, { useState } from 'react';
import { AdjuntarArchivo } from './AdjuntarArchivos';

interface MiArchivo {
  id: string;
  nombre: string;
  tamano: number;
}


export const EjemploAdjuntar = () => {
  
  // El estado de error esta por defecto en estado false si se desea ver la vista en modo error debe cambiar este valor a true
  const [error, setError] = useState(false);

  const transformarArchivo = (file: File): MiArchivo => ({
    id: file.lastModified.toString(),
    nombre: file.name,
    tamano: file.size,
  });

  const manejarArchivos = (archivos: MiArchivo[]) => {
    console.log('Archivos adjuntados:', archivos);
  };

  return (
    <AdjuntarArchivo<MiArchivo>
      // compact
      onChangeAdjuntar={() => { }}
      onClickAdjuntar={() => { }}
      detallesArchivo={{
        tipoArchivo: 'DOCX, XML, PNG, JPG ',
        pesoMaximo: error ? "Archivo no soportado" : "Máx. 00MB"
      }}
      detallesAdjunto={{
        tipoArchivo: "Archivo supero el limite", pesoMaximo: error ? "Carga fallida" : "Máx. 00MB"
      }}
      error={error}
      guardarArchivo={manejarArchivos}
      transformarArchivo={transformarArchivo}
    />
  );
};
