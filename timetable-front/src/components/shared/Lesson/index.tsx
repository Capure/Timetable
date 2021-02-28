import {useContext} from 'react';
import styled from 'styled-components';
import { SettingsContext, Settings } from '../SettingsProvider';

export const Lesson = (props: any) => {
    const settings = useContext(SettingsContext);
    const lessonContent = (<>
        <TextHolder>
            <Title>{props.title}</Title>
            <Time>{props.time}</Time>
        </TextHolder>
    </>)
    return (<>
        {props.active ?
        <WrapperActive {...settings}>
            {lessonContent}
        </WrapperActive>
        :
        <Wrapper {...settings}>
            {lessonContent}
        </Wrapper>
        }
    </>)
}

const TextHolder = styled.div`
    width: calc(100% - 40px);
    margin-left: 20px;
    height: calc(100% - 40px);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
`;

const Time = styled.div`
    font-size: 18px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Wrapper = styled.div<Settings>`
    height: 140px;
    width: 320px;
    margin: 10px;
    background-color: ${props => props.secondaryColor};
    border-radius: 10px;
    user-select: none;
`;

const WrapperActive = styled.div<Settings>`
    height: 140px;
    width: 320px;
    margin: 10px;
    background-color: ${props => props.accentColor};
    border-radius: 10px;
    user-select: none;
`;