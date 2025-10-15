  import useDates from "@/stores/CalendarDate"
  import useTranslations from "@/hooks/useTranslations"
  import axios from "axios"
  import { toast } from "sonner"
  import { useIsMobile } from "@/hooks/use-mobile"
  import { Input } from "./input"
  import { Label } from "./label"
  import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
  const tableData = [
  {
    id: 1,
    name: "Sarah Johnson",
    space: "Conference Room A",
    status: "reserved",
    startTime: "6:30pm",
    endTime: "8:00pm",
    totalPrice: "$150",
    date: "2025/9/30"
  },
  {
    id: 2,
    name: "Michael Chen",
    space: "Workshop Studio",
    status: "pending",
    startTime: "7:00pm",
    endTime: "9:30pm",
    totalPrice: "$275",
    date: "2025/9/30"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    space: "Executive Lounge",
    status: "done",
    startTime: "5:00pm",
    endTime: "6:45pm",
    totalPrice: "$320",
    date: "2025/9/30"
  },
  {
    id: 4,
    name: "David Thompson",
    space: "Creative Lab",
    status: "reserved",
    startTime: "6:00pm",
    endTime: "7:30pm",
    totalPrice: "$190",
    date: "2025/9/30"
  },
  {
    id: 5,
    name: "Jessica Williams",
    space: "Meeting Pod 3",
    status: "pending",
    startTime: "8:15pm",
    endTime: "10:00pm",
    totalPrice: "$210",
    date: "2025/9/30"
  },
  {
    id: 6,
    name: "Robert Martinez",
    space: "Conference Room A",
    status: "done",
    startTime: "4:30pm",
    endTime: "6:15pm",
    totalPrice: "$180",
    date: "2025/10/1"
  },
  {
    id: 7,
    name: "Amanda Wilson",
    space: "Workshop Studio",
    status: "reserved",
    startTime: "7:30pm",
    endTime: "9:00pm",
    totalPrice: "$240",
    date: "2025/10/1"
  },
  {
    id: 8,
    name: "Daniel Kim",
    space: "Executive Lounge",
    status: "pending",
    startTime: "6:45pm",
    endTime: "8:30pm",
    totalPrice: "$350",
    date: "2025/10/1"
  },
  {
    id: 9,
    name: "Olivia Brown",
    space: "Creative Lab",
    status: "cancelled",
    startTime: "5:30pm",
    endTime: "7:00pm",
    totalPrice: "$165",
    date: "2025/10/2"
  },
  {
    id: 10,
    name: "James Anderson",
    space: "Meeting Pod 3",
    status: "reserved",
    startTime: "8:00pm",
    endTime: "9:45pm",
    totalPrice: "$225",
    date: "2025/10/2"
  },
  {
    id: 11,
    name: "Sophia Garcia",
    space: "Conference Room A",
    status: "rejected",
    startTime: "7:15pm",
    endTime: "9:00pm",
    totalPrice: "$195",
    date: "2025/10/2"
  },
  {
    id: 12,
    name: "Matthew Davis",
    space: "Workshop Studio",
    status: "done",
    startTime: "6:00pm",
    endTime: "8:30pm",
    totalPrice: "$290",
    date: "2025/10/3"
  },
  {
    id: 13,
    name: "Isabella Lopez",
    space: "Executive Lounge",
    status: "reserved",
    startTime: "5:45pm",
    endTime: "7:15pm",
    totalPrice: "$280",
    date: "2025/10/3"
  },
  {
    id: 14,
    name: "Christopher Lee",
    space: "Creative Lab",
    status: "pending",
    startTime: "8:30pm",
    endTime: "10:15pm",
    totalPrice: "$200",
    date: "2025/10/3"
  },
  {
    id: 15,
    name: "Mia Hernandez",
    space: "Meeting Pod 3",
    status: "cancelled",
    startTime: "6:30pm",
    endTime: "8:00pm",
    totalPrice: "$175",
    date: "2025/10/4"
  },
  {
    id: 16,
    name: "Andrew Clark",
    space: "Conference Room A",
    status: "reserved",
    startTime: "7:45pm",
    endTime: "9:30pm",
    totalPrice: "$210",
    date: "2025/10/4"
  },
  {
    id: 17,
    name: "Charlotte Walker",
    space: "Workshop Studio",
    status: "pending",
    startTime: "6:15pm",
    endTime: "8:45pm",
    totalPrice: "$310",
    date: "2025/10/4"
  },
  {
    id: 18,
    name: "Joshua Hall",
    space: "Executive Lounge",
    status: "done",
    startTime: "5:30pm",
    endTime: "7:30pm",
    totalPrice: "$400",
    date: "2025/10/5"
  },
  {
    id: 19,
    name: "Chloe Young",
    space: "Creative Lab",
    status: "reserved",
    startTime: "8:00pm",
    endTime: "9:15pm",
    totalPrice: "$140",
    date: "2025/10/5"
  },
  {
    id: 20,
    name: "Kevin King",
    space: "Meeting Pod 3",
    status: "rejected",
    startTime: "7:00pm",
    endTime: "8:45pm",
    totalPrice: "$185",
    date: "2025/10/5"
  },
  {
    id: 21,
    name: "Elizabeth Scott",
    space: "Conference Room A",
    status: "done",
    startTime: "6:45pm",
    endTime: "8:30pm",
    totalPrice: "$205",
    date: "2025/10/6"
  },
  {
    id: 22,
    name: "Ryan Green",
    space: "Workshop Studio",
    status: "reserved",
    startTime: "5:15pm",
    endTime: "7:45pm",
    totalPrice: "$325",
    date: "2025/10/6"
  },
  {
    id: 23,
    name: "Grace Adams",
    space: "Executive Lounge",
    status: "pending",
    startTime: "8:15pm",
    endTime: "10:00pm",
    totalPrice: "$370",
    date: "2025/10/6"
  },
  {
    id: 24,
    name: "Nicholas Nelson",
    space: "Creative Lab",
    status: "cancelled",
    startTime: "7:30pm",
    endTime: "9:00pm",
    totalPrice: "$155",
    date: "2025/10/7"
  },
  {
    id: 25,
    name: "Ava Carter",
    space: "Meeting Pod 3",
    status: "reserved",
    startTime: "6:00pm",
    endTime: "7:30pm",
    totalPrice: "$170",
    date: "2025/10/7"
  },
  {
    id: 26,
    name: "Thomas Mitchell",
    space: "Conference Room A",
    status: "pending",
    startTime: "8:30pm",
    endTime: "10:15pm",
    totalPrice: "$220",
    date: "2025/10/7"
  },
  {
    id: 27,
    name: "Samantha Perez",
    space: "Workshop Studio",
    status: "done",
    startTime: "5:45pm",
    endTime: "8:15pm",
    totalPrice: "$345",
    date: "2025/10/8"
  },
  {
    id: 28,
    name: "Benjamin Roberts",
    space: "Executive Lounge",
    status: "reserved",
    startTime: "7:00pm",
    endTime: "8:45pm",
    totalPrice: "$290",
    date: "2025/10/8"
  },
  {
    id: 29,
    name: "Lily Turner",
    space: "Creative Lab",
    status: "rejected",
    startTime: "6:30pm",
    endTime: "8:00pm",
    totalPrice: "$160",
    date: "2025/10/8"
  },
  {
    id: 30,
    name: "Alexander Phillips",
    space: "Meeting Pod 3",
    status: "done",
    startTime: "8:00pm",
    endTime: "9:30pm",
    totalPrice: "$195",
    date: "2025/10/9"
  },
]

