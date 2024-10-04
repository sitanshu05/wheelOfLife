// Create a darkMode atom in a separate file
import { atom } from 'recoil';

const getInitialMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    } else {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

export const darkModeAtom = atom({
  key: 'darkMode',
  default: getInitialMode(),
});