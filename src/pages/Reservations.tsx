
import { DataTable } from "@/components/ui/DataTable";

function Reservations() {

  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  const tableData = [
  {
    id: 1,
    name: "Sarah Johnson",
    space: "Conference Room A",
    status: "reserved",
    startTime: "6:30pm",
    endTime: "8:00pm",
    totalPrice: "$150",
    date: "2024/2/10"
  },
  {
    id: 2,
    name: "Michael Chen",
    space: "Workshop Studio",
    status: "pending",
    startTime: "7:00pm",
    endTime: "9:30pm",
    totalPrice: "$275",
    date: "2024/2/11"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    space: "Executive Lounge",
    status: "done",
    startTime: "5:00pm",
    endTime: "6:45pm",
    totalPrice: "$320",
    date: "2024/2/12"
  },
  {
    id: 4,
    name: "David Thompson",
    space: "Creative Lab",
    status: "reserved",
    startTime: "6:00pm",
    endTime: "7:30pm",
    totalPrice: "$190",
    date: "2024/2/13"
  },
  {
    id: 5,
    name: "Jessica Williams",
    space: "Meeting Pod 3",
    status: "pending",
    startTime: "8:15pm",
    endTime: "10:00pm",
    totalPrice: "$210",
    date: "2024/2/14"
  }
]
  return (
    <div className={`min-h-screen  ${ isRTL ? "rtl" : "ltr"}`}>
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <p className="text-muted-foreground mt-2">
          View your reservations and manage your bookings.
        </p>
      </div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="m-3 mt-2">
            <DataTable data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reservations;