import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ONG } from '../types/ong.types';
import { listaDeONGs as mockOngs } from '../data/ongs.data';

interface ONGsContextData {
  ongs: ONG[];
  realizarDoacao: (id: number, valor: number) => void;
}

interface ONGsProviderProps {
  children: ReactNode;
}

const ONGS_STORAGE_KEY = 'ongsData';

export const ONGsContext = createContext<ONGsContextData>({} as ONGsContextData);

export function ONGsProvider({ children }: ONGsProviderProps) {
  const [ongs, setOngs] = useState<ONG[]>([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem(ONGS_STORAGE_KEY);
    if (dadosSalvos) {
      setOngs(JSON.parse(dadosSalvos));
    } else {
      localStorage.setItem(ONGS_STORAGE_KEY, JSON.stringify(mockOngs));
      setOngs(mockOngs);
    }
  }, []);

  const realizarDoacao = (id: number, valor: number) => {
    const ongsAtualizadas = ongs.map(ong => {
      if (ong.id === id) {
        return { ...ong, valorArrecadado: ong.valorArrecadado + valor };
      }
      return ong;
    });

    setOngs(ongsAtualizadas);
    localStorage.setItem(ONGS_STORAGE_KEY, JSON.stringify(ongsAtualizadas));
  };

  return (
    <ONGsContext.Provider value={{ ongs, realizarDoacao }}>
      {children}
    </ONGsContext.Provider>
  );
}

export function useONGs() {
  const context = useContext(ONGsContext);
  return context;
}