// @ts-ignore
import { Views, Event, stringOrDate } from 'react-big-calendar';

// Esta es las propiedads que se  necesitan basicas para el calendario

export interface SincoCalendarProps {
    events: MyEvent[];
    startAccessor?: string; 
    endAccessor?: string;   
    titleAccessor?: string;
    defaultView?: 'month' | 'week' | 'work_week' | 'day' | 'agenda';
    selectable?: boolean;
    onSelectEvent?: (event: Event) => any;
    onDoubleClickEvent?: (event: Event) => any;
    onShowMore?: (events: Event[], date: Date) => any
    onSelectSlot?: (slotInfo: {
        start: stringOrDate;
        end: stringOrDate;
        slots: Date[];
    }) => void;
    onDrillDown?: (view: Views) => void;
    [key: string]: any;
};

export interface MyEvent {
    id: number;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    resource?: any;
}