export type SpiceLevel = 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Sichuan Spicy 🌶️

export interface MenuItem {
  id: string;
  name: string;
  chineseName: string;
  category: string;
  price: number;
  description: string;
  image: string;
  spiceLevel: SpiceLevel;
  popular?: boolean;
  vegetarian?: boolean;
  chefRecommended?: boolean;
  ingredients: string[];
  cookingTime?: string;
  videoUrl?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended?: string;
  source: 'Google Maps' | 'Zomato' | 'Instagram';
  avatar: string;
}

export interface VideoReel {
  id: string;
  title: string;
  subtitle: string;
  chefName: string;
  rating: number;
  videoThumb: string;
  videoUrl: string;
  dishName: string;
  ingredients: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSpice: SpiceLevel;
  specialNotes?: string;
}

export interface ReservationDetails {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seatingPreference: 'Indoor Table' | 'Bar Counter' | 'Window View';
  specialRequests?: string;
}
