
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { 
  Bus, 
  CreditCard, 
  MapPin, 
  QrCode, 
  Shield, 
  Clock,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-transit-blue to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Gestion de la Présence dans le Transport Urbain
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Une solution moderne et efficace pour suivre la présence des passagers, 
                gérer les itinéraires et simplifier les paiements.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button className="bg-white text-transit-blue hover:bg-gray-100">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Demo Admin
                  </Button>
                </Link>
                <Link to="/driver">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Demo Chauffeur
                  </Button>
                </Link>
                <Link to="/user">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Demo Passager
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="h-8 bg-gray-200 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4">
                    <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Bus size={64} className="mx-auto mb-4 text-transit-blue" />
                        <p className="text-gray-600">Carte du réseau de transport</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-gray-100 rounded-md p-3">
                      <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-transit-green rounded-lg transform rotate-6 shadow-lg flex items-center justify-center">
                  <QrCode size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="text-transit-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
              <p className="text-gray-600">
                Les chauffeurs scannent les QR codes des passagers pour enregistrer 
                leur présence en temps réel.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-transit-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi en Temps Réel</h3>
              <p className="text-gray-600">
                Suivez l'emplacement des bus en temps réel et consultez les 
                itinéraires sur une carte interactive.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="text-transit-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Paiement Facile</h3>
              <p className="text-gray-600">
                Rechargez votre carte de transport en ligne avec notre 
                système de paiement sécurisé et simple.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Shield className="text-transit-blue w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sécurité Renforcée</h3>
                <p className="text-gray-600">
                  Notre système garantit une sécurité optimale pour les passagers 
                  en suivant les présences en temps réel et en détectant rapidement 
                  toute anomalie.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Clock className="text-transit-green w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gain de Temps</h3>
                <p className="text-gray-600">
                  Automatisation des processus de vérification et de paiement, 
                  réduisant les temps d'attente et améliorant l'expérience utilisateur.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Bus className="text-purple-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimisation des Itinéraires</h3>
                <p className="text-gray-600">
                  Analyse des données de présence pour optimiser les itinéraires 
                  et les horaires en fonction de la demande réelle.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                <CreditCard className="text-red-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Simplification des Paiements</h3>
                <p className="text-gray-600">
                  Interface de paiement intuitive permettant aux utilisateurs de 
                  recharger leur carte de transport en quelques clics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-transit-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à Moderniser Votre Système de Transport ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez-nous et découvrez comment notre solution peut améliorer 
            l'efficacité de votre réseau de transport urbain.
          </p>
          <Link to="/register">
            <Button className="bg-white text-transit-blue hover:bg-gray-100">
              Commencer Maintenant
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UrbanTransit</h3>
              <p className="text-gray-400">
                Solution moderne pour la gestion de la présence dans le transport urbain.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Accueil</Link></li>
                <li><Link to="/#services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Connexion</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Inscription</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Conditions d'utilisation</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Politique de confidentialité</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookies</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="text-gray-400 not-italic">
                <p>123 Rue du Transport</p>
                <p>75000 Paris, France</p>
                <p className="mt-2">contact@urbantransit.fr</p>
                <p>+33 1 23 45 67 89</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} UrbanTransit. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
