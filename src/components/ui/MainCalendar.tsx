"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/CustomCalendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useTranslations from "@/hooks/useTranslations"
import useDates from "@/stores/CalendarDate"
import i18n from "@/plugins/i18n"
import {ar,enUS} from "date-fns/locale"
export default function MainCalendar() {
  const {date,month,setDate,setMonth,Today} = useDates()
  const {t} = useTranslations()
  return (
    <Card className="w-full shadow-lg border-1 bg-card hover:border-accent">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-muted-foreground">{t("calendar.Appointments")}</CardTitle>
        <CardDescription className="text-muted-foreground text-lg">{t("calendar.Find a date")}</CardDescription>
        <Button
          size="sm"
          variant="outline"
          onClick={Today}
          className="mt-2 dark:hover:bg-accent"
        >
          {t("calendar.Today")}
        </Button>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        {[0].map((offset) => (
          <div key={offset} className="border border-border rounded-xl p-4 bg-card shadow-md flex justify-center">
            <Calendar
              mode="single"
              required
              month={new Date(month!.getFullYear(), month!.getMonth() + offset)}
              onMonthChange={setMonth}
              selected={date}
              onSelect={setDate}
              locale={i18n.language === "ar" ? ar : enUS }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
