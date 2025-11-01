import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign, 
  ShoppingBag, 
  Star, 
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data for cook's food items
const mockCookFoodItems = [
  {
    id: 1,
    name: "Homestyle Rajma Chawal",
    description: "Authentic rajma curry with basmati rice",
    price: 120,
    image: "https://images.unsplash.com/photo-1666251214795-a1296307d29c",
    category: "Main Course",
    isAvailable: true,
    preparationTime: "30-45 mins",
    orders: 45,
    rating: 4.8
  },
  {
    id: 2,
    name: "Aloo Paratha with Curd",
    description: "Stuffed potato paratha with fresh curd and pickle",
    price: 80,
    image: "https://images.unsplash.com/photo-1666251214795-a1296307d29c",
    category: "Breakfast",
    isAvailable: true,
    preparationTime: "20-30 mins",
    orders: 32,
    rating: 4.6
  }
];

import { AppContext } from '../App';

export function CookDashboard() {
  const { orders, setOrders } = useContext(AppContext);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    preparationTime: '',
    image: ''
  });

  const handleAddItem = () => {
    // Mock add item logic
    alert('Food item added successfully!');
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: '',
      preparationTime: '',
      image: ''
    });
    setShowAddItemModal(false);
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order #${orderId} status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      case 'ready':
        return <Package className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cook Dashboard</h1>
          <p className="text-muted-foreground">Manage your food items and orders</p>
        </div>
        <Button onClick={() => setShowAddItemModal(true)} className="bg-primary hover:bg-primary/90 shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New Food Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl font-bold">₹1,240</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Items</p>
                <p className="text-2xl font-bold">{mockCookFoodItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Orders</TabsTrigger>
          <TabsTrigger value="food-items" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Food Items</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Analytics</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          
          <div className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No orders yet. Orders will appear here when customers place them.</p>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} • {order.orderTime}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Items:</strong> {order.items.join(', ')}</p>
                    <p className="text-sm"><strong>Total:</strong> ₹{order.total}</p>
                    <p className="text-sm"><strong>Address:</strong> {order.deliveryAddress}</p>
                    <p className="text-sm"><strong>Phone:</strong> {order.phone}</p>
                  </div>

                  <div className="flex space-x-2">
                    {order.status === 'preparing' && (
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                      >
                        Mark Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                      >
                        Mark Completed
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
            )}
          </div>
        </TabsContent>

        {/* Food Items Tab */}
        <TabsContent value="food-items" className="space-y-4">
          <h2 className="text-xl font-semibold">Your Food Items</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCookFoodItems.map((item) => (
              <Card key={item.id}>
                <div className="relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      item.isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium">₹{item.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{item.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prep Time:</span>
                      <span>{item.preparationTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orders:</span>
                      <span>{item.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-xl font-semibold">Analytics & Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Orders:</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="font-medium">₹8,760</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Order Value:</span>
                    <span className="font-medium">₹98</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Rating:</span>
                    <span className="font-medium">4.7 ⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Homestyle Rajma Chawal</span>
                    <Badge variant="secondary">45 orders</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Aloo Paratha</span>
                    <Badge variant="secondary">32 orders</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Dal Tadka</span>
                    <Badge variant="secondary">28 orders</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Item Modal */}
      <Dialog open={showAddItemModal} onOpenChange={setShowAddItemModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Food Item</DialogTitle>
            <DialogDescription>
              Create a new food item to add to your menu. Fill in all the details to help customers discover your delicious offerings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Food Name</Label>
              <Input
                id="item-name"
                placeholder="e.g., Homestyle Rajma Chawal"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-description">Description</Label>
              <Textarea
                id="item-description"
                placeholder="Describe your food item..."
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-price">Price (₹)</Label>
                <Input
                  id="item-price"
                  type="number"
                  placeholder="120"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prep-time">Preparation Time</Label>
              <Input
                id="prep-time"
                placeholder="e.g., 30-45 mins"
                value={newItem.preparationTime}
                onChange={(e) => setNewItem({ ...newItem, preparationTime: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddItem} className="flex-1 bg-primary hover:bg-primary/90">
                Add Item
              </Button>
              <Button variant="outline" onClick={() => setShowAddItemModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}