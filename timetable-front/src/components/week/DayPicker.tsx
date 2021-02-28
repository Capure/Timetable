import {useContext, useState} from 'react';
import styled from 'styled-components';
import { SettingsContext, Settings} from '../shared/SettingsProvider';
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export const DayPicker = (props: any) => {
    const settings = useContext(SettingsContext);
    const [initial] = useState(props.name);
    const getNextDay = () => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currIdx = days.indexOf(props.name);
        return days[currIdx < 6 ? currIdx + 1 : 0];
    }
    const getPrevDay = () => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currIdx = days.indexOf(props.name);
        return days[currIdx > 0 ? currIdx - 1 : 6];
    }
    return (<>
        <Wrapper {...settings}>
            <Button onClick={() => props.onChange(getPrevDay())} {...settings}><VscChevronLeft style={{fontSize: "35px"}}/></Button>
            <Button onClick={() => props.onChange(initial)} {...settings}>{props.name}</Button>
            <Button onClick={() => props.onChange(getNextDay())} {...settings}><VscChevronRight style={{fontSize: "35px"}}/></Button>
        </Wrapper>
    </>)
}

const Button = styled.button<Settings>`
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color: ${props => props.fontColor};
    font-size: inherit;
    text-transform: capitalize;
`;

const Wrapper = styled.div<Settings>`
    height: 50px;
    width: 250px;
    font-size: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;