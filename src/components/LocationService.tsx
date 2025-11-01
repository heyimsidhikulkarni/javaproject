import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MapPin, Navigation, Search, Star, Clock, Truck, Target, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Cook {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  distance: number;
  deliveryTime: string;
  location: string;
  coordinates: { lat: number; lng: number };
  totalOrders: number;
  isOpen: boolean;
  deliveryFee: number;
}

interface LocationServiceProps {
  onSelectCook?: (cookId: string) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
}

const mockCooks: Cook[] = [
  {
    id: 'cook-1',
    name: 'Sunita Devi',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c94',
    specialties: ['North Indian', 'Vegetarian'],
    rating: 4.8,
    distance: 0.8,
    deliveryTime: '25-35 mins',
    location: 'Lajpat Nagar, Delhi',
    coordinates: { lat: 28.5665, lng: 77.2431 },
    totalOrders: 1250,
    isOpen: true,
    deliveryFee: 15
  },
  {
    id: 'cook-2',
    name: 'Rashid Khan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    specialties: ['Biryani', 'Mughlai'],
    rating: 4.9,
    distance: 1.2,
    deliveryTime: '35-45 mins',
    location: 'Old Delhi',
    coordinates: { lat: 28.6506, lng: 77.2334 },
    totalOrders: 890,
    isOpen: true,
    deliveryFee: 20
  },
  {
    id: 'cook-3',
    name: 'Meera Patel',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    specialties: ['Gujarati', 'Thali'],
    rating: 4.7,
    distance: 2.1,
    deliveryTime: '40-50 mins',
    location: 'Karol Bagh, Delhi',
    coordinates: { lat: 28.6519, lng: 77.1909 },
    totalOrders: 567,
    isOpen: false,
    deliveryFee: 25
  },
  {
    id: 'cook-4',
    name: 'Lakshmi Amma',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6',
    specialties: ['South Indian', 'Healthy'],
    rating: 4.6,
    distance: 1.8,
    deliveryTime: '30-40 mins',
    location: 'Laxmi Nagar, Delhi',
    coordinates: { lat: 28.6365, lng: 77.2769 },
    totalOrders: 432,
    isOpen: true,
    deliveryFee: 18
  }
];

const popularAreas = [
  'Connaught Place',
  'Lajpat Nagar',
  'Karol Bagh',
  'Laxmi Nagar',
  'Old Delhi',
  'India Gate',
  'Janpath',
  'Khan Market'
];

export function LocationService({ onSelectCook, selectedLocation, onLocationChange }: LocationServiceProps) {
  const [userLocation, setUserLocation] = useState(selectedLocation || '');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationInput, setLocationInput] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'delivery'>('distance');
  const [filteredCooks, setFilteredCooks] = useState<Cook[]>(mockCooks);

  useEffect(() => {
    // Sort and filter cooks based on current criteria
    let sorted = [...mockCooks];
    
    if (sortBy === 'distance') {
      sorted.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'delivery') {
      sorted.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    }
    
    setFilteredCooks(sorted);
  }, [sortBy]);

  const detectCurrentLocation = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          
          // Mock reverse geocoding based on coordinates
          const mockAddress = "Green Park, New Delhi, Delhi 110016";
          setUserLocation(mockAddress);
          onLocationChange?.(mockAddress);
          setIsDetectingLocation(false);
        },
        (error) => {
          setIsDetectingLocation(false);
          let errorMessage = 'Unable to detect location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enter your address manually.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable. Please enter your address manually.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again or enter your address manually.';
              break;
            default:
              errorMessage = 'Location detection failed. Please enter your address manually.';
              break;
          }
          
          // Show user-friendly error message instead of console error
          alert(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setIsDetectingLocation(false);
      alert('Geolocation is not supported by this browser. Please enter your address manually.');
    }
  };

  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      setUserLocation(locationInput);
      onLocationChange?.(locationInput);
      setLocationInput('');
    }
  };

  const selectPopularArea = (area: string) => {
    setUserLocation(area + ', Delhi');
    onLocationChange?.(area + ', Delhi');
  };

  return (
    <div className="space-y-6">
      {/* Location Input Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Find Home Cooks Near You</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter your delivery address..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="bg-background"
                  onKeyDown={(e) => e.key === 'Enter' && handleLocationSubmit()}
                />
              </div>
              <Button onClick={handleLocationSubmit} className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={detectCurrentLocation}
                disabled={isDetectingLocation}
                className="flex items-center space-x-2"
              >
                <Navigation className="h-4 w-4" />
                {isDetectingLocation ? 'Detecting...' : 'Detect'}
              </Button>
            </div>
            
            {userLocation && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4 text-primary" />
                <span>Delivering to: <strong>{userLocation}</strong></span>
              </div>
            )}
            
            {/* Popular Areas */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Popular Areas:</p>
              <div className="flex flex-wrap gap-2">
                {popularAreas.map((area) => (
                  <Button
                    key={area}
                    variant="outline"
                    size="sm"
                    onClick={() => selectPopularArea(area)}
                    className="text-xs"
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sorting Options */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Available Home Cooks</h4>
        <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
          <TabsList className="bg-accent/50">
            <TabsTrigger value="distance" className="text-xs">Nearest</TabsTrigger>
            <TabsTrigger value="rating" className="text-xs">Top Rated</TabsTrigger>
            <TabsTrigger value="delivery" className="text-xs">Fastest</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Cooks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCooks.map((cook) => (
          <Card 
            key={cook.id} 
            className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm cursor-pointer ${
              !cook.isOpen ? 'opacity-70' : ''
            }`}
            onClick={() => onSelectCook?.(cook.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={cook.image} />
                  <AvatarFallback>{cook.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{cook.name}</h4>
                      <p className="text-sm text-muted-foreground">{cook.location}</p>
                    </div>
                    <Badge 
                      variant={cook.isOpen ? "default" : "secondary"}
                      className={cook.isOpen ? "bg-green-500" : "bg-gray-500"}
                    >
                      {cook.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {cook.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs bg-secondary/70">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{cook.rating} ({cook.totalOrders}+)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{cook.distance} km away</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{cook.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-3 w-3 text-muted-foreground" />
                      <span>₹{cook.deliveryFee} delivery</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!cook.isOpen}
                  >
                    {cook.isOpen ? 'View Menu' : 'Currently Closed'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Integration Placeholder */}
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Map View</h4>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
          <div className="bg-gradient-to-br from-accent/50 to-secondary/30 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Interactive map showing cook locations</p>
              <p className="text-sm">will be available soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}