const RenderDates = () => {
    const {date} = useDates()
    if(!date) return null
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const Matching = tableData.filter(item => item.date === formatDate)
    const {i18n,t} = useTranslations()
    const isArabic = i18n.language === "ar"
    const isMobile = useIsMobile()
    const allSpaces = [... new Set(tableData.map(item => item.space))]
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const Data = {
      name : formData.get("name") as string,
      space : formData.get("space") as string,
      status : formData.get("status") as string,
      startTime : formData.get("startTime") as string,
      endTime : formData.get("endTime") as string,
      totalPrice : formData.get("totalPrice") as string
    }
    try {
      await axios.put(`/reservations/`, Data)
      toast.success("Reservation updated successfully")
    }
    catch(error){
      toast.error("Failed to update reservation")
    }
    console.log("function worked")
  }
  const FormatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return dateString;
  
  const year = parts[0];
  const month = parts[1].padStart(2, '0');
  const day = parts[2].padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const FormatTime = (time : string) => {
  if(!time) return "";
  const Matching = time.match(/(\d+):(\d+)(am|pm)/i);

  if(!Matching) return time;

  let [_,hours,minutes,peroid] = Matching;
  hours = hours.padStart(2,"0")
  minutes = minutes.padStart(2,"0")
  if(peroid.toLowerCase() === "pm" && hours !== "12")
    hours = (parseInt(hours) + 12).toString()
  else if(peroid.toLowerCase() === "am" && hours === "12"){
    hours = "00"
  }
  return `${hours}:${minutes}`;

}

if(Matching.length === 0){
return <div className="text-center text-muted-foreground py-8">{t("calendar.No appointments")}</div>
    }
