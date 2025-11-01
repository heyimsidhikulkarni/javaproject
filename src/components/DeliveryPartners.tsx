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
import { Bike, MapPin, Star, Clock, Phone, Mail, Calendar, Award, TrendingUp, Users, Plus, Filter, Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DeliveryPartner {
  id: string;
  name: string;
  image: string;
  phone: string;
  email: string;
  rating: number;
  totalDeliveries: number;
  joinDate: string;
  status: 'active' | 'offline' | 'busy';
  vehicleType: string;
  location: string;
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  completionRate: number;
  averageTime: string;
  specializations: string[];
}

const mockDeliveryPartners: DeliveryPartner[] = [
  {
    id: 'dp-1',
    name: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    rating: 4.8,
    totalDeliveries: 1250,
    joinDate: '2023-06-15',
    status: 'active',
    vehicleType: 'Motorcycle',
    location: 'Central Delhi',
    earnings: { today: 680, thisWeek: 4200, thisMonth: 18500 },
    completionRate: 98.5,
    averageTime: '22 mins',
    specializations: ['Fast Delivery', 'Long Distance']
  },
  {
    id: 'dp-2',
    name: 'Amit Singh',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    phone: '+91 87654 32109',
    email: 'amit.singh@email.com',
    rating: 4.9,
    totalDeliveries: 980,
    joinDate: '2023-08-20',
    status: 'active',
    vehicleType: 'Scooter',
    location: 'South Delhi',
    earnings: { today: 520, thisWeek: 3800, thisMonth: 16200 },
    completionRate: 99.2,
    averageTime: '18 mins',
    specializations: ['City Center', 'Quick Delivery']
  },
  {
    id: 'dp-3',
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c94',
    phone: '+91 76543 21098',
    email: 'priya.sharma@email.com',
    rating: 4.7,
    totalDeliveries: 756,
    joinDate: '2023-09-10',
    status: 'busy',
    vehicleType: 'Electric Scooter',
    location: 'North Delhi',
    earnings: { today: 450, thisWeek: 3200, thisMonth: 14800 },
    completionRate: 97.8,
    averageTime: '25 mins',
    specializations: ['Eco-Friendly', 'Evening Shift']
  }
];

interface JobApplication {
  name: string;
  phone: string;
  email: string;
  address: string;
  vehicleType: string;
  licenseNumber: string;
  experience: string;
  availability: string[];
  preferredAreas: string[];
  hasSmartphone: boolean;
  hasGPS: boolean;
  emergencyContact: string;
  reason: string;
}

export function DeliveryPartners() {
  const [activeTab, setActiveTab] = useState('partners');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState<DeliveryPartner | null>(null);
  
  const [applicationData, setApplicationData] = useState<JobApplication>({
    name: '',
    phone: '',
    email: '',
    address: '',
    vehicleType: '',
    licenseNumber: '',
    experience: '',
    availability: [],
    preferredAreas: [],
    hasSmartphone: false,
    hasGPS: false,
    emergencyContact: '',
    reason: ''
  });

  const filteredPartners = mockDeliveryPartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationData);
    setShowApplicationModal(false);
    // Reset form
    setApplicationData({
      name: '', phone: '', email: '', address: '', vehicleType: '', licenseNumber: '',
      experience: '', availability: [], preferredAreas: [], hasSmartphone: false,
      hasGPS: false, emergencyContact: '', reason: ''
    });
  };

  const updateApplicationData = (field: string, value: any) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAvailability = (day: string) => {
    const current = applicationData.availability;
    if (current.includes(day)) {
      updateApplicationData('availability', current.filter(d => d !== day));
    } else {
      updateApplicationData('availability', [...current, day]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Delivery Partners</h2>
          <p className="text-muted-foreground">Manage delivery partners and job applications</p>
        </div>
        <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Join as Delivery Partner</DialogTitle>
              <DialogDescription>
                Fill out the application form to start your journey with Gharse
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={applicationData.name}
                    onChange={(e) => updateApplicationData('name', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Phone Number"
                    value={applicationData.phone}
                    onChange={(e) => updateApplicationData('phone', e.target.value)}
                    required
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => updateApplicationData('email', e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Complete Address"
                  value={applicationData.address}
                  onChange={(e) => updateApplicationData('address', e.target.value)}
                  required
                />
              </div>

              <Separator />

              {/* Vehicle Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Vehicle Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={applicationData.vehicleType} onValueChange={(value) => updateApplicationData('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="scooter">Scooter</SelectItem>
                      <SelectItem value="bicycle">Bicycle</SelectItem>
                      <SelectItem value="electric-scooter">Electric Scooter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="License Number"
                    value={applicationData.licenseNumber}
                    onChange={(e) => updateApplicationData('licenseNumber', e.target.value)}
                    required
                  />
                </div>
                <Input
                  placeholder="Years of Driving Experience"
                  value={applicationData.experience}
                  onChange={(e) => updateApplicationData('experience', e.target.value)}
                  required
                />
              </div>

              <Separator />

              {/* Availability */}
              <div className="space-y-4">
                <h4 className="font-medium">Availability</h4>
                <div className="grid grid-cols-4 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        checked={applicationData.availability.includes(day)}
                        onCheckedChange={() => toggleAvailability(day)}
                      />
                      <label className="text-sm">{day.slice(0, 3)}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Equipment */}
              <div className="space-y-4">
                <h4 className="font-medium">Equipment & Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={applicationData.hasSmartphone}
                      onCheckedChange={(checked) => updateApplicationData('hasSmartphone', checked)}
                    />
                    <label className="text-sm">I have a smartphone with internet connection</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={applicationData.hasGPS}
                      onCheckedChange={(checked) => updateApplicationData('hasGPS', checked)}
                    />
                    <label className="text-sm">I have GPS navigation capability</label>
                  </div>
                </div>
                <Input
                  placeholder="Emergency Contact Number"
                  value={applicationData.emergencyContact}
                  onChange={(e) => updateApplicationData('emergencyContact', e.target.value)}
                  required
                />
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Why do you want to join Gharse?</h4>
                <Textarea
                  placeholder="Tell us about your motivation to join our delivery team..."
                  value={applicationData.reason}
                  onChange={(e) => updateApplicationData('reason', e.target.value)}
                  required
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  Submit Application
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowApplicationModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-accent/50">
          <TabsTrigger value="partners">Active Partners</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={partner.image} />
                      <AvatarFallback>{partner.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">{partner.location}</p>
                      <Badge className={`${getStatusColor(partner.status)} text-white text-xs`}>
                        {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {partner.rating}
                      </span>
                      <span>{partner.totalDeliveries} deliveries</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Avg: {partner.averageTime}
                      </span>
                      <span>{partner.completionRate}% completion</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <Bike className="h-3 w-3 mr-1" />
                        {partner.vehicleType}
                      </span>
                      <span className="text-green-600">₹{partner.earnings.today} today</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {partner.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => setSelectedPartner(partner)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Partners</p>
                    <p className="text-2xl font-bold">{mockDeliveryPartners.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-100 to-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Now</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockDeliveryPartners.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                  <Bike className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-100 to-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(mockDeliveryPartners.reduce((sum, p) => sum + p.rating, 0) / mockDeliveryPartners.length).toFixed(1)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{mockDeliveryPartners.reduce((sum, p) => sum + p.earnings.thisMonth, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h3 className="font-semibold">Performance Overview</h3>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-accent/50 to-secondary/30 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Performance charts and analytics</p>
                  <p className="text-sm">will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h3 className="font-semibold">Recent Applications</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h4 className="font-medium mb-2">No applications yet</h4>
                <p className="text-sm">Job applications will appear here for review</p>
                <Button className="mt-4" onClick={() => setShowApplicationModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Partner Details Modal */}
      {selectedPartner && (
        <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Partner Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedPartner.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedPartner.image} />
                  <AvatarFallback>{selectedPartner.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedPartner.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedPartner.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedPartner.phone}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Deliveries</span>
                  <span className="font-medium">{selectedPartner.totalDeliveries}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-medium">{selectedPartner.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month Earnings</span>
                  <span className="font-medium text-green-600">₹{selectedPartner.earnings.thisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since</span>
                  <span className="font-medium">{new Date(selectedPartner.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}