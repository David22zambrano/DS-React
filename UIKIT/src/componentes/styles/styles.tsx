// Este archivo va contener toda la configuracion del componente del calendario en un archivo .tsx
import styled from "styled-components";
import { Calendar } from "react-big-calendar";

export const StylesCalendar = styled(Calendar)`

  .rbc-month-view .rbc-event {
    background-color: transparent !important;
    box-shadow: transparent !important;
  }
  .rbc-month-view .rbc-calendar {
    border: none;
  }
  .rbc-month-view .rbc-header {
    border-bottom: 2px solid white;
  }
  .rbc-month-view .rbc-month-header {
    border-left: none !important;
  }
  .rbc-month-view {
    border: 1px solid white;
  }
  .rbc-month-view .rbc-month-row + .rbc-month-row {
    border-left: none !important;
    border-top: 4px solid transparent;
  }
  .rbc-month-view .rbc-row-bg {
    gap: 4px;
  }
  .rbc-month-view .rbc-today {
    background-color: black;
  }
  .rbc-month-view .rbc-day-bg {
    background-color: #fbfbfb;
    border-radius: 4px;
    gap: 4px;
    border: none !important;
  }
  .rbc-month-view .rbc-header + .rbc-header {
    border: none !important;
  }
  .rbc-month-view .rbc-selected-cell {
    background-color: red;
  }
  .rbc-month-view .rbc-off-range-bg {
    background-color: burlywood;
    border-radius: 4px;
  }
  .rbc-month-view .rbc-date-cell {
    border-radius: 4px;
  }
  .rbc-month-view .rbc-date-cell .rbc-now .rbc-current {
    background-color: blue;
  }
`;

//  default StylesCalendar;
