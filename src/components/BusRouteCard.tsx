
import React from 'react';
import { BusRoute } from '@/lib/data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusRouteCardProps {
  route: BusRoute;
  onClick?: () => void;
  isSelected?: boolean;
}

const BusRouteCard: React.FC<BusRouteCardProps> = ({ 
  route, 
  onClick,
  isSelected = false 
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-all",
        isSelected ? "ring-2 ring-transit-blue" : ""
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2 flex flex-row items-center space-x-2">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white" 
          style={{ backgroundColor: route.color }}
        >
          <Bus size={16} />
        </div>
        <div className="font-medium">{route.name}</div>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4 ml-1">
          {route.stops.map((stop, index) => (
            <div key={stop.id} className="flex items-center mb-2 last:mb-0">
              {/* Vertical line connecting stops */}
              {index < route.stops.length - 1 && (
                <div 
                  className="absolute left-4 h-full w-0.5" 
                  style={{ 
                    backgroundColor: route.color,
                    top: '10px',
                    opacity: 0.5
                  }}
                ></div>
              )}
              
              {/* Stop indicator */}
              <div 
                className="w-3 h-3 rounded-full z-10 border-2 border-white shadow-sm"
                style={{ backgroundColor: route.color }}
              ></div>
              
              <div className="ml-3 text-sm">
                {stop.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusRouteCard;
