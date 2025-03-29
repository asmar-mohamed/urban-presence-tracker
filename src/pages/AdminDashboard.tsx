
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { buses, routes, users, travelHistory, formatDate } from '@/lib/data';
import { Bus, User, Map as MapIcon, Calendar, ArrowUpRight } from 'lucide-react';
import BusRouteCard from '@/components/BusRouteCard';

const AdminDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(undefined);
  const admin = users.find(user => user.role === 'admin');

  // Stats calculation
  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const totalPassengers = buses.reduce((sum, bus) => sum + bus.currentPassengers, 0);
  const occupancyRate = Math.round((totalPassengers / buses.reduce((sum, bus) => sum + bus.capacity, 0)) * 100);
  const todayTrips = travelHistory.filter(trip => {
    const today = new Date();
    const tripDate = new Date(trip.startTime);
    return tripDate.getDate() === today.getDate() && 
           tripDate.getMonth() === today.getMonth() && 
           tripDate.getFullYear() === today.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" userName={admin?.name} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Tableau de Bord</h1>
          <div className="flex space-x-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full bg-transit-green mr-2"></div>
              <span className="text-sm font-medium">En service: {activeBuses}</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full bg-transit-yellow mr-2"></div>
              <span className="text-sm font-medium">En maintenance: {buses.filter(bus => bus.status === 'maintenance').length}</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full bg-transit-red mr-2"></div>
              <span className="text-sm font-medium">Hors service: {buses.filter(bus => bus.status === 'outOfService').length}</span>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Bus Actifs</CardDescription>
              <CardTitle className="text-3xl">{activeBuses} <span className="text-sm font-normal text-gray-500">/ {buses.length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-transit-green">
                <Bus className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {Math.round((activeBuses / buses.length) * 100)}% de la flotte
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Passagers Actuels</CardDescription>
              <CardTitle className="text-3xl">{totalPassengers}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-transit-blue">
                <User className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  Taux d'occupation: {occupancyRate}%
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Routes Actives</CardDescription>
              <CardTitle className="text-3xl">{routes.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-transit-yellow">
                <MapIcon className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {routes.reduce((sum, route) => sum + route.stops.length, 0)} arrêts au total
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Voyages Aujourd'hui</CardDescription>
              <CardTitle className="text-3xl">{todayTrips}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-transit-green">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Carte</TabsTrigger>
            <TabsTrigger value="buses">Bus</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Lignes</h3>
                  <div className="space-y-3">
                    {routes.map(route => (
                      <div 
                        key={route.id}
                        className={`
                          p-2 rounded-md cursor-pointer flex items-center
                          ${selectedRoute === route.id ? 'bg-gray-100' : 'hover:bg-gray-50'}
                        `}
                        onClick={() => setSelectedRoute(route.id === selectedRoute ? undefined : route.id)}
                      >
                        <div 
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: route.color }}
                        ></div>
                        <span>{route.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Carte du Réseau
                  {selectedRoute && ` - ${routes.find(r => r.id === selectedRoute)?.name}`}
                </h3>
                <div className="h-[600px]">
                  <Map 
                    buses={buses} 
                    routes={routes}
                    selectedRoute={selectedRoute}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="buses">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-medium mb-4">État de la Flotte</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Numéro</th>
                      <th className="px-4 py-3 text-left">Chauffeur</th>
                      <th className="px-4 py-3 text-left">Ligne</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                      <th className="px-4 py-3 text-left">Passagers</th>
                      <th className="px-4 py-3 text-left">Taux Occupation</th>
                      <th className="px-4 py-3 text-left">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {buses.map(bus => {
                      const busRoute = routes.find(r => r.id === bus.route);
                      const occupancyRate = Math.round((bus.currentPassengers / bus.capacity) * 100);
                      
                      return (
                        <tr key={bus.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{bus.number}</td>
                          <td className="px-4 py-3">{bus.driver}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: busRoute?.color || 'gray' }}
                              ></div>
                              {busRoute?.name.split(':')[0] || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div 
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  bus.status === 'active' ? 'bg-transit-green' : 
                                  bus.status === 'maintenance' ? 'bg-transit-yellow' : 
                                  'bg-transit-red'
                                }`}
                              ></div>
                              {bus.status === 'active' ? 'En service' : 
                               bus.status === 'maintenance' ? 'En maintenance' : 
                               'Hors service'}
                            </div>
                          </td>
                          <td className="px-4 py-3">{bus.currentPassengers} / {bus.capacity}</td>
                          <td className="px-4 py-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  occupancyRate > 80 ? 'bg-transit-red' : 
                                  occupancyRate > 50 ? 'bg-transit-yellow' : 
                                  'bg-transit-green'
                                }`}
                                style={{ width: `${occupancyRate}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-transit-blue">
                              <MapIcon className="w-4 h-4 mr-1" />
                              <span>Voir</span>
                              <ArrowUpRight className="w-3 h-3 ml-1" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-medium mb-4">Historique des Voyages</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Passager</th>
                      <th className="px-4 py-3 text-left">Bus</th>
                      <th className="px-4 py-3 text-left">Ligne</th>
                      <th className="px-4 py-3 text-left">Départ</th>
                      <th className="px-4 py-3 text-left">Arrivée</th>
                      <th className="px-4 py-3 text-left">Tarif</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {travelHistory.map(trip => {
                      const passenger = users.find(u => u.id === trip.userId);
                      const bus = buses.find(b => b.id === trip.busId);
                      const route = routes.find(r => r.id === trip.routeId);
                      const startStop = route?.stops.find(s => s.id === trip.startStopId);
                      const endStop = trip.endStopId ? route?.stops.find(s => s.id === trip.endStopId) : null;
                      
                      return (
                        <tr key={trip.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{trip.id}</td>
                          <td className="px-4 py-3">{passenger?.name || 'N/A'}</td>
                          <td className="px-4 py-3">{bus?.number || 'N/A'}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: route?.color || 'gray' }}
                              ></div>
                              {route?.name.split(':')[0] || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div>{startStop?.name || 'N/A'}</div>
                              <div className="text-xs text-gray-500">{formatDate(trip.startTime)}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {trip.endTime ? (
                              <div>
                                <div>{endStop?.name || 'N/A'}</div>
                                <div className="text-xs text-gray-500">{formatDate(trip.endTime)}</div>
                              </div>
                            ) : (
                              <span className="text-transit-yellow">En cours</span>
                            )}
                          </td>
                          <td className="px-4 py-3">{trip.fare.toFixed(2)} €</td>
                          <td className="px-4 py-3">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                trip.endTime ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {trip.endTime ? 'Terminé' : 'En cours'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
