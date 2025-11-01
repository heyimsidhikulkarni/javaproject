import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CreditCard, Wallet, Building, MapPin, User, Phone } from 'lucide-react';
import { AppContext } from '../App';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  const { cart, user, orders, setOrders } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 200 ? 0 : 30;
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.05);
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax();
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Create new order
    const newOrder = {
      id: Date.now(),
      customerName: user?.name || 'Guest User',
      items: cart.map(item => `${item.name} x${item.quantity}`),
      total: getTotal(),
      status: 'preparing',
      orderTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      deliveryAddress: deliveryAddress,
      phone: phoneNumber,
      paymentMethod: paymentMethod
    };
    
    // Simulate payment processing
    setTimeout(() => {
      setOrders([newOrder, ...orders]);
      setProcessing(false);
      onPaymentComplete();
      alert('Order placed successfully! You will receive a confirmation SMS shortly.');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Please review your order details and provide delivery information to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto flex-1 pr-2 -mr-2">
          {/* Delivery Details */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Delivery Details
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                placeholder="Enter your full delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-medium">Order Summary</h3>
            
            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{getDeliveryFee()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{getTax()}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-medium">Payment Method</h3>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                  <Wallet className="h-4 w-4" />
                  UPI Payment
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                  <Building className="h-4 w-4" />
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="Enter name as on card"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="p-3 bg-accent rounded-lg text-sm">
              <p>Please keep exact change ready. Our delivery partner will collect ₹{getTotal()} at the time of delivery.</p>
            </div>
          )}

        </div>
        
        <div className="flex gap-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handlePayment} 
            disabled={processing || !deliveryAddress || !phoneNumber}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {processing ? 'Processing...' : `Pay ₹${getTotal()}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}