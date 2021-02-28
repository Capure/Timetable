import {useContext} from 'react';
import styled from 'styled-components';
import { Settings, SettingsContext } from '../shared/SettingsProvider';

export const Option = (props: any) => {
    const settings = useContext(SettingsContext);
    const getCurrent = () => {
        return Object.keys(props.options).filter(item => props.options[item] === (settings as any)[props.sets])[0];
    }
    const getNextKey = () => {
        const keys = Object.keys(props.options);
        const curr = keys.indexOf(getCurrent());
        if (curr === keys.length - 1) {
            return keys[0];
        } else {
            return keys[curr + 1];
        }
    }
    const selectNext = () => {
        const newSettings = {};
        (newSettings as any)[props.sets] = props.options[getNextKey()];
        settings.updateSettings(newSettings);
    }
    return (<>
        <Wrapper onClick={selectNext} {...settings}>
            <Title>{props.title}</Title>
            {getCurrent()}
        </Wrapper>
    </>)
}

const Title = styled.div`
    padding: 15px;
    font-size: 22px;
    font-weight: 700;
`;

const Wrapper = styled.div<Settings>`
    height: 70px;
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.secondaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: 0.4s;
    &:hover {
        background-color: ${props => props.secondaryColor}99;
    }
`;