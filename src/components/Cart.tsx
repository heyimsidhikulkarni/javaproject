import React, { useContext } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { AppContext } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { cart, setCart } = useContext(AppContext);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 200 ? 0 : 30;
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.05); // 5% tax
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax();
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </SheetTitle>
            <SheetDescription>
              Your shopping cart is currently empty. Browse our delicious home-cooked meals to get started.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add some delicious food to get started!</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({getTotalItems()} items)
          </SheetTitle>
          <SheetDescription>
            Review your selected items and proceed to checkout when ready.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">by {item.cook}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{getSubtotal()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span className="flex items-center gap-2">
                {getDeliveryFee() === 0 ? (
                  <>
                    <span className="line-through text-muted-foreground">₹30</span>
                    <Badge variant="secondary" className="text-xs">FREE</Badge>
                  </>
                ) : (
                  `₹${getDeliveryFee()}`
                )}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Tax (5%)</span>
              <span>₹{getTax()}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>

          {getSubtotal() < 200 && (
            <div className="p-3 bg-accent rounded-lg">
              <p className="text-sm">
                Add ₹{200 - getSubtotal()} more to get free delivery!
              </p>
            </div>
          )}

          <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg" size="lg" onClick={onCheckout}>
            Proceed to Checkout - ₹{getTotal()}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}