return ( 
    <>
    <div className="bg-card p-6 rounded-2xl">
        <h2 className="text-3xl font-bold bg-brand-blue bg-clip-text text-transparent mb-1 pb-3 text-center">
            {t("calendar.On This Day")}: {date.getDate()}
        </h2>
        <h3 className="text-xl text-muted-foreground mb-6 text-center border-b border-border pb-4">
            {isArabic ? date.toLocaleDateString("ar",{month: 'long'}) : date.toLocaleDateString("en-US",{month: 'long',})}
        </h3>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-1 border-border">
                        <th className="text-left rtl:text-right pl-3 pb-3 ">{t("tabel.Name")}</th>
                        <th className="text-left rtl:text-right pl-3 pb-3">{t("tabel.Space")}</th>
                        <th className="text-left rtl:text-right pb-3">{t("tabel.Status")}</th>
                        <th className="text-left rtl:text-right pb-3">{t("tabel.StartTime")}</th>
                        <th className="text-left rtl:text-right pb-3">{t("tabel.EndTime")}</th>
                        <th className="text-left rtl:text-right pb-3">{t("tabel.TotalPrice")}</th>
                    </tr>
                </thead> 
            <tbody>
                {Matching.map((item) => (
                    <Drawer key={item.id} direction={isMobile ? "bottom" : "right"}>
                      <DrawerTrigger asChild>
                    <tr className=" border-b mt-2 border-border hover:bg-accent hover:cursor-pointer p-4 rounded-2xl mb-2">
                        <td className="py-3 px-3">{item.name}</td>
                        <td className="py-3 px-3">{item.space}</td>
                        <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'reserved' ? 'bg-secondary text-secondary-foreground' :
                            item.status === 'pending' ? 'bg-accent text-accent-foreground' :
                            item.status === 'rejected' ? 'bg-destructive text-white' :
                            item.status === 'cancelled' ? 'bg-destructive text-white' :
                            'bg-primary text-primary-foreground'
                        }`}>
                            {item.status}
                        </span>
                        </td>
                        <td className="py-3">{item.startTime}</td>
                        <td className="py-3">{item.endTime}</td>
                        <td className="py-3 font-semibold">{item.totalPrice}</td>
                    </tr>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm min-h-full" dir="ltr">
                        <form onSubmit={() => handleSubmit} className="flex flex-col flex-1 gap-8 mt-6">
                          <div className={"flex flex-col gap-3"}>
                            <Label className="justify-center" htmlFor="name">{t("tabel.Name")}</Label>
                            <Input name="name" id="name" defaultValue={item.name} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                              <Label className="justify-center" htmlFor="space">{t("tabel.Space")}</Label>
                              <Select defaultValue={item.space}>
                                <SelectTrigger name="space" id="space" className="w-full">
                                  <SelectValue placeholder="Select a space" />
                                </SelectTrigger>
                                <SelectContent> 
                                  {allSpaces.map(space => (
                                  <SelectItem key={space} value={space}>
                                    {space}
                                  </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                              <Label className="justify-center" htmlFor="status">{t("tabel.Status")}</Label>
                              <Select defaultValue={item.status}>
                                <SelectTrigger name="status" id="status" className="w-full">
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="done">{t("tabel.Done")}</SelectItem>
                                  <SelectItem value="pending">{t("tabel.Pending")}</SelectItem>
                                  <SelectItem value="rejected">{t("tabel.Rejected")}</SelectItem>
                                  <SelectItem value="reserved">{t("tabel.Reserved")}</SelectItem>
                                  <SelectItem value="cancelled">{t("tabel.Cancelled")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                              <Label className="justify-center" htmlFor="startTime">{t("tabel.StartTime")}</Label>
                              <Input name="startTime" id="startTime" type="time" defaultValue={FormatTime(item.startTime)} />
                            </div>
                            <div className="flex flex-col gap-3">
                              <Label className="justify-center" htmlFor="endTime">{t("tabel.EndTime")}</Label>
                              <Input name="endTime" id="endTime" type="time" defaultValue={FormatTime(item.endTime)} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                              <Label className="justify-center" htmlFor="date">{t("tabel.Date")}</Label>
                              <Input type="date" name="date" id="date" defaultValue={FormatDate(item.date)} 
                              />
                            </div>
                          <div className="flex flex-col gap-3 pb-5">
                            <Label className="justify-center" htmlFor="totalPrice">{t("tabel.TotalPrice")}</Label>
                            <div className={`relative`}>
                              <span className="absolute start-3 top-1 transform translate-y-1">IQD</span>
                            <Input type="text" name="totalPrice" id="totalPrice" defaultValue={
                              item.totalPrice ? item.totalPrice.replace(/[,$]/g, "") : "0"}
                            className="pl-9.5 [&::-webkit-inner-spin-button]:appearance-none" 
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^\d]/g, '');
                              e.target.value = new Intl.NumberFormat().format(Number(value));
                            }}
                            />
                          </div>
                          </div>
                          <DrawerFooter className="mt-auto">
                            <Button className="bg-brand-blue hover:bg-accent hover:text-black" type="submit">{t("tabel.Submit")}</Button>
                            <DrawerClose asChild>
                              <Button variant="outline" className="dark:hover:bg-accent">{t("tabel.Done")}</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </form>
                      </div>
                      </DrawerContent>
                    </Drawer>
                    ))}
            </tbody>
          </table>
        </div>
    </div>
    </>
    )
}

export default RenderDates