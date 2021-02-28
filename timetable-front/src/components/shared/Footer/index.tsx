import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { SettingsContext, Settings } from '../SettingsProvider';
import styled from 'styled-components';
import {VscGear, VscHome} from 'react-icons/vsc';

export const Footer = (props: any) => {
    const settings = useContext(SettingsContext);
    const history = useHistory();
    return (<>
        <Main {...settings}>
            <small style={{lineHeight: '80px'}} >© Copyright 2021, <A {...settings} target="_blank" href="https://github.com/Capure" >Capure</A></small>
            <Button onClick={() => {
                if (props.settings) {
                    history.push('/');
                } else {
                    history.push('/settings');
                }
            }}>{props.settings ? <VscHome/> : <VscGear/> }</Button>
        </Main>
    </>)
}

const Button = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    color: inherit;
    position: absolute;
    bottom: 0px;
    right: 2vw;
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    cursor: pointer;
`;

const A = styled.a<Settings>`
    text-decoration: none;
    color: ${props => props.fontColor};
`;

const Main = styled.div<Settings>`
    width: 100%;
    height: 80px;
    background-color: ${props => props.secondaryColor};
    text-align: center;
    position: relative;
`;