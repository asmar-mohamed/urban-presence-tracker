
import React, { useState, useEffect } from 'react';
import { User, travelHistory, formatDate } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Camera, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface QRScannerProps {
  busId: string;
  routeId: string;
  stopId: string;
}

const QRScanner: React.FC<QRScannerProps> = ({ busId, routeId, stopId }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<User | null>(null);
  const [scanSuccess, setScanSuccess] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Simulate QR code scanning
  const startScanning = () => {
    setIsScanning(true);
    setScanSuccess(null);
    
    // Simulate scanning delay
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      
      if (success) {
        // Get a random passenger
        const passengers = [
          {
            id: '4',
            name: 'Lucas Dupont',
            role: 'passenger' as const,
            cardId: 'CARD-1001',
            balance: 24.50,
            photo: 'https://i.pravatar.cc/150?img=3'
          },
          {
            id: '5',
            name: 'Camille Moreau',
            role: 'passenger' as const,
            cardId: 'CARD-1002',
            balance: 16.75,
            photo: 'https://i.pravatar.cc/150?img=5'
          }
        ];
        const randomPassenger = passengers[Math.floor(Math.random() * passengers.length)];
        
        setLastScanned(randomPassenger);
        setScanSuccess(true);
        toast({
          title: "Scan réussi",
          description: `Passager: ${randomPassenger.name}`,
          variant: "default",
        });
        
        // Create new travel history entry
        const newTravel = {
          id: String(travelHistory.length + 1),
          userId: randomPassenger.id,
          busId,
          routeId,
          startStopId: stopId,
          startTime: new Date(),
          fare: 1.90
        };
        
        console.log("New travel record:", newTravel);
      } else {
        setScanSuccess(false);
        toast({
          title: "Échec du scan",
          description: "Carte non reconnue ou invalide",
          variant: "destructive",
        });
      }
      
      setIsScanning(false);
    }, 2000);
  };
  
  // Auto reset scan result after 5 seconds
  useEffect(() => {
    if (scanSuccess !== null) {
      const timer = setTimeout(() => {
        setScanSuccess(null);
        setLastScanned(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [scanSuccess]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-sm aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        {isScanning ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] border-2 border-transit-blue rounded-lg"></div>
            {/* Scanning animation */}
            <div 
              className="absolute h-1 bg-transit-blue/50 w-[80%] top-1/2"
              style={{
                animation: 'scanMove 2s infinite',
              }}
            ></div>
            <style jsx>{`
              @keyframes scanMove {
                0% { transform: translateY(-100px); }
                50% { transform: translateY(100px); }
                100% { transform: translateY(-100px); }
              }
            `}</style>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-transit-blue font-medium animate-pulse">
                Scanner un QR code...
              </div>
            </div>
          </div>
        ) : scanSuccess !== null ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            {scanSuccess ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-transit-green mb-4" />
                {lastScanned && (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transit-green">
                      <img src={lastScanned.photo} alt={lastScanned.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-medium text-lg">{lastScanned.name}</div>
                    <div className="text-sm text-gray-500">Carte #{lastScanned.cardId}</div>
                    <div className="mt-2 text-transit-green font-medium">Accès autorisé</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircle className="w-12 h-12 text-transit-red mb-4" />
                <div className="text-center">
                  <div className="font-medium text-lg">Scan invalide</div>
                  <div className="text-sm text-gray-500">Veuillez réessayer</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <div>Prêt à scanner</div>
            </div>
          </div>
        )}
      </div>

      <Button 
        onClick={startScanning} 
        disabled={isScanning}
        className="bg-transit-blue hover:bg-blue-600"
      >
        {isScanning ? 'Scan en cours...' : 'Scanner un QR code'}
      </Button>
    </div>
  );
};

export default QRScanner;
