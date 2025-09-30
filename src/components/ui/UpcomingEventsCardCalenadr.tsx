import { Card, CardContent } from "@/components/ui/card";
import useTranslations from "@/hooks/useTranslations";

const events = [
    { title: "Team Sync Meeting", time: "Jun 12, 9am - 10am" },
    { title: "Design Review", time: "Jun 12, 11:30am - 12:30pm" },
    { title: "Client Presentation", time: "Jun 12, 2pm - 3pm" },
    { title: "Product Demo", time: "Jun 13, 10am - 11am" },
    { title: "Sprint Planning", time: "Jun 13, 1pm - 3pm" },
    { title: "Code Review", time: "Jun 14, 2pm - 3pm" },
    { title: "Team Lunch", time: "Jun 14, 12pm - 1pm" },
    { title: "Budget Meeting", time: "Jun 15, 9:30am - 10:30am" },
    { title: "Training Session", time: "Jun 15, 11am - 12:30pm" },
    { title: "Quarterly Review", time: "Jun 16, 9am - 11am" },
  ];

export default function EventCards() {
  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  const {t} = useTranslations()
  return (
    <Card className="w-full bg-gray-50 shadow-xl">
      <CardContent className="h-147 space-y-3 overflow-y-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">{t("dashboard.Upcoming Events")}</h1>
        {events.map((event, index) => (
        <>
        <div className="relative">
          <div
            key={index}
            className={"rounded-xl p-3 pl-6 border-1 rtl:pr-5 bg-gray-50 hover:bg-white"}
          >
            <h3 className="text-sm font-medium">{event.title}</h3>
            <p className="text-muted-foreground text-xs">{event.time}</p>
          </div>
          <div className="absolute start-3 rtl:start-2 top-3.5 h-8 w-1 rounded-full bg-gray-600" style={{top: isRTL ? "0.9rem" : ""}}/>
        </div>
        </>
        ))}
      </CardContent>
    </Card>
  );
}