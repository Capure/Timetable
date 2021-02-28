import {createContext} from 'react';

export interface Settings {
    mainColor: string,
    secondaryColor: string,
    accentColor: string,
    fontColor: string,
    preferredView: 'today' | 'week' | 'boomerweek',
    angInf: 'gr1' | 'gr2',
    wf: 'CH' | 'DZ',
    lang: 'gr1n' | 'gr2n' | 'gr3n' | 'gr4r',
    updateSettings: Function
}

export const defaultSettings: Settings = {
    mainColor: '#18181A',
    accentColor: '#044fff',
    secondaryColor: '#27272A',
    fontColor: '#ffffff',
    preferredView: 'week',
    angInf: 'gr1',
    wf: 'CH',
    lang: 'gr4r',
    updateSettings: () => {}
}

export const SettingsContext = createContext(defaultSettings);