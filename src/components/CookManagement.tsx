import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  ShieldCheck,
  Eye,
  Edit,
  Ban,
  UserCheck,
  Package
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data for registered cooks
const mockCooks = [
  {
    id: 'cook-1',
    name: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    phone: '+91-9876543210',
    location: 'Lajpat Nagar, Delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rating: 4.8,
    totalOrders: 248,
    totalEarnings: 45600,
    joinedDate: '2023-03-15',
    status: 'verified',
    specialties: ['North Indian', 'Vegetarian', 'Traditional'],
    healthCertification: true,
    lastActive: '2 hours ago',
    activeItems: 12,
    completionRate: 95,
    responseTime: '15 mins',
    monthlyOrders: 38,
    monthlyEarnings: 7200
  },
  {
    id: 'cook-2',
    name: 'Rashid Khan',
    email: 'rashid.khan@email.com',
    phone: '+91-9876543211',
    location: 'Old Delhi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 4.9,
    totalOrders: 356,
    totalEarnings: 78400,
    joinedDate: '2023-01-20',
    status: 'verified',
    specialties: ['Non-Vegetarian', 'Biryani', 'Mughlai'],
    healthCertification: true,
    lastActive: '1 hour ago',
    activeItems: 8,
    completionRate: 98,
    responseTime: '12 mins',
    monthlyOrders: 45,
    monthlyEarnings: 9800
  },
  {
    id: 'cook-3',
    name: 'Meera Patel',
    email: 'meera.patel@email.com',
    phone: '+91-9876543212',
    location: 'Karol Bagh, Delhi',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e46c1e?w=150',
    rating: 4.7,
    totalOrders: 189,
    totalEarnings: 34200,
    joinedDate: '2023-05-10',
    status: 'verified',
    specialties: ['Gujarati', 'Thali', 'Vegetarian'],
    healthCertification: true,
    lastActive: '30 mins ago',
    activeItems: 15,
    completionRate: 92,
    responseTime: '20 mins',
    monthlyOrders: 28,
    monthlyEarnings: 5600
  },
  {
    id: 'cook-4',
    name: 'Raju Bhai',
    email: 'raju.bhai@email.com',
    phone: '+91-9876543213',
    location: 'Connaught Place, Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.5,
    totalOrders: 156,
    totalEarnings: 23400,
    joinedDate: '2023-07-22',
    status: 'pending',
    specialties: ['Snacks', 'Street Food', 'Fast Food'],
    healthCertification: false,
    lastActive: '5 hours ago',
    activeItems: 6,
    completionRate: 88,
    responseTime: '25 mins',
    monthlyOrders: 22,
    monthlyEarnings: 3200
  },
  {
    id: 'cook-5',
    name: 'Lakshmi Amma',
    email: 'lakshmi.amma@email.com',
    phone: '+91-9876543214',
    location: 'Laxmi Nagar, Delhi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4.6,
    totalOrders: 203,
    totalEarnings: 38700,
    joinedDate: '2023-04-08',
    status: 'verified',
    specialties: ['South Indian', 'Healthy', 'Traditional'],
    healthCertification: true,
    lastActive: '1 day ago',
    activeItems: 10,
    completionRate: 94,
    responseTime: '18 mins',
    monthlyOrders: 32,
    monthlyEarnings: 6400
  },
  {
    id: 'cook-6',
    name: 'Rekha Devi',
    email: 'rekha.devi@email.com',
    phone: '+91-9876543215',
    location: 'Rohini, Delhi',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150',
    rating: 4.4,
    totalOrders: 142,
    totalEarnings: 28900,
    joinedDate: '2023-06-30',
    status: 'suspended',
    specialties: ['Desserts', 'Sweets', 'Mithai'],
    healthCertification: true,
    lastActive: '1 week ago',
    activeItems: 4,
    completionRate: 85,
    responseTime: '35 mins',
    monthlyOrders: 18,
    monthlyEarnings: 2800
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'bg-green-100 text-green-800 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'verified': return <CheckCircle2 className="h-4 w-4" />;
    case 'pending': return <AlertCircle className="h-4 w-4" />;
    case 'suspended': return <XCircle className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

export function CookManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCook, setSelectedCook] = useState<any>(null);

  const filteredCooks = mockCooks.filter(cook => {
    const matchesSearch = 
      cook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cook.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cook.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cook.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || cook.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalCooks: mockCooks.length,
    verifiedCooks: mockCooks.filter(c => c.status === 'verified').length,
    pendingCooks: mockCooks.filter(c => c.status === 'pending').length,
    suspendedCooks: mockCooks.filter(c => c.status === 'suspended').length,
    totalEarnings: mockCooks.reduce((sum, cook) => sum + cook.totalEarnings, 0),
    totalOrders: mockCooks.reduce((sum, cook) => sum + cook.totalOrders, 0),
    avgRating: (mockCooks.reduce((sum, cook) => sum + cook.rating, 0) / mockCooks.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cook Management Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all registered home cooks and kitchen partners
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Total Cooks</p>
                <p className="text-2xl font-bold text-blue-900">{totalStats.totalCooks}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Verified</p>
                <p className="text-2xl font-bold text-green-900">{totalStats.verifiedCooks}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">{totalStats.pendingCooks}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Ban className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">Suspended</p>
                <p className="text-2xl font-bold text-red-900">{totalStats.suspendedCooks}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Total Earnings</p>
                <p className="text-2xl font-bold text-primary">₹{(totalStats.totalEarnings / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700">Total Orders</p>
                <p className="text-2xl font-bold text-purple-900">{totalStats.totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-700">Avg Rating</p>
                <p className="text-2xl font-bold text-orange-900">{totalStats.avgRating}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 bg-gradient-to-br from-card/90 via-accent/20 to-secondary/10 backdrop-blur-sm border-primary/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, email, or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/80 border-border/50 focus:border-primary/50"
            />
          </div>
          
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
              <TabsTrigger value="verified" className="text-sm">Verified</TabsTrigger>
              <TabsTrigger value="pending" className="text-sm">Pending</TabsTrigger>
              <TabsTrigger value="suspended" className="text-sm">Suspended</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {/* Results */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredCooks.length} cook{filteredCooks.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
          {statusFilter !== 'all' && ` with status "${statusFilter}"`}
        </p>
      </div>

      {/* Cook List */}
      <div className="grid gap-4">
        {filteredCooks.map((cook) => (
          <Card key={cook.id} className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card/90 via-card/80 to-accent/10 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cook Info */}
              <div className="flex items-start space-x-4 flex-1">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={cook.avatar} alt={cook.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{cook.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">{cook.name}</h3>
                    <Badge className={`${getStatusColor(cook.status)} flex items-center space-x-1`}>
                      {getStatusIcon(cook.status)}
                      <span className="capitalize">{cook.status}</span>
                    </Badge>
                    {cook.healthCertification && (
                      <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                        <Award className="h-3 w-3 mr-1" />
                        Health Certified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{cook.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{cook.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{cook.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined: {new Date(cook.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cook.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:w-80">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{cook.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Rating</p>
                </div>
                
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <p className="font-semibold text-secondary-foreground">{cook.totalOrders}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-700">₹{(cook.totalEarnings / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground mt-1">Earnings</p>
                </div>
                
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-700">{cook.completionRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Completion</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 lg:w-32">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedCook(cook)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={cook.avatar} alt={cook.name} />
                          <AvatarFallback>{cook.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl">{cook.name}</h2>
                          <p className="text-sm text-muted-foreground">{cook.location}</p>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-6 mt-6">
                      {/* Detailed Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="p-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            </div>
                            <p className="text-2xl font-bold">{cook.rating}</p>
                            <p className="text-sm text-muted-foreground">Overall Rating</p>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Package className="h-5 w-5 text-blue-500" />
                            </div>
                            <p className="text-2xl font-bold">{cook.monthlyOrders}</p>
                            <p className="text-sm text-muted-foreground">This Month</p>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <DollarSign className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="text-2xl font-bold">₹{cook.monthlyEarnings}</p>
                            <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="h-5 w-5 text-purple-500" />
                            </div>
                            <p className="text-2xl font-bold">{cook.responseTime}</p>
                            <p className="text-sm text-muted-foreground">Avg Response</p>
                          </div>
                        </Card>
                      </div>

                      {/* Performance Metrics */}
                      <Card className="p-6">
                        <h3 className="font-semibold mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Completion Rate</span>
                              <span className="text-sm font-medium">{cook.completionRate}%</span>
                            </div>
                            <Progress value={cook.completionRate} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Customer Satisfaction</span>
                              <span className="text-sm font-medium">{((cook.rating / 5) * 100).toFixed(0)}%</span>
                            </div>
                            <Progress value={(cook.rating / 5) * 100} className="h-2" />
                          </div>
                        </div>
                      </Card>

                      {/* Contact & Activity */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                          <h3 className="font-semibold mb-4">Contact Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{cook.email}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{cook.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{cook.location}</span>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-6">
                          <h3 className="font-semibold mb-4">Activity Status</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Last Active:</span>
                              <span className="text-sm font-medium">{cook.lastActive}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Active Items:</span>
                              <span className="text-sm font-medium">{cook.activeItems}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Joined Date:</span>
                              <span className="text-sm font-medium">{new Date(cook.joinedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                
                {cook.status === 'pending' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <UserCheck className="h-4 w-4 mr-1" />
                    Verify
                  </Button>
                )}
                
                {cook.status === 'verified' && (
                  <Button variant="destructive" size="sm">
                    <Ban className="h-4 w-4 mr-1" />
                    Suspend
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCooks.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No cooks found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </Card>
      )}
    </div>
  );
}