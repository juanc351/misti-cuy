export type TrendDirection = "positive" | "negative" | "neutral";

export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: TrendDirection;
  trendLabel?: string;
}

export interface DashboardAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
}

export interface DashboardSummaryItem {
  id: string;
  label: string;
  value: React.ReactNode;
}

export interface DashboardOverviewCard {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export interface DashboardData {
  stats: DashboardStat[];
  quickActions: DashboardAction[];
  recentActivities: DashboardActivity[];
  summary: DashboardSummaryItem[];
  overviewCards: DashboardOverviewCard[];
}
