import { listaDeONGs } from './data/ong.data.ts';

const ongsLocalStorageKey = 'ongsData';
const ongsExistentes = localStorage.getItem(ongsLocalStorageKey);

if (!ongsExistentes) {
  localStorage.setItem(ongsLocalStorageKey, JSON.stringify(listaDeONGs));
}