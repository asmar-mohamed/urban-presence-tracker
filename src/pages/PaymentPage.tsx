
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { users, formatCurrency } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, CheckCircle2, Euro, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const passenger = users.find(user => user.role === 'passenger');
  const [amount, setAmount] = useState('20');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = ['5', '10', '20', '50'];
  
  const handleAmountChange = (value: string) => {
    setAmount(value);
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      toast({
        title: "Recharge réussie !",
        description: `Votre carte a été rechargée de ${formatCurrency(Number(amount))}`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="passenger" userName={passenger?.name} />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/user" className="inline-flex items-center text-transit-blue mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour à mon profil
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Recharger ma carte</h1>
          
          {isComplete ? (
            <Card>
              <CardContent className="pt-6 pb-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-transit-green" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Paiement Réussi</h2>
                  <p className="text-gray-600 mb-6">
                    Votre carte a été rechargée de {formatCurrency(Number(amount))}
                  </p>
                  
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs mx-auto mb-6">
                    <p className="text-sm text-gray-500">Nouveau solde</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency((passenger?.balance || 0) + Number(amount))}
                    </p>
                  </div>
                  
                  <Link to="/user">
                    <Button className="bg-transit-blue hover:bg-blue-600">
                      Retour à mon compte
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recharger ma carte de transport</CardTitle>
                <CardDescription>
                  Carte #{passenger?.cardId} - Solde actuel: {passenger?.balance ? formatCurrency(passenger.balance) : '0,00 €'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base">Montant à recharger</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                        {predefinedAmounts.map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={`
                              py-2 px-4 rounded-md border text-center focus:outline-none
                              ${amount === value ? 'bg-transit-blue text-white border-transit-blue' : 'bg-white border-gray-300 hover:border-transit-blue'}
                            `}
                            onClick={() => handleAmountChange(value)}
                          >
                            {formatCurrency(Number(value))}
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-3">
                        <Label htmlFor="custom-amount">Autre montant</Label>
                        <div className="relative mt-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Euro className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            id="custom-amount"
                            value={amount}
                            onChange={handleCustomAmountChange}
                            className="pl-10"
                            placeholder="Montant personnalisé"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base">Méthode de paiement</Label>
                      <RadioGroup className="mt-3" value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:border-transit-blue cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 text-transit-blue mr-2" />
                              <span>Carte bancaire</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="mt-3">
                          {paymentMethod === 'card' && (
                            <div className="space-y-3">
                              <div>
                                <Label htmlFor="card-number">Numéro de carte</Label>
                                <Input id="card-number" placeholder="1234 5678 9012 3456" />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor="expiry">Date d'expiration</Label>
                                  <Input id="expiry" placeholder="MM/AA" />
                                </div>
                                <div>
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input id="cvc" placeholder="123" />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="name">Nom sur la carte</Label>
                                <Input id="name" placeholder="Prénom Nom" />
                              </div>
                            </div>
                          )}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <CardFooter className="flex justify-end pt-6 px-0">
                    <Button 
                      type="submit" 
                      className="bg-transit-blue hover:bg-blue-600 w-full sm:w-auto"
                      disabled={isProcessing || !amount || Number(amount) <= 0}
                    >
                      {isProcessing ? 'Traitement en cours...' : `Payer ${amount ? formatCurrency(Number(amount)) : ''}`}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
