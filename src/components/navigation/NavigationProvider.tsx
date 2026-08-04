"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface NavigationContextValue {
  drawerOpen: boolean;

  openDrawer: () => void;

  closeDrawer: () => void;

  toggleDrawer: () => void;

  menuButtonRef: React.RefObject<HTMLDivElement | null>;

  menuButtonRect: DOMRect | null;

  updateMenuButtonRect: () => void;
}

const NavigationContext =
  createContext<NavigationContextValue | null>(null);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export function NavigationProvider({
  children,
}: NavigationProviderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [menuButtonRect, setMenuButtonRect] =
    useState<DOMRect | null>(null);

  const menuButtonRef =
    useRef<HTMLDivElement>(null);

  const updateMenuButtonRect = () => {
    if (!menuButtonRef.current) return;

    setMenuButtonRect(
      menuButtonRef.current.getBoundingClientRect(),
    );
  };

  const openDrawer = () => {
    updateMenuButtonRect();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    updateMenuButtonRect();
    setDrawerOpen((previous) => !previous);
  };

  const value = useMemo(
    () => ({
      drawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      menuButtonRef,
      menuButtonRect,
      updateMenuButtonRect,
    }),
    [drawerOpen, menuButtonRect],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigation debe utilizarse dentro de NavigationProvider.",
    );
  }

  return context;
}