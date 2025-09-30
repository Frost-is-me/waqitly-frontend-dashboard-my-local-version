import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "../ui/select";
import useTranslations from "../../hooks/useTranslations";
import { useState } from "react";
const DropMenu = () => {

    const {t} = useTranslations()
    const [timeRange, setTimeRange] = useState("90d")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    return(
        <div className="bg-gray-100 sm:ms-auto sm:flex rounded-lg me-3 rtl:me-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
                className=" bg-gray-100 w-[160px] rounded-lg"
                aria-label="Select a value"
            >
                <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                {t("dashboard.Last 3 months")}
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                {t("dashboard.Last 30 days")}
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                {t("dashboard.Last 7 days")}
                </SelectItem>
            </SelectContent>
            </Select>
        </div>
    )
}

export default DropMenu;