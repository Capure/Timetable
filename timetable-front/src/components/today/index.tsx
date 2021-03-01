import {useContext, useState, useEffect} from 'react';
import { SettingsContext } from '../shared/SettingsProvider';
import styled from 'styled-components';
import {Footer} from '../shared/Footer';
import { Lesson } from '../shared/Lesson';
import { useQuery } from 'react-query';
import { getLessonsForToday } from '../../api';
import {CircularProgress} from '@material-ui/core';
import { getActive } from '../../utils/active';

const TodayPage = (props: any) => {
    const settings = useContext(SettingsContext);
    const {isLoading, error, data} = useQuery('today', () => getLessonsForToday(settings));
    const [active, setActive] = useState(!isLoading && data ? getActive(data) : null);
    useEffect(() => {
        setInterval(() => {
            const now = !isLoading && data ? getActive(data) : null;
            if (now !== active) {
                setActive(now);
            }
        }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    if (error) {
        return (<>There was an error while fetching data!</>)
    }
    const todayContents = (<>
        {isLoading ?
            <CircularProgress color="inherit" />
        :
            <Lessons>
                {data?.lessons.map((lesson, idx) => (<Lesson key={idx} active={active ? active === idx ? true : null : null} title={lesson.name.length < 16 ? lesson.name : lesson.short} time={lesson.time} />))}
                {data?.lessons.length === 0 ? (<Text>There are no lessons today</Text>) : ""}
            </Lessons>
        }
    </>)
    return (<>
        <Title>Timetable</Title>
        <Wrapper>
            {todayContents}
        </Wrapper>
        <Footer {...settings}></Footer>
    </>)
}

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
`;

const Wrapper = styled.div`
    min-height: calc(90vh - 230px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10vh;
`;


export default TodayPage;