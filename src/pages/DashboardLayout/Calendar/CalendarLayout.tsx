import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef, useState } from "react";
import classes from "./calendar.module.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../UI/Dropdown/Dropdown";

export default function CalendarLayout({
  view = "dayGridWeek",
  data,
  stadiums,
}: {
  view: string;
  data: any[];
  stadiums: any[];
}) {
  console.log(stadiums);
  const [events, setEvents] = useState<any[]>([]);

  const navigate = useNavigate();

  const calendarRef = useRef<any>(null);

  const [currentStadium, setCurrentStadium] = useState<string>(
    data[0].stadion.title
  );

  useEffect(() => {
    const filteredEvents = data.filter(
      (item) => item.stadion.title_en === currentStadium
    );
    const updatedEvents = filteredEvents.map((item) => ({
      title: "New Game",
      start: item.startTime,
      end: item.endTime,
      className: " ",
    }));
    setEvents(updatedEvents);
  }, [data, currentStadium]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (view === "dayGridWeek") {
        calendarApi.gotoDate(new Date());
        calendarApi.changeView("dayGridWeek");
      }
      if (["timeGridDay", "dayGridWeek", "dayGridMonth"].includes(view)) {
        calendarApi.changeView(view);
      }
    }
  }, [view]);

  if (events.length > 2) {
    if (events[0].start === events[1].start || events[0].end > events[1].end) {
      events[1].className = classes["second-event"];
    } else if (events[1].start < events[0].start) {
      events[0].className = classes["second-event"];
    }
  }

  return (
    <>
      <div
        id={
          view === "dayGridMonth"
            ? "month"
            : view === "dayGridWeek"
            ? "week"
            : "day"
        }
      >
        <div className="flex jst-between align-center">
          <p style={{ fontWeight: "bold", color: 'rgba(190, 193, 190, 1)' }}>
            {`Today | `}
            <span style={{fontWeight: 300}}>
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </span>
          </p>
          <Dropdown
            current={currentStadium}
            onClick={(val: string) => setCurrentStadium(val)}
            stadium={stadiums}
          />
        </div>
        <FullCalendar
          ref={calendarRef}
          firstDay={1}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
          timeZone="local"
          dayHeaderClassNames={function (arg) {
            return arg.isToday ? classes.time : classes.other;
          }}
          slotMinTime={"9:00AM"}
          slotMaxTime={"24:00PM"}
          titleFormat={{ month: "long" }}
          headerToolbar={
            view === "dayGridMonth"
              ? {
                  start: "prev",
                  center: "title",
                  end: "next",
                }
              : false
          }
          dayHeaderContent={function (arg) {
            return `${arg.date.toString().split(" ")[0]} ${
              arg.date.toString().split(" ")[2]
            }`;
          }}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
          eventOverlap={true}
          initialView={view}
          eventMinWidth={500}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
          }}
          displayEventEnd={true}
          eventBackgroundColor="rgba(64, 87, 66, 1)"
          eventClick={() => navigate("details")}
        />
      </div>
    </>
  );
}
