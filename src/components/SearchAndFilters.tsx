import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Search, Filter, MapPin, Clock, Star, Utensils, ChefHat, Coffee, Cookie, Salad, Soup, Cake, Flame } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFilters: {
    priceRange: number[];
    ratings: number;
    deliveryTime: string;
    dietary: string[];
    location: string;
  };
  setSelectedFilters: (filters: any) => void;
  onClearFilters: () => void;
}

const categories = [
  { 
    id: 'all', 
    name: 'All Dishes', 
    icon: Utensils, 
    color: 'from-primary to-primary/80',
    bgColor: 'bg-gradient-to-br from-primary/10 to-primary/5',
    description: 'All available dishes'
  },
  { 
    id: 'north-indian', 
    name: 'North Indian', 
    icon: ChefHat, 
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-gradient-to-br from-orange-100 to-red-50',
    description: 'Rich curries & tandoor'
  },
  { 
    id: 'south-indian', 
    name: 'South Indian', 
    icon: Coffee, 
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-green-100 to-emerald-50',
    description: 'Dosas, idli & more'
  },
  { 
    id: 'snacks', 
    name: 'Snacks', 
    icon: Cookie, 
    color: 'from-yellow-500 to-orange-400',
    bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-50',
    description: 'Quick bites & street food'
  },
  { 
    id: 'thali', 
    name: 'Thali', 
    icon: Salad, 
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-100 to-pink-50',
    description: 'Complete meal plates'
  },
  { 
    id: 'biryani', 
    name: 'Biryani', 
    icon: Flame, 
    color: 'from-red-600 to-orange-600',
    bgColor: 'bg-gradient-to-br from-red-100 to-orange-50',
    description: 'Aromatic rice dishes'
  },
  { 
    id: 'desserts', 
    name: 'Desserts', 
    icon: Cake, 
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-100 to-rose-50',
    description: 'Sweet treats & mithai'
  },
  { 
    id: 'beverages', 
    name: 'Beverages', 
    icon: Soup, 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-50',
    description: 'Drinks & refreshers'
  }
];

const dietaryOptions = [
  'Vegetarian',
  'Non-Vegetarian',
  'Vegan',
  'Jain',
  'Gluten-Free'
];

const deliveryTimeOptions = [
  'Under 30 mins',
  '30-45 mins',
  '45-60 mins',
  'Above 60 mins'
];

export function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedFilters,
  setSelectedFilters,
  onClearFilters
}: SearchAndFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (key: string, value: any) => {
    setSelectedFilters({
      ...selectedFilters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedFilters.priceRange[0] > 0 || selectedFilters.priceRange[1] < 500) count++;
    if (selectedFilters.ratings > 0) count++;
    if (selectedFilters.deliveryTime) count++;
    if (selectedFilters.dietary.length > 0) count++;
    if (selectedFilters.location) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Search Section */}
      <div className="relative">
        <Card className="p-6 bg-gradient-to-br from-card/90 via-accent/20 to-secondary/10 backdrop-blur-sm border-primary/20 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              What are you craving today?
            </h2>
            <p className="text-muted-foreground">Discover delicious home-cooked meals from loving kitchens near you</p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary/60" />
            </div>
            <Input
              placeholder="Search for dishes, cuisines, or home cooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 text-lg bg-background/80 border-2 border-primary/30 focus:border-primary/60 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 focus:shadow-xl"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-primary/10"
              >
                ×
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Enhanced Category Selection */}
      <div>
        <div className="text-center mb-4">
          <h3 className="text-lg mb-1 text-foreground">Browse by Category</h3>
          <p className="text-sm text-muted-foreground">Choose your favorite cuisine type</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`relative p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 group ${
                  isSelected 
                    ? `border-primary/60 shadow-xl ${category.bgColor}` 
                    : 'border-border/30 hover:border-primary/40 bg-card/50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center space-y-2">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${
                    isSelected ? category.color : 'from-muted to-muted/80'
                  } shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h4 className={`font-medium text-sm leading-tight ${
                      isSelected ? 'text-primary' : 'text-foreground'
                    }`}>
                      {category.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-tight">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Filters and Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          {/* Advanced Filters */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative bg-card/50 border-border/50 hover:bg-accent/50">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6 bg-card/95 backdrop-blur-md border-border/50 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-1">Filter Your Search</h4>
                  <p className="text-sm text-muted-foreground">Find exactly what you're looking for</p>
                </div>
                
                {/* Price Range */}
                <div className="space-y-3">
                  <label className="font-medium">Price Range: ₹{selectedFilters.priceRange[0]} - ₹{selectedFilters.priceRange[1]}</label>
                  <Slider
                    value={selectedFilters.priceRange}
                    onValueChange={(value) => updateFilter('priceRange', value)}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Ratings */}
                <div className="space-y-3">
                  <label className="font-medium">Minimum Rating</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <Button
                        key={rating}
                        variant={selectedFilters.ratings === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateFilter('ratings', rating)}
                        className="flex items-center justify-center space-x-1"
                      >
                        <Star className="h-3 w-3" />
                        <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="space-y-3">
                  <label className="font-medium">Delivery Time</label>
                  <div className="space-y-2">
                    {deliveryTimeOptions.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedFilters.deliveryTime === time}
                          onCheckedChange={(checked) => 
                            updateFilter('deliveryTime', checked ? time : '')
                          }
                        />
                        <label className="text-sm flex items-center cursor-pointer">
                          <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div className="space-y-3">
                  <label className="font-medium">Dietary Preferences</label>
                  <div className="space-y-2">
                    {dietaryOptions.map((diet) => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedFilters.dietary.includes(diet)}
                          onCheckedChange={(checked) => {
                            const newDietary = checked
                              ? [...selectedFilters.dietary, diet]
                              : selectedFilters.dietary.filter(d => d !== diet);
                            updateFilter('dietary', newDietary);
                          }}
                        />
                        <label className="text-sm cursor-pointer">{diet}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={onClearFilters} className="flex-1">
                    Clear All
                  </Button>
                  <Button size="sm" onClick={() => setIsFilterOpen(false)} className="flex-1 bg-primary hover:bg-primary/90">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Quick Filter Buttons */}
          <div className="flex space-x-2">
            <Button 
              variant={selectedFilters.ratings === 4.5 ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter('ratings', selectedFilters.ratings === 4.5 ? 0 : 4.5)}
              className={`${selectedFilters.ratings === 4.5 ? 'bg-primary text-primary-foreground' : 'bg-card/50 border-border/50 hover:bg-accent/50'}`}
            >
              <Star className="h-3 w-3 mr-1" />
              Top Rated
            </Button>
            <Button 
              variant={selectedFilters.deliveryTime === 'Under 30 mins' ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter('deliveryTime', selectedFilters.deliveryTime === 'Under 30 mins' ? '' : 'Under 30 mins')}
              className={`${selectedFilters.deliveryTime === 'Under 30 mins' ? 'bg-primary text-primary-foreground' : 'bg-card/50 border-border/50 hover:bg-accent/50'}`}
            >
              <Clock className="h-3 w-3 mr-1" />
              Fast Delivery
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        {getActiveFiltersCount() > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            Clear All ({getActiveFiltersCount()})
          </Button>
        )}
      </div>
    </div>
  );
}