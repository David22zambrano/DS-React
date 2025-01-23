declare module 'react-big-calendar' {
    import { ComponentType } from 'react';
    import { Calendar, EventProps, momentLocalizer, Views } from 'react-big-calendar';
  
    export const Calendar: ComponentType<any>;
    export const momentLocalizer: (momentInstance: any) => any;
    export const Views: any;
  
    export interface EventProps<T = any> {
      event: T;
      title: string;
      start: Date;
      end: Date;
    }
  
    export default Calendar;
  }
  