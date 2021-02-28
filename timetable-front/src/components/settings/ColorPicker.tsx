import {useContext} from 'react';
import styled from 'styled-components';
import { SettingsContext, Settings, defaultSettings } from '../shared/SettingsProvider';

export const ColorPicker = (props: any) => {
    const settings = useContext(SettingsContext);
    return (<>
        <Wrapper {...settings}>
            <Title>Choose your theme</Title>
            <Labels>
                <Label>Main</Label>
                <Label>Sec</Label>
                <Label>Accent</Label>
                <Label>Font</Label>
            </Labels>
            <Pickers>
                <Picker {...settings} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {settings.updateSettings({mainColor: e.target.value})}} value={settings.mainColor} type='color' ></Picker>
                <Picker {...settings} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {settings.updateSettings({secondaryColor: e.target.value})}} value={settings.secondaryColor} type='color' ></Picker>
                <Picker {...settings} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {settings.updateSettings({accentColor: e.target.value})}} value={settings.accentColor} type='color' ></Picker>
                <Picker {...settings} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {settings.updateSettings({fontColor: e.target.value})}} value={settings.fontColor} type='color' ></Picker>
            </Pickers>
            <Default onClick={() => { settings.updateSettings(defaultSettings) }} {...settings} >Restore defaults</Default>
        </Wrapper>
    </>)
}

const Wrapper = styled.div<Settings>`
    height: 200px;
    width: 400px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.secondaryColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 840px) {
        width: 100%;
    }
`;

const Default = styled.button<Settings>`
    background-color: ${props => props.accentColor};
    outline: none;
    border-radius: 5000px;
    color: ${props => props.fontColor};
    border: none;
    line-height: 30px;
    margin-top: 12px;
    margin-bottom: 10px;
    width: 200px;
    font-size: 16px;
    transition: 0.4s ease;
    &:hover {
        background-color: ${props => props.accentColor}cc;
    }
`;

const Title = styled.div`
    text-align: center;
    width: 100%;
    font-size: 22px;
    padding-top: 5px;
`;

const Label = styled.div`
    width: 50px;
    line-height: 50px;
    text-align: center;
`;

const Labels = styled.div`
    height: 50px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Picker = styled.input<Settings>`
    height: 50px;
    width: 50px;
    padding: 0px;
    background-color: transparent;
    outline: none;
    border: none;
    border-radius: 0px;
    box-sizing: border-box;
`;

const Pickers = styled.div`
    height: 50px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;