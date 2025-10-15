import EventCards from "@/components/ui/UpcomingEventsCardCalenadr";
import RenderDates from "@/components/ui/DatesRender";
import MainCalendar from "@/components/ui/MainCalendar";
function Calendar() {
  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr"

  return (
    <div className={`min-h-screen ${ isRTL ? "rtl" : "ltr"}`}> 
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-2">
          View your schedule and upcoming events in the calendar.
        </p>
      </div>
      <div className="flex flex-col md:flex-row h-screen">    
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6 items-stretch ">
              <MainCalendar />
            <div className="w-full">
              <EventCards />
            </div>
          </div>
          <div className="flex flex-col xl:flex-1 bg-card mt-8 p-5 rounded-2xl shadow-lg border-1 hover:border-accent">
            <div className="rounded-2xl overflow-y-auto h-100 ">
              <RenderDates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;