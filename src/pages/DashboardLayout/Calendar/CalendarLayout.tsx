import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CalendarLayout({ view = "day" }: { view: string }) {
  const navigate = useNavigate();
  const events =[
    {
      title: "All-day event",
      start: "2024-03-22T11:15:30.762Z",
      end: "2024-03-22T11:50:15.762Z",
    },
  ];

  const calendarRef = useRef<any>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (["timeGridDay", "dayGridWeek", "dayGridMonth"].includes(view)) {
        calendarApi.changeView(view);
      }
    }
  }, [view]);

  return (
    <>
      <div id={view === "dayGridMonth" ? "month" : view === 'dayGridWeek'  ? 'week': "day"}>
        <FullCalendar
          ref={calendarRef}
          height={"550px"}
          firstDay={1}
          slotLabelFormat={{
            hour: "numeric",
            hour12: true,
          }}
          slotMinTime={"10:00AM"}
          slotMaxTime={"19:00PM"}
          headerToolbar={false}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialEvents={events}
          initialView={view}
          eventBackgroundColor="rgba(64, 87, 66, 1)"
          eventClick={() => navigate("details")}
        />
      </div>
    </>
  );
}
