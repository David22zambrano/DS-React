import { Button } from "@mui/material";
import { Drawer } from "@sinco/react";
import { useState } from "react";
import RadioButtonsGroup from "../prueba";

export const EjemploDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    // Función para abrir el Drawer
    const abrirDrawer = () => {
        setOpenDrawer(true);
    };

    // Función para cerrar el Drawer
    const cerrarDrawer = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <Button variant="contained" onClick={abrirDrawer} >
                Abrir Drawer
            </Button>
            <Drawer

                open={openDrawer}
                onClose={cerrarDrawer}
                anchor="left"
                title="title"
                color="text.secondary"
                children={<>
                <RadioButtonsGroup />
                </>} width={"400px"} anchorActions={"flex-end"}></Drawer >

        </>
    )


}

