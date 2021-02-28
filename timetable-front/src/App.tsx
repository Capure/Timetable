import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import SettingsPage from './components/settings';
import {SettingsContext, Settings, defaultSettings} from './components/shared/SettingsProvider';
import {createGlobalStyle} from 'styled-components';
import WeekPage from './components/week';
import TodayPage from './components/today';
import BoomerWeek from './components/boomerweek';

const Background = createGlobalStyle<Settings>`
  body {
    background-color: ${props => props.mainColor};
    color: ${props => props.fontColor};
  }
`;

const queryClient = new QueryClient();

function App() {
  const storedSettingsRaw = localStorage.getItem('settings');
  const [settings, setSettings] = useState<Settings>(storedSettingsRaw ? JSON.parse(storedSettingsRaw) : defaultSettings)
  const updateSettings = (newSettings: Partial<Settings>) => {
    localStorage.setItem('settings', JSON.stringify({...settings, ...newSettings}));
    setSettings({...settings, ...newSettings});
  }
  return (
    <Router>
      <Switch>
        <QueryClientProvider client={queryClient}>
        <SettingsContext.Provider value={{...settings, updateSettings}}>
        <Background {...settings} />
        <Route exact path="/">
          <Redirect to={`/${settings.preferredView}`} />
        </Route>
        <Route exact path="/today" children={<TodayPage/>}/>
        <Route exact path="/week" children={<WeekPage/>}/>
        <Route exact path="/boomerweek" children={<BoomerWeek/>}/>
        <Route exact path="/settings" children={<SettingsPage/>}/>
      </SettingsContext.Provider>
      </QueryClientProvider>
      </Switch>
    </Router>
  );
}

export default App;
