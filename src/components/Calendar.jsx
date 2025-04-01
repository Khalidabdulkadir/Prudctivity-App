import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEventContext } from '../context/EventContext';
import '../styles/Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events } = useEventContext();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDayEvents = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.dateTime);
      return isSameDay(eventDate, day);
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="calendar-grid">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days">
          {monthDays.map(day => {
            const dayEvents = getDayEvents(day);
            return (
              <div
                key={day.toString()}
                className={`day ${!isSameMonth(day, currentDate) ? 'other-month' : ''} 
                ${isSameDay(day, new Date()) ? 'today' : ''}`}
              >
                <span className="day-number">{format(day, 'd')}</span>
                {dayEvents.map(event => (
                  <div key={event.id} className="event-marker" title={event.title}>
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
