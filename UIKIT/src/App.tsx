import moment from "moment"
import { EjemploAdjuntar, PruebaMultiSelect } from "./componentes"
import { PruebaModal } from "./componentes/Modal"
import { SincoCalendar } from "./componentes/SincoCalendar/SincoCalendar"


function App() {
  return (
    // comentar =  Control + K + C / Descomentar  CTrl + K+ C
    <>
      <EjemploAdjuntar />
      <PruebaModal />
      
      <PruebaMultiSelect />
      {/* <SincoCalendar
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
    </>
  )
}

export default App
