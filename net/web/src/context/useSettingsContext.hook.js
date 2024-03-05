import { useEffect, useState } from 'react';
import { LightTheme, DarkTheme } from 'constants/Colors';
import { en, fr } from 'constants/Strings';

export function useSettingsContext() {

  const [state, setState] = useState({ 
    display: null,
    width: null,
    height: null,
    themes: [{ value: null, label: 'Default' }, { value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }],
    theme: null,
    scheme: null,
    colors: {},
    menuStyle: {},
    languages: [{ value: null, label: 'Default' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }],
    language: null,
    strings: en,
    dateFormat: 'mm/dd',
    timeFormat: '12h',
    audioInput: null,
    audioInputs: [],
    videoInput: null,
    videoInputs: [],
  });

  const SMALL_MEDIUM = 650;
  const MEDIUM_LARGE = 1000;
  const LARGE_XLARGE = 1600;

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  };

  const handleResize = () => {
    if (window.innerWidth < SMALL_MEDIUM) {
      updateState({ display: 'small', width: window.innerWidth, height: window.innerHeight });
    }
    else if (window.innerWidth < MEDIUM_LARGE) {
      updateState({ display: 'medium', width: window.innerWidth, height: window.innerHeight });
    }
    else if (window.innerWidth < LARGE_XLARGE) {
      updateState({ display: 'large', width: window.innerWidth, height: window.innerHeight });
    }
    else {
      updateState({ display: 'xlarge', width: window.innerWidth, height: window.innerHeight });
    }
  };

  const getDevices = async (type) => {
    const filtered = new Map();
    const devices = await navigator.mediaDevices.enumerateDevices();

    devices.filter(item => item.kind === type + 'input').forEach(item => {
      if (item) {
        const label = item.label ? item.label : state.strings.integrated;
        const entry = filtered.get(item.groupId);
        if (entry) {
          if (item.label && label.length < entry.label.length) {
            filtered.set(item.groupId, { value: item.deviceId, label });
          }
        }
        else {
          filtered.set(item.groupId, { value: item.deviceId, label });
        }
      }
    });
    return Array.from(filtered.values());
  }

  useEffect(() => {
    getDevices('audio').then(audio => {
      updateState({ audioInputs: audio });
    });
    getDevices('video').then(video => {
      updateState({ videoInputs: video });
    });
  }, [state.strings]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setTimeout(handleResize, 100 * i); //cludge for my mobile browser
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const scheme = localStorage.getItem('color_scheme');
    if (scheme === 'dark') {
      updateState({ theme: scheme, scheme: 'dark', colors: DarkTheme, menuStyle: { backgroundColor: DarkTheme.modalArea, color: DarkTheme.mainText } });
    }
    else if (scheme === 'light') {
      updateState({ theme: scheme, scheme: 'light', colors: LightTheme, menuStyle: { backgroundColor: LightTheme.modalArea, color: LightTheme.mainText } })
    }
    else {
      if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateState({ theme: null, scheme: 'dark', colors: DarkTheme, menuStyle: { backgroundColor: DarkTheme.modalArea, color: DarkTheme.mainText } });
      }
      else {
        updateState({ theme: null, scheme: 'light', colors: LightTheme, menuStyle: { backgroundColor: LightTheme.modalArea, color: LightTheme.mainText } });
      }
    }

    const timeFormat = localStorage.getItem('time_format');
    if (timeFormat === '24h') {
      updateState({ timeFormat });
    }
    else {
      updateState({ timeFormat: '12h' });
    }

    const dateFormat = localStorage.getItem('date_format');
    if (dateFormat === 'dd/mm') {
      updateState({ dateFormat });
    }
    else {
      updateState({ dateFormat: 'mm/dd' });
    }

    const language = localStorage.getItem('language');
    if (language && language.startsWith('fr')) {
      updateState({ language: 'fr', strings: fr, themes: [{ value: null, label: fr.default }, { value: 'dark', label: fr.dark }, { value: 'light', label: fr.light }]});
    }
    else if (language && language.startsWith('en')) {
      updateState({ language: 'en', strings: en, themes: [{ value: null, label: en.default }, { value: 'dark', label: en.dark }, { value: 'light', label: en.light }]});
    }
    else {
      const browser = navigator.language;
      if (browser && browser.startsWith('fr')) {
        updateState({ language: null, strings: fr });
      }
      else {
        updateState({ language: null, strings: en });
      }
    }

    const audioInput = localStorage.getItem('audio_input');
    const videoInput = localStorage.getItem('video_input');
    updateState({ audioInput, videoInput });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    }
    // eslint-disable-next-line
  }, []);

  const actions = {
    setTheme: (theme) => {
      if (theme === 'dark') {
        localStorage.setItem('color_scheme', 'dark');
        updateState({ theme: 'dark', scheme: 'dark', colors: DarkTheme, menuStyle: { backgroundColor: DarkTheme.modalArea, color: DarkTheme.mainText } });
      }
      else if (theme === 'light') {
        localStorage.setItem('color_scheme', 'light');
        updateState({ theme: 'light', scheme: 'light', colors: LightTheme, menuStyle: { backgroundColor: LightTheme.modalArea, color: LightTheme.mainText } });
      }
      else {
        localStorage.removeItem('color_scheme');
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          updateState({ theme: null, scheme: 'dark', colors: DarkTheme, menuStyle: { backgroundColor: DarkTheme.modalArea, color: DarkTheme.mainText } });
        }
        else {
          updateState({ theme: null, scheme: 'ligth', colors: LightTheme, menuStyle: { backgroundColor: LightTheme.modalArea, color: LightTheme.mainText } });
        }
      }
    },
    setLanguage: (code: string) => {
      if (code && code.startsWith('fr')) {
        localStorage.setItem('language', 'fr');
        updateState({ language: 'fr', strings: fr, themes: [{ value: null, label: fr.default }, { value: 'dark', label: fr.dark }, { value: 'light', label: fr.light }]});
      }
      else if (code && code.startsWith('en')) {
        localStorage.setItem('language', 'en');
        updateState({ language: 'en', strings: en, themes: [{ value: null, label: fr.default }, { value: 'dark', label: en.dark }, { value: 'light', label: en.light }]});
      }
      else {
        localStorage.removeItem('language');
        const browser = navigator.language;
        if (browser && browser.startsWith('fr')) {
          updateState({ language: null, strings: fr, themes: [{ value: null, label: fr.default }, { value: 'dark', label: fr.dark }, { value: 'light', label: fr.light }]});
        }
        else {
          updateState({ language: null, strings: en, themes: [{ value: null, label: en.default }, { value: 'dark', label: en.dark }, { value: 'light', label: en.light }]});
        }
      }
    },
    setDateFormat: (dateFormat) => {
      localStorage.setItem('date_format', dateFormat);
      updateState({ dateFormat });
    },
    setTimeFormat: (timeFormat) => {
      localStorage.setItem('time_format', timeFormat);
      updateState({ timeFormat });
    },
    setAudioInput: (audioInput) => {
      localStorage.setItem('audio_input', audioInput);
      updateState({ audioInput });
    },
    setVideoInput: (videoInput) => {
      localStorage.setItem('video_input', videoInput);
      updateState({ videoInput });
    },
  }

  return { state, actions }
}


