// ----------------------------------------------Coponente Modal Sinco 
import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import { ModalSinco } from "./Modal";

export const PruebaModal = () => {
    const [open, setOpen] = useState(false);

    const controlCierre = useCallback(() => { 
        setOpen(prev => !prev);
    },[])

    const manejoCancelar =  useCallback(() => {
        console.log('Acción de cancelar');
        setOpen(prev => !prev);
    },[])

    const manejoAceptar = useCallback(() => {
        console.log('Acción de aceptar');
        setOpen(prev => !prev);
    },[])

    return (
        <Box>
            <Button onClick={() => controlCierre()}>Abrir Modal</Button>
            <ModalSinco
                open={open}
                onCancel={manejoCancelar}
                onAccept={manejoAceptar}
                title="Título del Modal warning"
                
                // Dsto es opcional se desea cambiar descripcion o por defecto trae ya una
                // description="Esta es la descripción del modal." 
                state="info" // Tipos del modal "warning" | "error" | "info".
            />
        </Box>
    );
};