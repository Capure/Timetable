import { LessonDTO } from "./lesson";

export interface WeekDTO {
    monday: LessonDTO[],
    tuesday: LessonDTO[],
    thursday: LessonDTO[],
    wednesday: LessonDTO[],
    friday: LessonDTO[],
    saturday: LessonDTO[],
    sunday: LessonDTO[]
}