
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  userRole?: 'admin' | 'driver' | 'passenger';
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavLinks = () => {
    if (userRole === 'admin') {
      return [
        { name: 'Tableau de bord', path: '/admin' },
        { name: 'Bus', path: '/admin/buses' },
        { name: 'Utilisateurs', path: '/admin/users' },
      ];
    } else if (userRole === 'driver') {
      return [
        { name: 'Scanner', path: '/driver' },
        { name: 'Itinéraire', path: '/driver/route' },
      ];
    } else if (userRole === 'passenger') {
      return [
        { name: 'Profil', path: '/user' },
        { name: 'Itinéraires', path: '/user/routes' },
        { name: 'Historique', path: '/user/history' },
      ];
    }
    return [
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/#services' },
      { name: 'Contact', path: '/#contact' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-transit-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">UT</span>
          </div>
          <span className="font-bold text-transit-blue text-xl">UrbanTransit</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                isActive(link.path)
                  ? 'text-transit-blue font-semibold'
                  : 'text-gray-600 hover:text-transit-blue'
              } transition-colors`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User menu for desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {userRole ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                  <span className="sr-only">Ouvrir le menu</span>
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-transit-blue text-white">
                    {userName?.charAt(0) || 'U'}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>{userName}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link to="/" className="flex-1">Se déconnecter</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-transit-blue text-transit-blue hover:bg-transit-blue hover:text-white">
                Connexion
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-600 hover:text-transit-blue"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-2 px-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? 'text-transit-blue font-semibold'
                    : 'text-gray-600'
                } py-2`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            {!userRole && (
              <Link to="/login" onClick={toggleMenu}>
                <Button className="w-full mt-2 bg-transit-blue hover:bg-blue-600">
                  Connexion
                </Button>
              </Link>
            )}
            {userRole && (
              <>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 py-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-transit-blue text-white">
                      {userName?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium">{userName}</span>
                  </div>
                  <Link to="/" onClick={toggleMenu} className="flex items-center space-x-2 text-gray-600 py-2">
                    <LogOut size={18} />
                    <span>Se déconnecter</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
