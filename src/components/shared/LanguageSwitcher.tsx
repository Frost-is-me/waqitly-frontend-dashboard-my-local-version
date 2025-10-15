import { useTranslation } from "react-i18next";
import { Globe } from 'lucide-react';
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "../ui/select";
import { changeLanguage } from "i18next";


const LanguageSwitcher  = () => {
    const {i18n} = useTranslation()  

return(
        <Select value={i18n.language} onValueChange={(value) => changeLanguage(value)}>
            <SelectTrigger className="w-24 rounded-2xl hover:border-accent">
            <Globe className="w-5 h-5" />
            <SelectValue />
            </SelectTrigger>
            <SelectContent align="start" className="w-26 min-w-0">
                <SelectItem className="flex  rounded-lg " value="en">EN</SelectItem>
                <SelectItem className="flex  rounded-lg " value="ar">AR</SelectItem>
            </SelectContent> 
        </Select>
    )
}

export default LanguageSwitcher;

//This is the LanguageSwitcher component it gives you a select bar to change from a Language to another