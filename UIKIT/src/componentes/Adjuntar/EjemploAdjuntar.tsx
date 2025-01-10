
// ADJUNTAR ARCHIVOS -------------------------------------------------------
import React from 'react';
import { AdjuntarArchivo } from './AdjuntarArchivos';

interface MiArchivo {
  id: string;
  nombre: string;
  tamano: number;
}

export const EjemploAdjuntar = () => {
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
      error={false} // si es true pues ves como se ve en modo error.
      // compact
      // detallesArchivo={{tipoArchivo: "Aqui iria los tipos de archivo que vayan usar", pesoMaximo: "el peso maximo que vayan usar"}}
      guardarArchivo={manejarArchivos}
      transformarArchivo={transformarArchivo}
    />
  );
};


