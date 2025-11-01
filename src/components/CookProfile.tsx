import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Star, MapPin, Clock, Heart, Users, Award, ChefHat, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HealthCertification } from './HealthCertification';

interface CookProfileProps {
  cookId: string;
  onClose: () => void;
  onAddToCart?: (item: any) => void;
}

const mockCookData = {
  id: 'cook-1',
  name: 'Sunita Devi',
  title: 'Master of North Indian Cuisine',
  image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c94',
  location: 'Lajpat Nagar, Delhi',
  rating: 4.8,
  totalOrders: 1250,
  experience: '15+ years',
  specialties: ['North Indian', 'Homestyle', 'Vegetarian'],
  about: 'With over 15 years of experience cooking for my family and now sharing these recipes with the Gharse community, I specialize in authentic North Indian cuisine. Every dish is prepared with love and the finest ingredients, just like I would cook for my own family.',
  achievements: [
    'Top Rated Cook 2023',
    '1000+ Happy Customers',
    'Featured Cook of the Month'
  ],
  menu: [
    {
      id: 1,
      name: 'Homestyle Rajma Chawal',
      description: 'Authentic rajma curry with basmati rice, made with love',
      price: 120,
      image: 'https://images.unsplash.com/photo-1666251214795-a1296307d29c',
      rating: 4.9,
      time: '30-45 mins',
      tags: ['Vegetarian', 'Homemade', 'North Indian']
    },
    {
      id: 2,
      name: 'Butter Chicken with Naan',
      description: 'Creamy butter chicken with fresh homemade naan',
      price: 180,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
      rating: 4.8,
      time: '40-50 mins',
      tags: ['Non-Vegetarian', 'Popular', 'North Indian']
    },
    {
      id: 3,
      name: 'Dal Makhani Special',
      description: 'Rich and creamy dal makhani slow-cooked for hours',
      price: 100,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
      rating: 4.7,
      time: '25-35 mins',
      tags: ['Vegetarian', 'Comfort Food', 'Healthy']
    }
  ],
  reviews: [
    {
      id: 1,
      customer: 'Priya S.',
      rating: 5,
      comment: 'Sunita Aunty\'s rajma tastes exactly like my mother\'s! The flavors are authentic and the portion size is generous.',
      date: '2 days ago',
      dish: 'Rajma Chawal'
    },
    {
      id: 2,
      customer: 'Amit K.',
      rating: 5,
      comment: 'Best butter chicken in the area. The cook clearly knows what she\'s doing. Will definitely order again!',
      date: '1 week ago',
      dish: 'Butter Chicken'
    },
    {
      id: 3,
      customer: 'Meera P.',
      rating: 4,
      comment: 'Great taste and quality. Food arrived hot and fresh. The dal makhani was particularly good.',
      date: '2 weeks ago',
      dish: 'Dal Makhani'
    }
  ]
};

export function CookProfile({ cookId, onClose, onAddToCart }: CookProfileProps) {
  const cook = mockCookData; // In real app, fetch by cookId

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="overflow-hidden bg-gradient-to-r from-accent/50 to-secondary/30 border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={cook.image} />
              <AvatarFallback className="text-xl">{cook.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold">{cook.name}</h1>
                <p className="text-lg text-muted-foreground">{cook.title}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{cook.rating}</span>
                  <span className="text-muted-foreground">({cook.totalOrders} orders)</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{cook.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <ChefHat className="h-4 w-4" />
                  <span>{cook.experience} experience</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cook.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="bg-primary/20 text-primary-foreground/80">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button className="bg-primary hover:bg-primary/90">
                <Heart className="h-4 w-4 mr-2" />
                Follow Cook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-accent/50">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="health">Health & Safety</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cook.menu.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="font-bold text-lg">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-secondary/70">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    onClick={() => onAddToCart?.(item)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">About {cook.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{cook.about}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{cook.totalOrders}+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{cook.rating}/5</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{cook.experience}</div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <HealthCertification cookId={cook.id} />
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          {cook.reviews.map((review) => (
            <Card key={review.id} className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{review.customer[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.customer}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">{review.comment}</p>
                <Badge variant="outline" className="text-xs">
                  {review.dish}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cook.achievements.map((achievement, index) => (
              <Card key={index} className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold text-primary">{achievement}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}