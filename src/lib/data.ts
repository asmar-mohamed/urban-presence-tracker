
export interface Bus {
  id: string;
  number: string;
  driver: string;
  route: string;
  status: 'active' | 'maintenance' | 'outOfService';
  capacity: number;
  currentPassengers: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface BusRoute {
  id: string;
  name: string;
  stops: BusStop[];
  color: string;
}

export interface BusStop {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'driver' | 'passenger';
  cardId?: string;
  balance?: number;
  photo?: string;
}

export interface TravelHistory {
  id: string;
  userId: string;
  busId: string;
  routeId: string;
  startStopId: string;
  endStopId?: string;
  startTime: Date;
  endTime?: Date;
  fare: number;
}

// Sample data
export const buses: Bus[] = [
  {
    id: '1',
    number: 'BUS-001',
    driver: 'Jean Martin',
    route: '1',
    status: 'active',
    capacity: 50,
    currentPassengers: 32,
    location: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: '2',
    number: 'BUS-002',
    driver: 'Marie Durand',
    route: '2',
    status: 'active',
    capacity: 45,
    currentPassengers: 18,
    location: { lat: 48.8606, lng: 2.3376 }
  },
  {
    id: '3',
    number: 'BUS-003',
    driver: 'Pierre Leclerc',
    route: '1',
    status: 'maintenance',
    capacity: 50,
    currentPassengers: 0,
    location: { lat: 48.8494, lng: 2.3725 }
  },
  {
    id: '4',
    number: 'BUS-004',
    driver: 'Sophie Lambert',
    route: '3',
    status: 'active',
    capacity: 40,
    currentPassengers: 27,
    location: { lat: 48.8738, lng: 2.295 }
  },
  {
    id: '5',
    number: 'BUS-005',
    driver: 'Thomas Bernard',
    route: '2',
    status: 'active',
    capacity: 45,
    currentPassengers: 41,
    location: { lat: 48.8651, lng: 2.3768 }
  }
];

export const routes: BusRoute[] = [
  {
    id: '1',
    name: 'Ligne 1: Centre-Ville - Gare',
    color: '#1A73E8',
    stops: [
      { id: '101', name: 'Centre-Ville', location: { lat: 48.8566, lng: 2.3522 } },
      { id: '102', name: 'Opéra', location: { lat: 48.8713, lng: 2.3326 } },
      { id: '103', name: 'Saint-Lazare', location: { lat: 48.8768, lng: 2.3252 } },
      { id: '104', name: 'Gare du Nord', location: { lat: 48.8809, lng: 2.3553 } }
    ]
  },
  {
    id: '2',
    name: 'Ligne 2: Université - Hôpital',
    color: '#34A853',
    stops: [
      { id: '201', name: 'Université', location: { lat: 48.8464, lng: 2.3591 } },
      { id: '202', name: 'Bibliothèque', location: { lat: 48.8341, lng: 2.3755 } },
      { id: '203', name: 'Place d\'Italie', location: { lat: 48.8312, lng: 2.3551 } },
      { id: '204', name: 'Hôpital', location: { lat: 48.8399, lng: 2.3414 } }
    ]
  },
  {
    id: '3',
    name: 'Ligne 3: Parc - Centre Commercial',
    color: '#FBBC05',
    stops: [
      { id: '301', name: 'Parc Central', location: { lat: 48.8737, lng: 2.2950 } },
      { id: '302', name: 'Stade', location: { lat: 48.8417, lng: 2.2533 } },
      { id: '303', name: 'Centre Commercial', location: { lat: 48.8911, lng: 2.2363 } },
      { id: '304', name: 'Terminus Nord', location: { lat: 48.9060, lng: 2.2813 } }
    ]
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin Principal',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Jean Martin',
    role: 'driver',
  },
  {
    id: '3',
    name: 'Marie Durand',
    role: 'driver',
  },
  {
    id: '4',
    name: 'Lucas Dupont',
    role: 'passenger',
    cardId: 'CARD-1001',
    balance: 24.50,
    photo: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '5',
    name: 'Camille Moreau',
    role: 'passenger',
    cardId: 'CARD-1002',
    balance: 16.75,
    photo: 'https://i.pravatar.cc/150?img=5'
  }
];

export const travelHistory: TravelHistory[] = [
  {
    id: '1',
    userId: '4',
    busId: '1',
    routeId: '1',
    startStopId: '101',
    endStopId: '103',
    startTime: new Date(2023, 7, 15, 9, 30),
    endTime: new Date(2023, 7, 15, 10, 5),
    fare: 1.90
  },
  {
    id: '2',
    userId: '4',
    busId: '2',
    routeId: '2',
    startStopId: '201',
    endStopId: '204',
    startTime: new Date(2023, 7, 16, 14, 15),
    endTime: new Date(2023, 7, 16, 14, 45),
    fare: 1.90
  },
  {
    id: '3',
    userId: '5',
    busId: '5',
    routeId: '2',
    startStopId: '203',
    endStopId: '201',
    startTime: new Date(2023, 7, 15, 17, 45),
    endTime: new Date(2023, 7, 15, 18, 10),
    fare: 1.90
  },
  {
    id: '4',
    userId: '5',
    busId: '4',
    routeId: '3',
    startStopId: '302',
    endStopId: '304',
    startTime: new Date(2023, 7, 17, 11, 20),
    endTime: new Date(2023, 7, 17, 11, 50),
    fare: 1.90
  },
  {
    id: '5',
    userId: '4',
    busId: '1',
    routeId: '1',
    startStopId: '102',
    startTime: new Date(2023, 7, 17, 16, 30),
    fare: 1.90
  }
];

// Helper function to get a user by role
export function getUserByRole(role: User['role']): User | undefined {
  return users.find(user => user.role === role);
}

// Helper to format currency (Euro)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Helper to format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
