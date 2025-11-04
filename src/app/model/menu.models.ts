export interface MenuMeta {
  title: string;
  currency: string;
  version: number;
  generated_at: string;
}

export interface MenuItem {
  name: string;
  price: string;
  weight: string;
}

export interface MenuGroup {
  name: string;
  items: MenuItem[];
}

export interface WeddingMenu {
  meta: MenuMeta;
  groups: MenuGroup[];
}

