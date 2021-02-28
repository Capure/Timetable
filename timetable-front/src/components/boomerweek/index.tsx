import {useContext} from 'react';
import styled from 'styled-components';
import { SettingsContext } from '../shared/SettingsProvider';
import { Footer } from '../shared/Footer';
import { useQuery } from 'react-query';
import { getLessonsForTheWeek } from '../../api';
import { CircularProgress } from '@material-ui/core';
import { Settings } from '../shared/SettingsProvider';
import { LessonDTO } from '../../api/Models/lesson';
import { getCurrentDay } from '../../utils/currentDay';
import { getActiveForWeek } from '../../utils/active';

const BoomerWeek = (props: any) => {
    const settings = useContext(SettingsContext);
    const {isLoading, error, data} = useQuery('week', () => getLessonsForTheWeek(settings));
    if (error) {
        return (<>There was an error while fetching data!</>)
    }
    const active: null | number = !isLoading && data ? getActiveForWeek(data, getCurrentDay()) : null;
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const boomerWeekContents = (<>
    {
        isLoading ?
        <CircularProgress color="inherit"/>
        :
        <>
        {days.map((item, idx) => (<Column key={idx}>
            <ColumnTitle {...settings}>
                {item}
            </ColumnTitle>
            {(data?.lessons as any)[item].map((lesson: LessonDTO, idx: number) => (<Lesson active={active && item === getCurrentDay() ? active === idx ? true : null : null} key={idx} {...settings}>
                <P>{lesson.short}</P>
                <P>{lesson.time}</P>
            </Lesson>))}
        </Column>))}
        </>
    }
    </>);
    return (<>
        <Title>Timetable</Title>
        <Wrapper>
            {boomerWeekContents}
        </Wrapper>
        <Footer/>
    </>)
}

export default BoomerWeek;

const P = styled.p`
    padding: 20px;
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

const Lesson = styled.div<Settings & {active: null | boolean}>`
    width: calc(100% - 20px);
    height: 70px;
    margin: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: ${props => props.active ? props.accentColor : props.secondaryColor};
    font-size: 22px;
    text-transform: capitalize;
    user-select: none;
    @media (max-width: 450px) {
        width: 100%;
        margin-left: 0px;
        margin-right: 0px;
        border-radius: 0px;
    }
`;

const ColumnTitle = styled.div<Settings>`
    width: calc(100% - 20px);
    height: 50px;
    margin-left: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${props => props.secondaryColor};
    font-size: 22px;
    text-transform: capitalize;
    @media (max-width: 450px) {
        width: 100%;
        margin-left: 0px;
        border-radius: 0px;
    }
`;

const Column = styled.div`
    height: 100%;
    width: 20vw;
    min-width: 350px;
    margin-bottom: 20px;
    @media (max-width: 450px) {
        width: 100%;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh - 230px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;