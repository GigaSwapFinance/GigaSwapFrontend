interface Tab {
  title: string;
  id: string;
  to: string;
  icon?: string;
  description?: string;
}

export type Tabs = Tab[]