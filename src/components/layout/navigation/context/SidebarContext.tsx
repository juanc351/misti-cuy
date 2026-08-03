import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { SidebarState, SidebarActions, SidebarContextType } from '../types/sidebar.types';

type SidebarAction =
  | { type: 'TOGGLE_COLLAPSE' }
  | { type: 'OPEN_MOBILE' }
  | { type: 'CLOSE_MOBILE' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SELECT_ITEM'; payload: string };

const initialState: SidebarState = {
  collapsed: false,
  mobileOpen: false,
  search: '',
  selectedItem: undefined,
};

function sidebarReducer(state: SidebarState, action: SidebarAction): SidebarState {
  switch (action.type) {
    case 'TOGGLE_COLLAPSE':
      return { ...state, collapsed: !state.collapsed };
    case 'OPEN_MOBILE':
      return { ...state, mobileOpen: true };
    case 'CLOSE_MOBILE':
      return { ...state, mobileOpen: false };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SELECT_ITEM':
      return { ...state, selectedItem: action.payload };
    default:
      return state;
  }
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const actions: SidebarActions = {
    toggleCollapse: useCallback(() => dispatch({ type: 'TOGGLE_COLLAPSE' }), []),
    openMobile: useCallback(() => dispatch({ type: 'OPEN_MOBILE' }), []),
    closeMobile: useCallback(() => dispatch({ type: 'CLOSE_MOBILE' }), []),
    setSearch: useCallback((value: string) => dispatch({ type: 'SET_SEARCH', payload: value }), []),
    selectItem: useCallback((id: string) => dispatch({ type: 'SELECT_ITEM', payload: id }), []),
  };

  return <SidebarContext.Provider value={{ state, actions }}>{children}</SidebarContext.Provider>;
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export { SidebarContext };