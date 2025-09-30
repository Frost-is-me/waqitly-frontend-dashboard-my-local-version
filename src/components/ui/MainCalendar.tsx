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
    <Card className="w-fit shadow-xl border-1 bg-gray-50">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">{t("calendar.Appointments")}</CardTitle>
        <CardDescription className="text-gray-600 text-lg">{t("calendar.Find a date")}</CardDescription>
        <Button
          size="sm"
          variant="outline"
          onClick={Today}
          className="mt-2"
        >
          {t("calendar.Today")}
        </Button>
      </CardHeader>
      <CardContent className="flex gap-8 justify-center p-6">
        {[0,1].map((offset) => (
          <div key={offset} className="border border-gray-100 rounded-xl p-4 bg-gray-50 shadow-md h-[390px] overflow-hidden">
            <Calendar
              mode="single"
              required
              month={new Date(month!.getFullYear(), month!.getMonth() + offset)}
              onMonthChange={setMonth}
              selected={date}
              onSelect={setDate}
              locale={i18n.language === "ar" ? ar : enUS }
              className="[&_.rdp-month]:w-[280px]"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
