import {useTotalBooking, useTotalPending} from "../hooks/useBookingsStatus"
import useRevenue from "../hooks/useConfirmedRevenue";
import useTranslations from "../hooks/useTranslations";
import useAveragePrice from "@/hooks/useAverage";
import { ChartBarCustomLabel } from "@/components/ui/BarChartCustomLabel";
import { ChartBarLabel } from "@/components/ui/BarChartLabel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import { ChartPieLabel } from "@/components/ui/chart-pie-label";
function Analytics() {
  const {t} = useTranslations()
  const TotalBooking = useTotalBooking()
  const Pending = useTotalPending()
  const Revenue = useRevenue()
  const AveragePrice = useAveragePrice()
  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  const topServices = [
    { name: "Conference Room A", bookings: 156, revenue: "$18,720" },
    { name: "Private Office", bookings: 142, revenue: "$28,400" },
    { name: "Event Space", bookings: 98, revenue: "$44,100" },
    { name: "Meeting Room B", bookings: 134, revenue: "$12,060" },
    { name: "Training Room", bookings: 89, revenue: "$13,350" },
  ];
  
  return (
    <div className={`min-h-screen ${ isRTL ? "rtl" : "ltr"}`}> 
      <div className="flex flex-col md:flex-row h-screen">    
        {/* Main Content Area */}
        <div className={`flex-1`}>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 m-2 transition-all duration-300">
            <div className="bg-card p-5 rounded-lg shadow-sm border-1 border-border hover:border-accent hover:shadow-2xs">
              <div className="text-sm text-muted-foreground mb-2">{t("dashboard.Total Bookings")}</div>
              <div className="text-2xl font-bold text-card-foreground">{TotalBooking}</div>
            </div>
            <div className="bg-card p-5 rounded-lg shadow-sm border-1 border-border hover:border-accent hover:shadow-2xs">
              <div className="text-sm text-muted-foreground mb-2">{t("dashboard.Pending")}</div>
              <div className="text-2xl font-bold text-card-foreground">{Pending}</div>
            </div>
            <div className="bg-card p-5 rounded-lg shadow-sm border-1 border-border hover:border-accent hover:shadow-2xs">
              <div className="text-sm text-muted-foreground mb-2">{t("dashboard.Confirmed Revenue")}</div>
              <div className="text-2xl font-bold text-card-foreground rtl:">
              {Revenue ? Revenue.toFixed(2) : "0.00"}
              <span className="rtl:inline pl-2">IQD</span>
              </div>
            </div>
            <div className="bg-card p-5 rounded-lg shadow-sm border-1 border-border hover:border-accent hover:shadow-2xs">
              <div className="text-sm text-muted-foreground mb-2">{t("dashboard.Average Price")}</div>
              <div className="text-2xl font-bold text-card-foreground">
                {AveragePrice ? AveragePrice.toFixed(2) : "0.00"}
                <span className="rtl:inline pl-2">IQD</span>
              </div>
            </div>
          </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-2 mb-8">
              <div className="min-h-[400px] max-h-[600px]  ">
                <ChartBarCustomLabel />
              </div>
              <Card className="min-h-[400px] max-h-[600px] flex flex-col overflow-auto hover:border-accent">
              <CardHeader>
                <CardTitle>Top Performing Services</CardTitle>
                <CardDescription>Most booked services this period</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {topServices.map((service, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                        </div>
                      </div>
                      <span className="font-semibold">{service.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>
        <div className="mb-8">
          <ChartAreaInteractive />
        </div>
        <div className="flex flex-row gap-4 m-2 pb-10">
            <div className="max-w-[500px] max-h-[500px] flex-1">
              <ChartPieLabel />
            </div> 
            <div className="max-h-[500px] flex-1">
              <ChartBarLabel />
            </div> 
            
        </div>
          
      </div>
      </div>
    </div>
  );
}
export default Analytics;