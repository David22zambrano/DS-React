import moment from "moment"
import { EjemploAdjuntar, EjemploMultiSelect } from "./componentes"
import { PruebaModal } from "./componentes/Modal"
import { SincoCalendar } from "./componentes/SincoCalendar/SincoCalendar"
import { Button, Stack } from "@mui/material"
import { PageHeader } from "@sinco/react"

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
    // <Stack alignContent={"center"} justifyContent={"center"} p={2} gap={2} height={"700px"}>
      <Stack alignContent={"center"} justifyContent={"center"} p={2} gap={2} > 

       <PageHeader
        title="titulo"
        actions={<Button variant="contained" >Button</Button>}
      /> 
 
      <EjemploAdjuntar />
      <Stack flexDirection={"row"} alignContent={"center"} justifyContent={"center"} p={2} gap={2}>
        <PruebaModal />
        <EjemploMultiSelect />
      </Stack>

      {/* <SincoCalendar
        defaultView="week"

        onDoubleClickEvent={() => { console.log('funciono ') }}
        events={[
          {
            id: 0,
            title: 'My Event',
            start: new Date('2024-12-18T13:45:00-05:00'),
            end: new Date('2024-12-18T14:00:00-05:00')

            // start: moment().add(1, 'days').set({ hour: 10, minute: 0 }).toDate(),
            // end: moment().add(2, 'days').set({ hour: 23, minute: 0 }).toDate(),
          },
          {
            id: 2,
            title: 'Conference',
            start: new Date(2024, 12, 18),
            end: new Date(2024, 12, 18),
            // desc: 'Big conference for important people',
          },
          // {
          //   id: 1,
          //   title: 'Presentación de resultados',
          //   start: moment().add(1, 'days').set({ hour: 14, minute: 0 }).toDate(),
          //   end: moment().add(3, 'days').set({ hour: 15, minute: 0 }).toDate(),
          // },
          // {
          //   id: 2,
          //   title: 'Presentación',
          //   start: moment().add(1, 'days').set({ hour: 14, minute: 30 }).toDate(),
          //   end: moment().set({ hour: 16, minute: 0 }).toDate(),
          // },
        ]}
      /> */}
    </Stack>
  )
}

export default App
