import {useContext, useState, useEffect} from 'react';
import { SettingsContext } from '../shared/SettingsProvider';
import styled from 'styled-components';
import {Footer} from '../shared/Footer';
import { Lesson } from '../shared/Lesson';
import {CircularProgress} from '@material-ui/core';
import { useQuery } from 'react-query';
import { getLessonsForTheWeek } from '../../api';
import { getCurrentDay } from '../../utils/currentDay';
import { getActiveForWeek } from '../../utils/active';
import { LessonDTO } from '../../api/Models/lesson';
import { DayPicker } from './DayPicker';


const WeekPage = (props: any) => {
    const settings = useContext(SettingsContext);
    const {isLoading, error, data} = useQuery('week', () => getLessonsForTheWeek(settings));
    const [currentDay, setCurrentDay] = useState(getCurrentDay());
    const [active, setActive] = useState(!isLoading && data && currentDay === getCurrentDay() ? {idx: getActiveForWeek(data, currentDay), day: getCurrentDay()} : null);
    useEffect(() => {
        const refreshActive = () => {
            const now = !isLoading && data && currentDay === getCurrentDay() ? getActiveForWeek(data, currentDay) : null;
            if (now !== active) {
                setActive({idx: now, day: getCurrentDay()});
            }
        }
        refreshActive();
        setInterval(() => {
            refreshActive();
        }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    if (error) {
        return (<>There was an error while fetching data!</>)
    }
    const currentDayContents = (<>
        {isLoading ?
            <CircularProgress color="inherit" />
        :
            <Lessons>
                {(data?.lessons as any)[currentDay].map((lesson: LessonDTO, idx: number) => (<Lesson key={idx} active={active ? active.idx === idx && active.day === currentDay ? true : null : null} title={lesson.name.length < 16 ? lesson.name : lesson.short} time={lesson.time} />))}
                {(data?.lessons as any)[currentDay].length === 0 ? (<Text>There are no lessons on {currentDay}.</Text>) : ""}
            </Lessons>
        }
    </>)
    return (<>
        <Title>Timetable</Title>
        <DayPickerWrapper>
        <DayPicker onChange={(newDay: string) => setCurrentDay(newDay)} name={currentDay}/>
        </DayPickerWrapper>
        <Wrapper>
            {currentDayContents}
        </Wrapper>
        <Footer {...settings}></Footer>
    </>)
}

const DayPickerWrapper = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 500px) {
        height: 10vh;
    }
`;

const Text = styled.div`
    font-size: 22px;
    text-align: center;
`;

const Title = styled.div`
    width: 100%;
    height: 150px;
    text-align: center;
    font-size: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
`;

const Lessons = styled.div`
    max-width: min(80%, 1400px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;

const Wrapper = styled.div`
    min-height: calc(80vh - 230px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 500px) {
        min-height: calc(90vh - 230px);
    }
`;


export default WeekPage;