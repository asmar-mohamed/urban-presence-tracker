
import React, { useEffect, useRef, useState } from 'react';
import { Bus, BusRoute, BusStop } from '@/lib/data';

interface MapProps {
  buses?: Bus[];
  routes?: BusRoute[];
  selectedRoute?: string;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({
  buses = [],
  routes = [],
  selectedRoute,
  centerLat = 48.8566,
  centerLng = 2.3522,
  zoom = 12
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapKey, setMapKey] = useState(Date.now());
  
  // This component simulates a map integration
  // In a real application, you would use a mapping library like Leaflet or Google Maps
  
  useEffect(() => {
    // This would initialize the map if we had a real map integration
    console.log("Map initialized with center:", { centerLat, centerLng, zoom });
    
    // Force re-render when selected route changes
    if (selectedRoute) {
      setMapKey(Date.now());
    }
  }, [centerLat, centerLng, zoom, selectedRoute]);

  // Filter buses by selected route
  const filteredBuses = selectedRoute
    ? buses.filter(bus => bus.route === selectedRoute)
    : buses;

  // Filter routes by selected route
  const filteredRoutes = selectedRoute
    ? routes.filter(route => route.id === selectedRoute)
    : routes;

  return (
    <div key={mapKey} className="relative w-full h-full min-h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0">
        {/* Map simulation with styled divs */}
        <div className="absolute inset-0 bg-[#e8ecef]"></div>
        
        {/* Draw routes */}
        {filteredRoutes.map(route => (
          <div key={route.id} className="absolute inset-0 z-10">
            {/* Connecting lines between stops */}
            {route.stops.map((stop, index) => {
              if (index < route.stops.length - 1) {
                const nextStop = route.stops[index + 1];
                return (
                  <div
                    key={`${stop.id}-${nextStop.id}`}
                    className="absolute"
                    style={{
                      height: '2px',
                      backgroundColor: route.color,
                      width: '100px',
                      top: `${(stop.location.lat - 48.82) * 1400 + 10}px`,
                      left: `${(stop.location.lng - 2.22) * 1000}px`,
                      transform: 'rotate(30deg)',
                      transformOrigin: '0 0',
                      opacity: 0.7
                    }}
                  ></div>
                );
              }
              return null;
            })}
            
            {/* Bus stops */}
            {route.stops.map((stop) => (
              <div
                key={stop.id}
                className="absolute flex flex-col items-center"
                style={{
                  top: `${(stop.location.lat - 48.82) * 1400}px`,
                  left: `${(stop.location.lng - 2.22) * 1000}px`,
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full z-20 shadow-md border border-white"
                  style={{ backgroundColor: route.color }}
                ></div>
                <div className="mt-1 text-xs font-medium bg-white/80 px-1 rounded">
                  {stop.name}
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Draw buses */}
        {filteredBuses.map(bus => (
          <div
            key={bus.id}
            className="absolute flex flex-col items-center"
            style={{
              top: `${(bus.location.lat - 48.82) * 1400}px`,
              left: `${(bus.location.lng - 2.22) * 1000}px`,
              zIndex: 30
            }}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-transit-blue animate-pulse-slow">
                <span className="text-[10px] font-bold text-transit-blue">
                  {bus.number.replace('BUS-', '')}
                </span>
              </div>
              {bus.status === 'active' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-transit-green rounded-full border border-white"></div>
              )}
              {bus.status === 'maintenance' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-transit-yellow rounded-full border border-white"></div>
              )}
              {bus.status === 'outOfService' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-transit-red rounded-full border border-white"></div>
              )}
            </div>
          </div>
        ))}
        
        {/* Map attribution */}
        <div className="absolute bottom-0 right-0 bg-white/80 text-xs p-1">
          Map Simulation
        </div>
      </div>
    </div>
  );
};

export default Map;
