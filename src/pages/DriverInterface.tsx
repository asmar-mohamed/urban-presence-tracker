
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import QRScanner from '@/components/QRScanner';
import Map from '@/components/Map';
import BusRouteCard from '@/components/BusRouteCard';
import { buses, routes, users } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Users, 
  MapPin, 
  Clock,
  AlertCircle
} from 'lucide-react';

const DriverInterface = () => {
  const [selectedRoute, setSelectedRoute] = useState(routes[0].id);
  const driver = users.find(user => user.role === 'driver');
  const bus = buses.find(bus => bus.driver === driver?.name);
  
  const busRoute = routes.find(route => route.id === selectedRoute);
  const currentStopIndex = 0; // Simulated current stop index
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="driver" userName={driver?.name} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bonjour, {driver?.name}</h1>
            {bus && (
              <p className="text-gray-600">
                Bus #{bus.number} - {busRoute?.name}
              </p>
            )}
          </div>
          
          {bus && (
            <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm flex items-center">
              <div 
                className={`w-3 h-3 rounded-full mr-2 ${
                  bus.status === 'active' ? 'bg-transit-green' : 
                  bus.status === 'maintenance' ? 'bg-transit-yellow' : 
                  'bg-transit-red'
                }`}
              ></div>
              <span className="text-sm font-medium">
                {bus.status === 'active' ? 'En service' : 
                 bus.status === 'maintenance' ? 'En maintenance' : 
                 'Hors service'}
              </span>
              <Separator orientation="vertical" className="mx-3 h-6" />
              <Users size={16} className="text-gray-500 mr-1" />
              <span className="text-sm">
                {bus.currentPassengers} / {bus.capacity} passagers
              </span>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="scanner" className="space-y-4">
          <TabsList>
            <TabsTrigger value="scanner">Scanner QR</TabsTrigger>
            <TabsTrigger value="route">Itinéraire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scanner" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Scanner de QR Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QRScanner 
                      busId={bus?.id || '1'} 
                      routeId={selectedRoute}
                      stopId={busRoute?.stops[currentStopIndex].id || ''}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Arrêt Actuel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {busRoute && (
                      <div>
                        <div className="flex items-center mb-4">
                          <div 
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: busRoute.color }}
                          ></div>
                          <span className="font-medium">{busRoute.name}</span>
                        </div>
                        
                        <div className="relative pl-6 ml-2">
                          {busRoute.stops.map((stop, index) => (
                            <div 
                              key={stop.id}
                              className={`flex items-center mb-6 last:mb-0 ${
                                index === currentStopIndex ? 'opacity-100' : 'opacity-60'
                              }`}
                            >
                              {/* Vertical line connecting stops */}
                              {index < busRoute.stops.length - 1 && (
                                <div 
                                  className="absolute left-1 h-full w-0.5" 
                                  style={{
                                    backgroundColor: busRoute.color,
                                    top: '12px',
                                    opacity: 0.5
                                  }}
                                ></div>
                              )}
                              
                              {/* Stop indicator */}
                              <div 
                                className={`w-4 h-4 rounded-full z-10 border-2 border-white ${
                                  index === currentStopIndex ? 
                                  'bg-transit-blue animate-pulse' : 
                                  index < currentStopIndex ? 'bg-gray-300' : 'bg-white border-gray-300'
                                }`}
                                style={index === currentStopIndex ? {} : {}}
                              ></div>
                              
                              <div className="ml-4">
                                <div className={`font-medium ${index === currentStopIndex ? 'text-transit-blue' : ''}`}>
                                  {stop.name}
                                </div>
                                
                                {index === currentStopIndex && (
                                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    <span>Arrêt actuel</span>
                                  </div>
                                )}
                                
                                {index === currentStopIndex + 1 && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    Prochain arrêt (5 min)
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-transit-yellow">
                      <AlertCircle size={18} className="mr-2" />
                      Alertes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                        <div className="font-medium">Retard signalé sur la ligne</div>
                        <div className="text-sm text-gray-600">
                          Ralentissement au niveau de la Gare du Nord. +10 minutes de retard estimé.
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                        <div className="font-medium">Affluence élevée attendue</div>
                        <div className="text-sm text-gray-600">
                          Événement au Centre Commercial. Prévoyez une augmentation de passagers.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="route" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Lignes</h3>
                  <div className="space-y-4">
                    {routes.map(route => (
                      <BusRouteCard
                        key={route.id}
                        route={route}
                        isSelected={selectedRoute === route.id}
                        onClick={() => setSelectedRoute(route.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Carte d'Itinéraire
                      {busRoute && ` - ${busRoute.name}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[600px]">
                      <Map 
                        buses={bus ? [bus] : []}
                        routes={busRoute ? [busRoute] : []}
                        selectedRoute={selectedRoute}
                        zoom={13}
                      />
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <div className="font-medium mb-2">Instructions de Navigation</div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-start mb-2">
                          <MapPin size={16} className="mr-2 text-transit-blue mt-0.5 flex-shrink-0" />
                          <div>
                            Suivez l'itinéraire indiqué. Vérifiez régulièrement la présence des passagers à chaque arrêt.
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock size={16} className="mr-2 text-transit-green mt-0.5 flex-shrink-0" />
                          <div>
                            Temps estimé pour terminer la ligne: 45 minutes. Prochain arrêt dans 5 minutes.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DriverInterface;
