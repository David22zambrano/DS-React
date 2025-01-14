import { useState, useEffect, useCallback } from "react";
import {
  AttachFile,
  CancelOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  DeleteOutline,
  UploadFileOutlined,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { Evento } from "../SincoCalendar";

export interface AdjuntarProps<T> {
  compact?: boolean;
  sx?: SxProps;
  error?: boolean;
  detallesArchivo?: {
    tipoArchivo: string;
    pesoMaximo: string;
  };
  detallesAdjunto?: {
    tipoArchivo: string;
    pesoMaximo: string;
  }
  onChangeAdjuntar?: () => void;
  onClickAdjuntar?: () => void;
  guardarArchivo: (archivos: T[]) => void;
  transformarArchivo: (archivo: File) => T;
}

export const AdjuntarArchivo = <T,>({
  compact,
  sx,
  error,
  guardarArchivo,
  onChangeAdjuntar,
  onClickAdjuntar,
  detallesArchivo = { tipoArchivo: 'DOCX, XML, PNG, JPG', pesoMaximo: 'Máx. 00MB' },
  detallesAdjunto,
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
    >
      <Stack
        id="zona-arrastre"
        alignItems="center"
        flexDirection={compact === true ? "row" : "column"}
        justifyContent={compact === true ? "space-between" : "center"}
        bgcolor="transparent"
        width="100%"
        boxShadow={0}
        gap={1.5}
        borderRadius={1}
        py={compact ? 1.5 : 3}
        px={compact ? 1.5 : 0}
        onDrop={manejarSoltarArchivos}
        onDragOver={manejarArrastrarSobreZona}
        onClick={() => document.getElementById("input-archivos")?.click()}
        sx={{
          border: error
            ? (theme) => `1px solid ${theme.palette.error.main}`
            : (theme) => `1px dashed ${theme.palette.grey[500]}`,
          cursor: "pointer",
          ":hover": {
            backgroundColor: error
              ? "#D143430A"
              : "action.hover",
          },
          ...sx,
        }}

      >
        <Stack alignItems={"center"} flexDirection={compact ? "row" : "column"} gap={1.5}>
          <Box
            display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"100%"} width={"36px"} height={"36px"} bgcolor={error ? (theme) => theme.palette.error[50] : (theme) => theme.palette.primary[50]}>
            <CloudUploadOutlined fontSize="medium" color="primary"
              sx={{
                color: error ? (theme) => theme.palette.error.main : (theme) => theme.palette.primary.main,
              }} />
          </Box>
          <Box flexDirection={"column"} >
            <Typography variant="body2" id="TipoArchivo" color="text.primary" textAlign={compact ? "start" : "center"}>
              Arrastra o adjunta archivos
            </Typography>
            <Typography variant="caption" color={error ? "error" : "text.secondary"}>
              {detallesArchivo.tipoArchivo} •  {" "}
              <Typography variant="caption" color={error ? "error" : "text.secondary"} id="PesoArchivo">
                {detallesArchivo.pesoMaximo}
              </Typography>
            </Typography>
          </Box>
          <input
            id="input-archivos"
            type="file"
            multiple
            hidden
            onChange={(e) => manejarSeleccionDeArchivos(e.target.files)}
          />
        </Stack>

        <Button
          size="small"
          startIcon={<AttachFile fontSize="small" />}
          component="label"
          onClick={(event) => {
            event.stopPropagation();
            if (onClickAdjuntar) onClickAdjuntar();
          }}
          onChange={onChangeAdjuntar}
        >
          Adjuntar
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
                <UploadFileOutlined
                  fontSize="small"
                  sx={{ color: error ? (theme) => theme.palette.error[50] : (theme) => theme.palette.primary.main }}
                />

                <Stack flexDirection="column" width="100%">
                  <Typography variant="body2" color="text.primary" >
                    {archivo.name}
                  </Typography>
                  <Typography
                    id="estado-carga-completa"
                    variant="caption"
                    color={error ? "error" : "text.secondary"}
                  >
                    {cargaCompleta && error && detallesAdjunto
                      ? `${detallesAdjunto.tipoArchivo} • ${detallesAdjunto.pesoMaximo}`
                      : `${new Date().toLocaleDateString()} • ${Math.round(
                        archivo.size / 1024
                      )} KB`}
                    {/* {cargaCompleta 
                      ? `${new Date().toLocaleDateString()} • ${Math.round(
                        archivo.size / 1024
                      )} KB`
                      : `Cargando... • ${Math.round(archivo.size / 1024)} KB`
                    } */}
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
              {!cargaCompleta ? (
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => eliminarArchivo(indice)}>
                    <CancelOutlined fontSize="small" color="primary" />
                  </IconButton>
                </Stack>
              ) : (
                <IconButton size="medium" onClick={() => eliminarArchivo(indice)}>
                  <DeleteOutline fontSize="small" color="action" />
                </IconButton>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

