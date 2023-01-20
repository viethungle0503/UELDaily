import LocalizedStrings from "react-native-localization";
export const strings = new LocalizedStrings({
    vn: {
        home: "Trang chủ",
        news: "Tin tức",
        notifications: "Thông báo",
        profile: "Thông tin cá nhân",
        schedule:"Thời khóa biểu",
        year:"Năm học",
    },
    en: {
        home: "home",
        news: "news",
        notifications: "notifications",
        profile: "profile",
        schedule:"schedule",
        year:"year",
    },

});
export const changeLaguage = (languageKey) => {
    strings.setLanguage(languageKey)
}