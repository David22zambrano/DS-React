// @ts-ignore
import { Calendar, EventProps, momentLocalizer, Views } from 'react-big-calendar';
import '../styles/calendar.scss';
import { useMemo, useState, useEffect } from 'react';
import { CalendarToolbar, Evento, getMessagesES } from '.';
import { MyEvent, SincoCalendarProps } from './generales';
import { HeaderDayMonth } from './components/month/HeaderDayMonth';
import { DateHeader } from './components/month/DateHeader';
import moment from 'moment';
// import 'moment/locale/es';

const localizer = momentLocalizer(moment);
moment.locale('es');

export function SincoCalendar({
    events,
    startAccessor = 'start',
    endAccessor = 'end',
    titleAccessor = 'title',
    defaultView = 'month',
    selectable = true,
    onSelectEvent,
    onSelectSlot,
    onDoubleClickEvent,
    onShowMore,
    ...props
}: SincoCalendarProps) {

    const [currentView, setCurrentView] = useState(defaultView);
    const [repeatedEvents, setRepeatedEvents] = useState<MyEvent[]>([]);

    const handleViewChange = (view: Views) => {
        setCurrentView(view);
    };

    useEffect(() => {
        const repeated: MyEvent[] = events.flatMap(event => {
            const start = moment(event.start);
            const end = moment(event.end);
            const repeatedDays: MyEvent[] = [];

            while (start.isBefore(end, 'day')) {
                repeatedDays.push({
                    ...event,
                    start: start.clone().toDate(),
                    end: start.clone().add(1, 'hours').toDate(),
                });
                start.add(1, 'day');
            }

            return repeatedDays;
        });

        setRepeatedEvents(repeated);
    }, [events]);

    const components = useMemo(() => ({
        toolbar: CalendarToolbar,
        month: {
            header: HeaderDayMonth,
            dateHeader: DateHeader,
            event: Evento as React.FC<EventProps<MyEvent>>,
        },
        week: {

        }
    }), []);

    return (
        <Calendar
            culture="es"
            localizer={localizer}
            // events={repeatedEvents}
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
                    title: 'PRueba 2',
                    start: new Date('2024-12-18T16:45:00-05:00'),
                    end: new Date('2024-12-18T18:00:00-05:00')
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
            startAccessor={startAccessor}
            endAccessor={endAccessor}
            titleAccessor={titleAccessor}
            defaultView={defaultView}
            components={components}
            selectable={selectable}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            onDoubleClickEvent={onDoubleClickEvent}
            onShowMore={onShowMore}
            {...props}
        />
    );
}
