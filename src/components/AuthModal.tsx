import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, ChefHat, Mail, Lock, Phone, MapPin } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
  userType: 'customer' | 'cook';
  onLogin: (email: string, password: string) => void;
  onRegister: (formData: any) => void;
  onSwitchType: (type: 'login' | 'register') => void;
  onSwitchUserType: (type: 'customer' | 'cook') => void;
}

export function AuthModal({
  isOpen,
  onClose,
  type,
  userType,
  onLogin,
  onRegister,
  onSwitchType,
  onSwitchUserType
}: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    speciality: '',
    experience: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'login') {
      onLogin(formData.email, formData.password);
    } else {
      onRegister(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            {userType === 'customer' ? <User className="h-5 w-5" /> : <ChefHat className="h-5 w-5" />}
            {type === 'login' ? 'Sign In' : 'Sign Up'} as {userType === 'customer' ? 'Customer' : 'Home Cook'}
          </DialogTitle>
          <DialogDescription>
            {type === 'login' 
              ? 'Welcome back! Please sign in to your account.'
              : 'Join our community and start your culinary journey with us.'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={userType} onValueChange={onSwitchUserType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger value="customer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Customer</TabsTrigger>
            <TabsTrigger value="cook" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Home Cook</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              {type === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="Enter your delivery address"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {type === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="cook" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="cook-name">Full Name / Business Name</Label>
                  <Input
                    id="cook-name"
                    type="text"
                    placeholder="Enter your name or business name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="cook-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cook-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cook-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cook-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              {type === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cook-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cook-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cook-address">Kitchen Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cook-address"
                        type="text"
                        placeholder="Enter your kitchen address"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="speciality">Cooking Speciality</Label>
                    <Input
                      id="speciality"
                      type="text"
                      placeholder="e.g., North Indian, South Indian, Chinese"
                      value={formData.speciality}
                      onChange={(e) => handleInputChange('speciality', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Cooking Experience</Label>
                    <Input
                      id="experience"
                      type="text"
                      placeholder="e.g., 5 years home cooking, Professional chef"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {type === 'login' ? 'Sign In' : 'Register as Home Cook'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => onSwitchType(type === 'login' ? 'register' : 'login')}
          >
            {type === 'login' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}