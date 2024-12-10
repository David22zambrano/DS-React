// ----------------------------------------------Modal Sinco
import { useState } from "react";
import { Button } from "@mui/material";
import { ModalSinco } from "./Modal";

export const PruebaModal = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(prev => !prev);
    };

    const handleCancel = () => {
        console.log('Acción de cancelar');
        setOpen(prev => !prev);
    };

    const handleAccept = () => {
        console.log('Acción de aceptar');
        setOpen(prev => !prev);
    };

    return (
        <>
            <Button onClick={() => handleClose()}>Abrir Modal</Button>
            <ModalSinco
                open={open}
                onCancel={handleCancel}
                onAccept={handleAccept}
                title="Título del Modal warning"
                // description="Esta es la descripción del modal." / esto es opcional se desea cambiar descripcion o por defecto trae ya una
                state="warning"
            />
            {/* <ModalSinco
                open={open}
                onCancel={handleCancel}
                onAccept={handleAccept}
                title="Título del Modal primary"
                // description="Esta es la descripción del modal." / esto es opcional la descripcion o por defecto trae ya un
                state="primary"
            /> */}
            
            {/* <ModalSinco
                open={open}
                onCancel={handleCancel}
                onAccept={handleAccept}
                title="Título del Modal error"
                // description="Esta es la descripción del modal." / esto es opcional la descripcion o por defecto trae ya un
                state="error"
            /> */}

        </>
    );
};