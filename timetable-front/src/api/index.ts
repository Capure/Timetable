import { Settings } from "../components/shared/SettingsProvider";
import { TodayDTO } from "./Models/today";
import { WeekDTO } from "./Models/week";

export const getLessonsForToday = async (currentSettings: Settings) => {
    const rawReq = await fetch(`/api/v1/today?angInf=${currentSettings.angInf}&wf=${currentSettings.wf}&lang=${currentSettings.lang}&filter=true`);
    const data: TodayDTO = await rawReq.json();
    return data;
}


export const getLessonsForTheWeek = async (currentSettings: Settings) => {
    const rawReq = await fetch(`/api/v1/week?angInf=${currentSettings.angInf}&wf=${currentSettings.wf}&lang=${currentSettings.lang}&filter=true`);
    const data: WeekDTO = await rawReq.json();
    return data;
}