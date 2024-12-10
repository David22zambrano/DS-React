import moment from 'moment';
import { ChevronLeft, ChevronRight, KeyboardArrowDown, LightModeOutlined } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import { ToolbarProps } from 'react-big-calendar';
import { useCallback, useState } from 'react';

export const CalendarToolbar = ({ onNavigate }: ToolbarProps) => {
    const [fechaActual, setFechaActual] = useState(moment());

    const mesAnterior = useCallback(() => {
        const nuevaFecha = fechaActual.clone().subtract(1, 'month');
        setFechaActual(nuevaFecha);
        onNavigate('PREV');
    }, [fechaActual, onNavigate]);

    const mesSiguiente = useCallback(() => {
        const nuevaFecha = fechaActual.clone().add(1, 'month');
        setFechaActual(nuevaFecha);
        onNavigate('NEXT');
    }, [fechaActual, onNavigate]);

    return (
        <Stack
            flexDirection={"row"}
            alignItems="center"
            justifyContent="center"
            gap={0.5}
            px={1}
            py={0.5}
            sx={{
 
            }}
        >
            <Box id="btn-hoy">
                <Chip
                    label="Hoy"
                    size="medium"
                    variant="standard"
                    icon={<LightModeOutlined fontSize="small" color="primary" />}
                    onClick={() => {
                        setFechaActual(moment());
                        onNavigate('TODAY');
                    }}
                />
            </Box>

            <Stack width={"100%"} gap={1} flexDirection="row" alignItems="center" justifyContent="center">
                <IconButton size="small" color="primary" onClick={mesAnterior}>
                    <ChevronLeft fontSize="inherit" />
                </IconButton>
                <IconButton size="small" color="primary" onClick={mesSiguiente}>
                    <ChevronRight fontSize="inherit" />
                </IconButton>
                <Typography variant="h6" color="primary">
                    {fechaActual.format('DD MMMM YYYY')}
                </Typography>
                <IconButton size="small" color="primary">
                    <KeyboardArrowDown fontSize="inherit" />
                </IconButton>
            </Stack>
        </Stack >
    );
};
