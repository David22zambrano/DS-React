
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
      // compact
      error={true}
      guardarArchivo={manejarArchivos}
      transformarArchivo={transformarArchivo}
    />
  );
};


