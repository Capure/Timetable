import { VulcanHebe } from "vulcan-api-js";
import { Lesson } from "vulcan-api-js/lib/interfaces/lesson";
import { LessonDTO } from "../models/lesson";
import {WeekDTO} from '../models/week';

export class LessonService {
    private client;
    constructor(vulcan: VulcanHebe) {
        this.client = vulcan;
    }

    private bindHoursToELearning(start: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ELEARNING_HOURS: any = {
          "07:30": "8:00 - 8:45",
          "08:25": "8:50 - 9:35",
          "09:20": "9:40 - 10:25",
          "10:15": "10:30 - 11:15",
          "11:15": "11:20 - 12:05",
          "12:10": "12:15 - 13:00",
          "13:05": "13:05 - 13:50",
          "14:00": "13:55 - 14:40"
        }
        return ELEARNING_HOURS[start];
    }

    private getWeek() {
        const now = new Date();
        const startDay = 1; // 0=sunday, 1=monday etc.
        const d = now.getDay(); //get the current day
        const weekStart = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to the start day
        const fullWeek = [weekStart];
        for (let i = 1; i < 7; i++) {
            fullWeek.push(new Date(weekStart.valueOf() + i*86400000));
        }
        return fullWeek; // an array of dates
    }

    private async filterLessons(lessons: Lesson[], { angInf, wf, lang }: { angInf: string, wf: string, lang: string }) {
        return lessons.filter(lesson => {
            return (lesson.distribution === undefined ||
                lesson.distribution.shortcut === wf ||
                lesson.distribution.shortcut === lang ||
                lesson.distribution.shortcut === angInf)
        })
    }

    private sortLessons(lessons: LessonDTO[]) {
        return lessons.sort((a: LessonDTO, b: LessonDTO) => {
            if (!a.time || !b.time) { return 0 }
            const start = a.time.split(' - ')[0];
            const end = b.time.split(' - ')[1];
            const today = new Date();
            const aDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(start.split(":")[0]), parseInt(start.split(":")[1]), 0);
            const bDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(end.split(":")[0]), parseInt(end.split(":")[1]), 0);
            return (aDate.getTime() - bDate.getTime())
        })
    }

    public async getLessonsForToday({ angInf, wf, lang, filter }: { angInf: string, wf: string, lang: string, filter: boolean }): Promise<LessonDTO[]> {
        const today = new Date();
        const lessons = await this.client.getLessons(today, new Date(new Date().setDate(today.getDate() + 1)));
        const lessonsToReturn = filter ? await this.filterLessons(lessons, {angInf, wf, lang}) : lessons;
        const lessonDTOArray = lessonsToReturn.map(lesson => {
            return {
                time: lesson.timeSlot ? this.bindHoursToELearning(lesson.timeSlot?.start) : "00:00 - 00:00",
                name: lesson.subject ?  lesson.subject.name : "N/A",
                short: lesson.subject ? lesson.subject.code : "N/A",
                change: lesson.change
            }
        });
        return this.sortLessons(lessonDTOArray);
    }

    
    public async getLessonsForTheWeek({ angInf, wf, lang, filter }: { angInf: string, wf: string, lang: string, filter: boolean }): Promise<WeekDTO> {
        const week = this.getWeek();
        const lessons = await this.client.getLessons(week[0], new Date(new Date().setDate(week[week.length - 1].getDate() + 1)));
        const lessonsRaw = filter ? await this.filterLessons(lessons, {angInf, wf, lang}) : lessons;
        const lessonsByDay = lessonsRaw.sort((a: Lesson, b: Lesson) => a.date && b.date ? a.date?.timestamp - b.date?.timestamp : 0)
        .reduce<{ days: Array<Array<Lesson>>, current: number }>((accu: { days: Array<Array<Lesson>>, current: number }, item: Lesson) => {
            if (accu.current === 0 && accu.days.length === 0) {
                accu.days.push([item]);
                return accu;
            }
            const prevDate = new Date(accu['days'][accu.current][accu['days'][accu.current].length - 1].date?.date || ""); // Should throw if the date is missing
            if (!item.date) { throw Error("Missing date!") }
            if (new Date(item.date.date).getTime() === prevDate.getTime()) {
                accu.days[accu.current].push(item);
            } else {
                accu.current++;
                accu.days.push([item]);
            }
            return accu;
        }, { days: [], current: 0 });
        const lessonDTOArray = lessonsByDay.days.map(day => {
            return day.map(lesson => {
                return {
                    time: lesson.timeSlot ? this.bindHoursToELearning(lesson.timeSlot?.start) : "00:00 - 00:00",
                    name: lesson.subject ?  lesson.subject.name : "N/A",
                    short: lesson.subject ? lesson.subject.code : "N/A",
                    change: lesson.change
                }
            });
        }).map(day => {
            return this.sortLessons(day);
        });
        return {
            monday: lessonDTOArray[0],
            tuesday: lessonDTOArray[1],
            wednesday: lessonDTOArray[2],
            thursday: lessonDTOArray[3],
            friday: lessonDTOArray[4],
            saturday: [],
            sunday: []
        };
    }
}