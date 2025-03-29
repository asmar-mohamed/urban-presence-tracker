
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import BusRouteCard from '@/components/BusRouteCard';
import Map from '@/components/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { users, travelHistory, formatDate, formatCurrency, buses, routes } from '@/lib/data';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  CreditCard, 
  Clock, 
  Calendar,
  Bus,
  ChevronRight,
  MapPin,
  HistoryIcon,
  ArrowRight
} from 'lucide-react';

const UserProfile = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(undefined);
  const passenger = users.find(user => user.role === 'passenger');
  
  // Get travel history for this user
  const userHistory = passenger 
    ? travelHistory.filter(trip => trip.userId === passenger.id)
    : [];
  
  // Sort by date (most recent first)
  const sortedHistory = [...userHistory].sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  
  // Get today's date for UI
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="passenger" userName={passenger?.name} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Mon Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                    <img 
                      src={passenger?.photo || 'https://i.pravatar.cc/150?img=7'} 
                      alt={passenger?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold mb-1">{passenger?.name}</h2>
                  <p className="text-gray-500 text-sm mb-3">Carte #{passenger?.cardId}</p>
                  
                  <div className="w-full bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Solde disponible</p>
                      <p className="text-2xl font-bold">
                        {passenger?.balance ? formatCurrency(passenger.balance) : '0,00 €'}
                      </p>
                    </div>
                    <Link to="/payment">
                      <Button className="bg-transit-blue hover:bg-blue-600">
                        Recharger
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="w-full">
                    <div className="bg-gray-100 rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <QrCode className="w-5 h-5 text-transit-blue mr-2" />
                          <span className="font-medium">Mon QR Code</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 text-transit-green mr-2" />
                          <span className="font-medium">Modes de paiement</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <HistoryIcon className="w-5 h-5 text-transit-yellow mr-2" />
                          <span className="font-medium">Historique complet</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {capitalizeFirstLetter(formattedDate)}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline-block mr-1" />
                    <span>Aujourd'hui</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Trip Section */}
                {sortedHistory.some(trip => !trip.endTime) ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-transit-blue flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <Bus size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg mb-1">Voyage en cours</div>
                        
                        {(() => {
                          const currentTrip = sortedHistory.find(trip => !trip.endTime);
                          if (!currentTrip) return null;
                          
                          const route = routes.find(r => r.id === currentTrip.routeId);
                          const bus = buses.find(b => b.id === currentTrip.busId);
                          const startStop = route?.stops.find(s => s.id === currentTrip.startStopId);
                          
                          return (
                            <div>
                              <div className="flex items-center mb-2">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: route?.color || 'gray' }}
                                ></div>
                                <span className="text-gray-700">
                                  {route?.name} ({bus?.number})
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm mb-2">
                                <Clock size={14} className="mr-1" />
                                <span>Départ: {formatDate(currentTrip.startTime)}</span>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin size={14} className="mr-1 flex-shrink-0" />
                                <span>Embarquement à {startStop?.name}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-center">
                    <div className="text-gray-500">
                      Aucun voyage en cours
                    </div>
                  </div>
                )}
                
                {/* Recent Trips */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Voyages récents</h3>
                    <Button variant="ghost" size="sm" className="text-transit-blue">
                      Voir tout
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                  
                  {sortedHistory.filter(trip => trip.endTime).slice(0, 3).map(trip => {
                    const route = routes.find(r => r.id === trip.routeId);
                    const startStop = route?.stops.find(s => s.id === trip.startStopId);
                    const endStop = trip.endStopId ? route?.stops.find(s => s.id === trip.endStopId) : null;
                    
                    return (
                      <div key={trip.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                        <div className="flex items-center mb-1">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: route?.color || 'gray' }}
                          ></div>
                          <span className="font-medium">{route?.name}</span>
                        </div>
                        <div className="ml-5 text-sm text-gray-600">
                          {startStop?.name} → {endStop?.name}
                        </div>
                        <div className="ml-5 text-xs text-gray-500 mt-1 flex justify-between">
                          <span>{formatDate(trip.startTime)}</span>
                          <span>{formatCurrency(trip.fare)}</span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {sortedHistory.filter(trip => trip.endTime).length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      Aucun voyage récent
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Itinéraires & Info Trafic</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="map" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="map">Carte</TabsTrigger>
                    <TabsTrigger value="routes">Lignes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="map">
                    <div className="h-[400px] mb-4">
                      <Map 
                        buses={buses} 
                        routes={routes}
                        selectedRoute={selectedRoute}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                        <div className="font-medium">Perturbation Ligne 1</div>
                        <div className="text-sm text-gray-600">
                          Travaux à St-Lazare. Prévoir 10 min supplémentaires.
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="routes">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {routes.map(route => (
                        <BusRouteCard
                          key={route.id}
                          route={route}
                          onClick={() => {
                            setSelectedRoute(route.id === selectedRoute ? undefined : route.id);
                          }}
                          isSelected={selectedRoute === route.id}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
