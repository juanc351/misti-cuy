"use client";

import {
  createContext,
  useContext,
} from "react";

import { useLearn } from "./hooks/useLearn";

const LearnContext =
  createContext<ReturnType<typeof useLearn> | null>(
    null
  );

interface LearnProviderProps {
  children: React.ReactNode;
}

export function LearnProvider({
  children,
}: LearnProviderProps) {
  const learn = useLearn();

  return (
    <LearnContext.Provider value={learn}>
      {children}
    </LearnContext.Provider>
  );
}

export function useLearnContext() {
  const context =
    useContext(LearnContext);

  if (!context) {
    throw new Error(
      "useLearnContext debe utilizarse dentro de LearnProvider."
    );
  }

  return context;
}