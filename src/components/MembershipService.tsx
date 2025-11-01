import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Crown, Calendar as CalendarIcon, Users, Star, Clock, Utensils, Heart, Gift, TrendingUp, CheckCircle, MapPin, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
  savings: string;
  color: string;
}

interface TiffinPlan {
  id: string;
  cookName: string;
  cookImage: string;
  planName: string;
  description: string;
  price: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  includes: string[];
  rating: number;
  subscribers: number;
  cuisine: string;
  deliveryTime: string;
  location: string;
  sample: string[];
}

interface Subscription {
  id: string;
  planId: string;
  cookName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'expired';
  nextDelivery: string;
  totalMeals: number;
  mealsConsumed: number;
}

const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    duration: 'month',
    description: 'Perfect for occasional home food lovers',
    features: [
      'Free delivery on orders above ₹200',
      '5% discount on all orders',
      'Priority customer support',
      'Access to exclusive deals'
    ],
    popular: false,
    savings: 'Save ₹300/month',
    color: 'from-gray-100 to-gray-50'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    duration: 'month',
    description: 'Best for regular home food enthusiasts',
    features: [
      'Free delivery on all orders',
      '15% discount on all orders',
      'Priority customer support',
      'Early access to new cooks',
      'Monthly cook meet & greet',
      'Nutrition tracking'
    ],
    popular: true,
    savings: 'Save ₹800/month',
    color: 'from-primary/20 to-secondary/20'
  },
  {
    id: 'family',
    name: 'Family',
    price: 349,
    duration: 'month',
    description: 'Ideal for families who love home cooking',
    features: [
      'Free delivery on all orders',
      '25% discount on all orders',
      'Multiple delivery addresses',
      'Family meal planning',
      'Bulk order discounts',
      'Dedicated family coordinator',
      'Monthly family cooking class'
    ],
    popular: false,
    savings: 'Save ₹1500/month',
    color: 'from-accent/30 to-secondary/30'
  }
];

const tiffinPlans: TiffinPlan[] = [
  {
    id: 'tp-1',
    cookName: 'Sunita Devi',
    cookImage: 'https://images.unsplash.com/photo-1494790108755-2616c0763c94',
    planName: 'North Indian Home Special',
    description: 'Authentic North Indian meals prepared with traditional recipes',
    price: { daily: 120, weekly: 750, monthly: 2800 },
    includes: ['Dal/Curry', 'Sabzi', 'Rice/Roti', 'Pickle', 'Sweet (Friday)'],
    rating: 4.8,
    subscribers: 234,
    cuisine: 'North Indian',
    deliveryTime: '12:00 PM - 1:00 PM',
    location: 'Lajpat Nagar, Delhi',
    sample: ['Monday: Rajma Rice', 'Tuesday: Aloo Gobi Roti', 'Wednesday: Dal Makhani']
  },
  {
    id: 'tp-2',
    cookName: 'Meera Patel',
    cookImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    planName: 'Gujarati Thali Experience',
    description: 'Complete Gujarati thali with variety of dishes daily',
    price: { daily: 150, weekly: 980, monthly: 3600 },
    includes: ['3 Sabzi', 'Dal', 'Rice', 'Roti', 'Papad', 'Pickle', 'Sweet'],
    rating: 4.9,
    subscribers: 156,
    cuisine: 'Gujarati',
    deliveryTime: '12:30 PM - 1:30 PM',
    location: 'Karol Bagh, Delhi',
    sample: ['Monday: Bhindi, Aloo Tamatar', 'Tuesday: Turai, Cabbage Poriyal']
  },
  {
    id: 'tp-3',
    cookName: 'Lakshmi Amma',
    cookImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6',
    planName: 'South Indian Healthy Meals',
    description: 'Nutritious South Indian meals with authentic flavors',
    price: { daily: 110, weekly: 700, monthly: 2600 },
    includes: ['Sambar/Rasam', 'Curry', 'Rice', 'Papad', 'Chutney'],
    rating: 4.7,
    subscribers: 189,
    cuisine: 'South Indian',
    deliveryTime: '1:00 PM - 2:00 PM',
    location: 'Laxmi Nagar, Delhi',
    sample: ['Monday: Sambar Rice', 'Tuesday: Rasam with Curry', 'Wednesday: Lemon Rice']
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    planId: 'tp-1',
    cookName: 'Sunita Devi',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    status: 'active',
    nextDelivery: '2024-01-20',
    totalMeals: 31,
    mealsConsumed: 19
  }
];

