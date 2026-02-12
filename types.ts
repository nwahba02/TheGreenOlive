
export type MenuType = 'Brunch' | 'Lunch/Dinner' | 'Drinks' | 'Catering';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  menuType: MenuType;
  section: string;
  popular?: boolean;
  image?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export type Page = 'home' | 'menu' | 'gallery' | 'events' | 'contact' | 'about' | 'privacy' | 'terms' | 'accessibility';
