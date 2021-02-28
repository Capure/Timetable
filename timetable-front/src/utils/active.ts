import { LessonDTO } from "../api/Models/lesson";
import { TodayDTO } from "../api/Models/today";
import { WeekDTO } from "../api/Models/week";

export const getActive = (data: TodayDTO): number | null => {
    let activeIdx = -1;
    data.lessons.forEach((item, index) => {
      const start = item.time.split(' - ')[0];
      const end = item.time.split(' - ')[1];
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(start.split(":")[0]), parseInt(start.split(":")[1]), 0);
      const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(end.split(":")[0]), parseInt(end.split(":")[1]),0);
      if (startDate.getTime() < today.getTime() && today.getTime() < endDate.getTime()) {
        activeIdx = index;
      }
    });
    return activeIdx;
}


export const getActiveForWeek = (data: WeekDTO, current: string): number | null => {
    let activeIdx = -1;
    (data.lessons as any)[current].forEach((item: LessonDTO, index: number) => {
      const start = item.time.split(' - ')[0];
      const end = item.time.split(' - ')[1];
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(start.split(":")[0]), parseInt(start.split(":")[1]), 0);
      const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(end.split(":")[0]), parseInt(end.split(":")[1]),0);
      if (startDate.getTime() < today.getTime() && today.getTime() < endDate.getTime()) {
        activeIdx = index;
      }
    });
    return activeIdx;
}