export function MembershipService() {
  const [activeTab, setActiveTab] = useState('plans');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TiffinPlan | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  const handleSubscribe = (plan: TiffinPlan) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionSubmit = () => {
    console.log('Subscription created:', {
      plan: selectedPlan,
      type: subscriptionType,
      address: deliveryAddress,
      instructions: specialInstructions,
      startDate
    });
    setShowSubscriptionModal(false);
    setSelectedPlan(null);
  };

  const getSubscriptionPrice = (plan: TiffinPlan, type: 'daily' | 'weekly' | 'monthly') => {
    return plan.price[type];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Gharse Membership & Tiffin Service</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our family and enjoy daily home-cooked meals delivered to your doorstep with exclusive membership benefits
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-accent/50">
          <TabsTrigger value="plans">Membership Plans</TabsTrigger>
          <TabsTrigger value="tiffin">Tiffin Services</TabsTrigger>
          <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${
                  plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border/50'
                } bg-gradient-to-br ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    <Crown className={`h-8 w-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary">
                    ₹{plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {plan.savings}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-secondary hover:bg-secondary/90'
                    }`}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tiffin" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Daily Tiffin Services</h3>
            <p className="text-muted-foreground">
              Subscribe to daily homemade meals from our certified home cooks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiffinPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="relative">
                  <ImageWithFallback
                    src={plan.cookImage}
                    alt={plan.cookName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">{plan.cookName}</h4>
                    <p className="text-sm opacity-90">{plan.location}</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary">
                    {plan.subscribers} subscribers
                  </Badge>
                </div>
                
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{plan.planName}</h4>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{plan.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{plan.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">What's Included:</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-accent/30 rounded-lg p-3">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <p className="font-semibold">₹{plan.price.daily}</p>
                        <p className="text-xs text-muted-foreground">Daily</p>
                      </div>
                      <div>
                        <p className="font-semibold">₹{plan.price.weekly}</p>
                        <p className="text-xs text-muted-foreground">Weekly</p>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">₹{plan.price.monthly}</p>
                        <p className="text-xs text-muted-foreground">Monthly</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleSubscribe(plan)}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          {mockSubscriptions.length > 0 ? (
            <div className="space-y-4">
              {mockSubscriptions.map((subscription) => (
                <Card key={subscription.id} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{subscription.cookName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {subscription.startDate} to {subscription.endDate}
                        </p>
                      </div>
                      <Badge 
                        className={
                          subscription.status === 'active' ? 'bg-green-500' :
                          subscription.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'
                        }
                      >
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{subscription.mealsConsumed}</p>
                        <p className="text-sm text-muted-foreground">Meals Delivered</p>
                      </div>
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-2xl font-bold text-secondary-foreground">{subscription.totalMeals - subscription.mealsConsumed}</p>
                        <p className="text-sm text-muted-foreground">Meals Remaining</p>
                      </div>
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Next Delivery</p>
                        <p className="font-semibold">{subscription.nextDelivery}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Pause Subscription
                      </Button>
                      <Button variant="outline" size="sm">
                        Modify Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Cook
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-border/50">
              <div className="text-muted-foreground">
                <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Active Subscriptions</h3>
                <p>Start your daily tiffin service today and enjoy homemade meals</p>
                <Button 
                  className="mt-4 bg-primary hover:bg-primary/90"
                  onClick={() => setActiveTab('tiffin')}
                >
                  Browse Tiffin Services
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-semibold">Health Benefits</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Fresh, home-cooked meals daily</li>
                  <li>• Nutrition tracking and meal planning</li>
                  <li>• Dietary customization available</li>
                  <li>• No preservatives or artificial ingredients</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-100 to-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Gift className="h-8 w-8 text-green-600" />
                  <h3 className="text-lg font-semibold">Exclusive Perks</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Free delivery on all orders</li>
                  <li>• Priority customer support</li>
                  <li>• Early access to new cooks</li>
                  <li>• Monthly cooking workshops</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-100 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-semibold">Cost Savings</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Up to 25% discount on all orders</li>
                  <li>• Bulk subscription discounts</li>
                  <li>• No delivery charges</li>
                  <li>• Special festival offers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                  <h3 className="text-lg font-semibold">Community</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Connect with local home cooks</li>
                  <li>• Join cooking communities</li>
                  <li>• Recipe sharing platform</li>
                  <li>• Family meal planning support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Subscription Modal */}
      <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Subscribe to Tiffin Service</DialogTitle>
            <DialogDescription>
              Complete your subscription to {selectedPlan?.planName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedPlan.cookImage} />
                  <AvatarFallback>{selectedPlan.cookName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedPlan.cookName}</h4>
                  <p className="text-sm text-muted-foreground">{selectedPlan.planName}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Subscription Type</label>
                <Select value={subscriptionType} onValueChange={(value: any) => setSubscriptionType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily - ₹{selectedPlan.price.daily}</SelectItem>
                    <SelectItem value="weekly">Weekly - ₹{selectedPlan.price.weekly}</SelectItem>
                    <SelectItem value="monthly">Monthly - ₹{selectedPlan.price.monthly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? startDate.toDateString() : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Delivery Address</label>
                <Textarea
                  placeholder="Enter your complete delivery address..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Special Instructions (Optional)</label>
                <Textarea
                  placeholder="Any dietary preferences or delivery instructions..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
              
              <div className="bg-accent/30 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-lg font-bold text-primary">
                    ₹{getSubscriptionPrice(selectedPlan, subscriptionType)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleSubscriptionSubmit}
                >
                  Subscribe Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSubscriptionModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}