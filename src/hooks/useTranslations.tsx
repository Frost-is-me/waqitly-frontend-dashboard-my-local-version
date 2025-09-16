import { useTranslation } from "react-i18next";

const useTranslations = () => {
    const {t,i18n} = useTranslation()
    return{
        t,
        i18n,
        currentLanguage: i18n.language,
        changeLanguage: i18n.changeLanguage
    }
}

export default useTranslations;

// This is the Translations Hook you call it and use it to translate anything in en.json or ar.json using the t function