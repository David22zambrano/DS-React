import moment from 'moment';
import { ChevronLeft, ChevronRight, KeyboardArrowDown, LightModeOutlined } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Theme, Typography } from '@mui/material';
import { ToolbarProps } from 'react-big-calendar';
import { useCallback, useState } from 'react';

export interface CalendarToolbarProps extends ToolbarProps {
    children?: React.ReactNode;
}

export const CalendarToolbar = ({ onNavigate, children }: ToolbarProps) => {

    const [fechaActual, setFechaActual] = useState(moment());

    const mesAnterior = useCallback(() => {
        const nuevaFecha = fechaActual.clone().subtract(1, 'month');
        setFechaActual(nuevaFecha);
        onNavigate('PREV');
    }, [fechaActual]);

    const mesSiguiente = useCallback(() => {
        const nuevaFecha = fechaActual.clone().add(1, 'month');
        setFechaActual(nuevaFecha);
        onNavigate('NEXT');
    }, [fechaActual]);

    return (
        <Stack direction="row" width={"100%"} alignItems="center" justifyContent="flex-start" gap={.5} px={1} py={.5}  >
            <Box id="btn-hoy">
                <Chip
                    label="Hoy" size='medium' variant="standard" color="primary" icon={<LightModeOutlined fontSize="small" color="primary" />}
                    onClick={() => {
                        setFechaActual(moment());
                        onNavigate('TODAY');
                    }} />
            </Box>
            <Stack id="btns-nav-meses" width={"100%"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={.5}>
                <IconButton size="small" color="primary" onClick={mesAnterior} >
                    <ChevronLeft fontSize="inherit" />
                </IconButton>
                <IconButton size="small" color="primary" onClick={mesSiguiente}  >
                    <ChevronRight fontSize="inherit" />
                </IconButton>
                <Typography variant='h6' color='primary'> {fechaActual.format('DD MMMM YYYY')} </Typography>
                <IconButton size="small" color="primary" >
                    <KeyboardArrowDown fontSize="inherit" />
                </IconButton>
            </Stack>
            {children && (
                <Stack>
                    {children}
                </Stack>
            )}
        </Stack>
    );
};
