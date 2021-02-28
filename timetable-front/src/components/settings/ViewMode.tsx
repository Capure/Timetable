import {useContext} from 'react';
import styled from 'styled-components';
import { SettingsContext, Settings } from '../shared/SettingsProvider';

export const ViewMode = (props: any) => {
    const settings = useContext(SettingsContext);
    const allowed = {
        "today": 0,
        "week": 1,
        "boomerweek": 2
    }
    const getNextNumber = (current: number) => current < 2 ? current + 1 : 0;
    const updateViewMode = () => {
        const current: number = allowed[settings.preferredView];
        const next: number = getNextNumber(current);
        const newViewMode = Object.keys(allowed).find(key => (allowed as any)[key] === next);
        settings.updateSettings({ preferredView: newViewMode })
    }
    return (<>
        <Wrapper onClick={updateViewMode} {...settings}>
            <Title>Pick the view mode</Title>
            <Current>{settings.preferredView}</Current>
        </Wrapper>
    </>)
}

const Title = styled.div`
    text-align: center;
    width: 100%;
    font-size: 22px;
    padding-top: 12px;
`;

const Current = styled.div`
    text-align: center;
    width: 100%;
    font-size: 40px;
    font-weight: 700;
    padding-top: 30px;
`;

const Wrapper = styled.div<Settings>`
    margin: 10px;
    width: 400px;
    height: 200px;
    background-color: ${props => props.secondaryColor};
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    transition: 0.6s;
    &:hover {
        background-color: ${props => props.secondaryColor}99;
    }
    @media (max-width: 840px) {
        width: 100%;
    }
`;