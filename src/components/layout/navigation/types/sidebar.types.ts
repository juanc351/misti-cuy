import type { ReactNode } from 'react';

export interface SidebarBadge {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: SidebarBadge;
  disabled?: boolean;
  children?: SidebarItem[];
}

export interface SidebarSection {
  id: string;
  title?: string;
  items: SidebarItem[];
}

export interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
  search: string;
  selectedItem?: string;
}

export interface SidebarActions {
  toggleCollapse(): void;
  openMobile(): void;
  closeMobile(): void;
  setSearch(value: string): void;
  selectItem(id: string): void;
}

export interface SidebarContextType {
  state: SidebarState;
  actions: SidebarActions;
}

export interface SidebarProps {
  sections: SidebarSection[];
}

export interface SidebarNavigationProps {
  sections: SidebarSection[];
}

export interface SidebarSectionProps {
  section: SidebarSection;
}

export interface SidebarItemProps {
  item: SidebarItem;
  level?: number;
}