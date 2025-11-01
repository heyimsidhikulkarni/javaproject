import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Clock, MapPin, Phone, MessageCircle, CheckCircle, Truck, ChefHat, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Order {
  id: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  cook: {
    name: string;
    image: string;
    phone: string;
    location: string;
  };
  total: number;
  estimatedTime: string;
  orderTime: string;
  deliveryAddress: string;
  trackingSteps: Array<{
    status: string;
    time: string;
    completed: boolean;
    description: string;
  }>;
}

const mockOrders: Order[] = [
  {
    id: 'GH001',
    status: 'preparing',
    items: [
      { name: 'Rajma Chawal', quantity: 2, price: 120, image: 'https://images.unsplash.com/photo-1666251214795-a1296307d29c' },
      { name: 'Samosa', quantity: 4, price: 60, image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a' }
    ],
    cook: {
      name: 'Sunita Devi',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c94',
      phone: '+91 98765 43210',
      location: 'Lajpat Nagar, Delhi'
    },
    total: 300,
    estimatedTime: '25 mins',
    orderTime: '2:30 PM',
    deliveryAddress: 'A-101, Green Park, New Delhi',
    trackingSteps: [
      { status: 'confirmed', time: '2:30 PM', completed: true, description: 'Order confirmed by Sunita Aunty' },
      { status: 'preparing', time: '2:35 PM', completed: true, description: 'Cooking started in the kitchen' },
      { status: 'ready', time: '2:55 PM', completed: false, description: 'Food ready for pickup' },
      { status: 'picked-up', time: '3:00 PM', completed: false, description: 'Picked up by delivery partner' },
      { status: 'delivered', time: '3:15 PM', completed: false, description: 'Delivered to your doorstep' }
    ]
  }
];

const statusConfig = {
  confirmed: { color: 'bg-blue-500', text: 'Order Confirmed', progress: 20 },
  preparing: { color: 'bg-orange-500', text: 'Being Prepared', progress: 40 },
  ready: { color: 'bg-yellow-500', text: 'Ready for Pickup', progress: 60 },
  'picked-up': { color: 'bg-purple-500', text: 'Out for Delivery', progress: 80 },
  delivered: { color: 'bg-green-500', text: 'Delivered', progress: 100 }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed': return CheckCircle;
    case 'preparing': return ChefHat;
    case 'ready': return Clock;
    case 'picked-up': return Truck;
    case 'delivered': return CheckCircle;
    default: return Clock;
  }
};

export function OrderTracking() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (orders.length === 0) {
    return (
      <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-border/50">
        <div className="text-muted-foreground">
          <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Active Orders</h3>
          <p>Your order history will appear here once you place an order.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Truck className="h-5 w-5 mr-2" />
        Track Your Orders
      </h3>
      
      {orders.map((order) => {
        const statusInfo = statusConfig[order.status];
        const StatusIcon = getStatusIcon(order.status);
        
        return (
          <Card key={order.id} className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Order #{order.id}</h4>
                  <p className="text-sm text-muted-foreground">Ordered at {order.orderTime}</p>
                </div>
                <Badge className={`${statusInfo.color} text-white`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.text}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Order Progress</span>
                  <span>ETA: {order.estimatedTime}</span>
                </div>
                <Progress value={statusInfo.progress} className="h-2" />
              </div>

              {/* Cook Info */}
              <div className="flex items-center space-x-3 p-3 bg-accent/30 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={order.cook.image} />
                  <AvatarFallback>{order.cook.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{order.cook.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {order.cook.location}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Items ({order.items.length})</p>
                <div className="flex space-x-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex-1">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-16 object-cover rounded"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex-1 bg-accent/50 rounded flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">+{order.items.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex-1" onClick={() => setSelectedOrder(order)}>
                      View Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] bg-background">
                    <SheetHeader>
                      <SheetTitle>Order #{order.id}</SheetTitle>
                      <SheetDescription>
                        Track your order status and get delivery updates
                      </SheetDescription>
                    </SheetHeader>
                    
                    {selectedOrder && (
                      <div className="mt-6 space-y-6">
                        {/* Detailed Progress */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Order Timeline</h4>
                          {selectedOrder.trackingSteps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
                              }`}>
                                {step.completed ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {step.description}
                                </p>
                                <p className="text-xs text-muted-foreground">{step.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        {/* Order Details */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Order Details</h4>
                          {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">₹{item.price}</p>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{selectedOrder.total}</span>
                          </div>
                        </div>

                        <Separator />

                        {/* Delivery Address */}
                        <div className="space-y-2">
                          <h4 className="font-medium">Delivery Address</h4>
                          <p className="text-sm text-muted-foreground flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            {selectedOrder.deliveryAddress}
                          </p>
                        </div>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
                
                {order.status === 'delivered' && (
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Rate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}