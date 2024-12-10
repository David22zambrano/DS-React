import moment from "moment"
import { EjemploAdjuntar, EjemploMultiSelect } from "./componentes"
import { PruebaModal } from "./componentes/Modal"
import { SincoCalendar } from "./componentes/SincoCalendar/SincoCalendar"
import { Stack } from "@mui/material"

// TIPS:

// Crtl + Ñ muestra la terminar de visualCode
// Comentar / Descomentar lineas de codigo :  Ctrl + K + C   

// Como ejecuctar el proyecto.

// 1. Instalacion de node modules desde la terminal de VisualCode
//    Comando:  npm install 

// Ejecucion del proyecto
//    Comando: npm run dev



function App() {
  return (
    <Stack alignContent={"center"} justifyContent={"center"} p={2} gap={2}>
      <EjemploAdjuntar />
      <Stack flexDirection={"row"} alignContent={"center"} justifyContent={"center"} p={2} gap={2}>
        <PruebaModal />
        <EjemploMultiSelect />
      </Stack>
{/* 
      <SincoCalendar
        onDoubleClickEvent={() => { console.log('funciono ') }}
        events={[
          {
            id: 0,
            title: 'Reunión de equipo',
            start: moment().set({ hour: 10, minute: 0 }).toDate(),
            end: moment().set({ hour: 11, minute: 30 }).toDate(),
          },
          {
            id: 1,
            title: 'Presentación de resultados',
            start: moment().add(1, 'days').set({ hour: 14, minute: 0 }).toDate(),
            end: moment().add(3, 'days').set({ hour: 15, minute: 0 }).toDate(),
          },
          {
            id: 2,
            title: 'Presentación de resultados',
            start: moment().add(1, 'days').set({ hour: 14, minute: 0 }).toDate(),
            end: moment().add(3, 'days').set({ hour: 15, minute: 0 }).toDate(),
          },
        ]}
      /> */}
    </Stack>
  )
}

export default App
