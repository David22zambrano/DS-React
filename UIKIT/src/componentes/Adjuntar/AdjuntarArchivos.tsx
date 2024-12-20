import { useState, useEffect, useCallback } from "react";
import {
  AttachFile,
  DeleteOutline,
  UploadFileOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { Cloud } from "@sinco/react";

export interface AdjuntarProps<T> {
  fectuarBaseDeDatos: (archivos: T[]) => void;
  compact?: boolean;
  estilosPersonalizados?: SxProps;
  transformarArchivo: (archivo: File) => T;
}

export const AdjuntarArchivo = <T,>({
  compact,
  estilosPersonalizados,
  fectuarBaseDeDatos,
  transformarArchivo,
}: AdjuntarProps<T>) => {
  const [archivos, setArchivos] = useState<
    { archivo: File; transformado: T; progreso: number; cargaCompleta: boolean }[]
  >([]);

  useEffect(() => {
    archivos.forEach((archivo, indice) => {
      if (archivo.progreso < 100) {
        const intervalo = setInterval(() => {
          setArchivos((archivosPrevios) =>
            archivosPrevios.map((item, idx) =>
              idx === indice
                ? {
                  ...item,
                  progreso: Math.min(item.progreso + 10, 100),
                  cargaCompleta: Math.min(item.progreso + 10, 100) === 100,
                }
                : item
            )
          );
        }, 1000);
        return () => clearInterval(intervalo);
      }
    });
  }, [archivos]);

  const manejarSeleccionDeArchivos = (archivosSeleccionados: FileList | null) => {
    if (archivosSeleccionados) {
      setArchivos((prev) => [
        ...prev,
        ...Array.from(archivosSeleccionados).map((archivo) => ({
          archivo,
          transformado: transformarArchivo(archivo),
          progreso: 0,
          cargaCompleta: false,
        })),
      ]);
    }
  };

  const eliminarArchivo = useCallback(
    (indice: number) => {
      setArchivos((archivosPrevios) =>
        archivosPrevios.filter((_, idx) => idx !== indice)
      );
    },
    [setArchivos]
  );

  const manejarAdjuntarArchivos = (evento: React.MouseEvent) => {
    evento.stopPropagation();
    fectuarBaseDeDatos(archivos.map((e) => e.transformado));
    setArchivos([]);
  };

  const manejarSoltarArchivos = (evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    evento.stopPropagation();
    manejarSeleccionDeArchivos(evento.dataTransfer.files);
  };

  const manejarArrastrarSobreZona = (evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
  };

  return (
    <Stack
      width="100%"
      alignItems="center"
      bgcolor="transparent"
      height="100%"
      gap={1}
    >
      <Stack
        id="zona-arrastre"
        alignItems="center"
        flexDirection={compact === true ? "row" : "column"}
        justifyContent="center"
        bgcolor="transparent"
        width="100%"
        boxShadow={0}
        gap={1}
        borderRadius={1}
        py={3}
        onDrop={manejarSoltarArchivos}
        onDragOver={manejarArrastrarSobreZona}
        sx={{
          border: (theme) => `1px dashed ${theme.palette.grey[500]}`,
          cursor: "pointer",
          ":hover": {
            backgroundColor: "action.hover",
          },
          ...estilosPersonalizados,
        }}
      >
        <Cloud color="primary" fontSize="large" />
        <input
          type="file"
          multiple
          onChange={(e) => manejarSeleccionDeArchivos(e.target.files)}
          style={{ display: "none" }}
        />
        <Typography variant="body2" color="text.secondary" id="TipoArchivo">
          Arrastra o adjunta archivos
        </Typography>
        <Typography variant="caption" color="text.secondary">
          DOCX, XML, PNG, JPG ° {" "}
          <Typography variant="caption" color="text.secondary" id="PesoArchivo">
            Máx. 00MB
          </Typography>
        </Typography>
        <Button
          size="small"
          startIcon={<AttachFile fontSize="small" />}
          component="label"
        >
          Adjuntar
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => manejarSeleccionDeArchivos(e.target.files)}
          />
        </Button>
      </Stack>

      <Stack id="informacion" width="100%" height="auto" gap={1} sx={{ overflowY: "auto" }}>
        {archivos.map(({ archivo, progreso, cargaCompleta }, indice) => (
          <Stack
            flexDirection="row"
            key={`${archivo.name}-${indice}`}
            width="100%"
            gap={1}
            borderRadius={0.5}
            sx={{
              ":hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Stack width="100%" alignItems="center" flexDirection="row" gap={2} p={1}>
              <Stack width="100%" flexDirection="row" alignItems="center" gap={0.5}>
                <UploadFileOutlined color="primary" fontSize="small" />

                <Stack flexDirection="column" width="100%">
                  <Typography variant="body2" color="text.primary">
                    {archivo.name}
                  </Typography>
                  <Typography
                    id="estado-carga-completo"
                    variant="caption"
                    color="text.secondary"
                  >
                    {cargaCompleta
                      ? `${new Date().toLocaleDateString()} • ${Math.round(
                        archivo.size / 1024
                      )} KB`
                      : `Cargando... • ${Math.round(archivo.size / 1024)} KB`}
                  </Typography>
                  {!cargaCompleta && (
                    <LinearProgress
                      id="barra-progreso"
                      color="primary"
                      variant="determinate"
                      value={progreso}
                      sx={{ width: "100%" }}
                    />
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Box display="flex" justifyContent={"center"} alignItems="center">
              <IconButton size="medium" onClick={() => eliminarArchivo(indice)}>
                <DeleteOutline fontSize="small" color="action" />
              </IconButton>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

