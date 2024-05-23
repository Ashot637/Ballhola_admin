import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import classes from "./calendar.module.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CalendarLayout({
  view = "dayGridWeek",
  data,
  stadions,
}: {
  view: string;
  data: any[];
  stadions: any[];
}) {
  const [events, setEvents] = useState<any[]>([]);
  const [currentStadium, setCurrentStadium] = useState<string>(" ");
  const [current, setCurrent] = useState(new Date())

  const navigate = useNavigate();
  const calendarRef = useRef<any>(null);

  const handleEventClick = (id: string) => {
    navigate(`${id}/details`);
  };

  useEffect(() => {
    if (currentStadium === " ") {
      setCurrentStadium(stadions[0]?.title_en);
    }
    const filteredEvents = data.filter(
      (item) => item.stadion.title_en === currentStadium
    );
    const updatedEvents = filteredEvents.map((item) => ({
      id: item.id,
      title:
        item.maxPlayersCount - item.playersCount === 0
          ? "Sold Out"
          : item.maxPlayersCount - item.playersCount < 3
          ? `Only ${item.maxPlayersCount - item.playersCount} places are left`
          : "New Game",
      start: item.startTime,
      end: item.endTime,
      className:
        item.maxPlayersCount - item.playersCount === 0
          ? classes.soldOut
          : item.maxPlayersCount - item.playersCount < 3
          ? classes.fewPlaces
          : classes.newGame,
    }));
    setEvents(updatedEvents);
  }, [data, currentStadium]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (view === "dayGridWeek") {
        setTimeout(() => {
          calendarApi.gotoDate(new Date());
        });
      }
      if (["timeGridDay", "dayGridWeek", "dayGridMonth"].includes(view)) {
        setTimeout(() => {
          calendarApi.changeView(view);
        });
      }
    }
  }, [view]);

  const dateHandler=(currentDate: Date)=>{
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(new Date(currentDate));
  }


  return (
    <div style={view === "timeGridDay" ? { display: "flex", gap: 30 } : {}}>
      {view === "timeGridDay" && (
        <div id="small-month" style={{width:350, position: 'relative'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={(e:any)=>dateHandler(e)} className={classes.newCalendar} />
          </LocalizationProvider>
        </div>
      )}
      <div
        id={
          view === "dayGridMonth"
            ? "month"
            : view === "dayGridWeek"
            ? "week"
            : "day"
        }
      >
        <div className="flex jst-end">
          {stadions.length > 1 && (
            <Dropdown
              current={
                currentStadium ? currentStadium : data[0].stadion.title_en
              }
              onClick={(val: string) => setCurrentStadium(val)}
              stadium={stadions}
            />
          )}
        </div>
        <FullCalendar
          initialDate={new Date(current)}
          ref={calendarRef}
          firstDay={1}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
          timeZone="local"
          height={1000}
          slotMinTime={"8:00AM"}
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
          dayHeaderContent={(arg) => (
            <div
              className={
                view === "dayGridWeek" &&
                arg.date.getDay() === new Date().getDay()
                  ? classes.time
                  : classes.other
              }
            >
              {view === "dayGridWeek"
                ? `${arg.date.toString().split(" ")[0]} ${
                    arg.date.toString().split(" ")[2]
                  }`
                : arg.date.toString().split(" ")[0]}
            </div>
          )}
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
          eventClick={(info) => handleEventClick(info.event.id)}
        />
      </div>
    </div>
  );
}
