import styled from 'styled-components';
import { ColorPicker } from './ColorPicker';
import { ViewMode } from './ViewMode';
import {Footer} from '../shared/Footer';
import {Option} from './Option';

const SettingsPage = (props: any) => {
    return (<>
        <Title>Settings</Title>
        <Main>
        <Wrapper>
            <ColorPicker/>
            <ViewMode/>
            <Option title="English/CS" sets="angInf" options={{ "1": "gr1", "2": "gr2" }} />
            <Option title="WF" sets="wf" options={{ "CH": "CH", "DZ": "DZ" }} />
            <Option title="Lang" sets="lang" options={{ "Niemiecki 1": "gr1n", "Niemiecki 2": "gr2n", "Niemiecki 3": "gr3n", "Rosyjski": "gr4r" }} />
        </Wrapper>
        </Main>
        <Footer settings></Footer>
    </>)
}

const Title = styled.div`
    width: 100%;
    height: 200px;
    text-align: center;
    font-size: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
`;

const Wrapper = styled.div`
    max-width: 840px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const Main = styled.div`
    min-height: calc(100vh - 280px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;


export default SettingsPage;