import {useTotalBooking, useTotalPending} from "../hooks/useBookingsStatus"
import useRevenue from "../hooks/useConfirmedRevenue";
import useTranslations from "../hooks/useTranslations";
import useAveragePrice from "@/hooks/useAverage";
import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import EventCards from "@/components/ui/UpcomingEventsCard";

function Dashboard() {
  const {t} = useTranslations()
  const TotalBooking = useTotalBooking()
  const Pending = useTotalPending()
  const Revenue = useRevenue()
  const AveragePrice = useAveragePrice()
  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  
  return (
    <div className={`min-h-screen ${ isRTL ? "rtl" : "ltr"}`}>
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your bookings, customers, and revenue all in one place.
        </p>
      </div>
      <div className="flex flex-col md:flex-row h-screen">    
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto`}>
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
    
            <div className="mb-6 ">
              <ChartAreaInteractive />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-2">
              
               <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:border-accent">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">{t("dashboard.Customer Rating")}</h2>
    
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-2xl">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <span className="ml-2 text-muted-foreground font-medium">4.8/5</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-16">5 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                      <div className="h-full bg-accent rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">85%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-16">4 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                      <div className="h-full bg-accent rounded-full" style={{width: '12%'}}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">12%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-16">3 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                      <div className="h-full bg-accent rounded-full" style={{width: '2%'}}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">2%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-16">2 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                      <div className="h-full bg-accent rounded-full" style={{width: '1%'}}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">1%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-16">1 {t("dashboard.stars")}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                      <div className="h-full bg-accent rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">0%</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Based on 247 reviews</p>
                </div>
              </div>
              <EventCards />
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Dashboard;