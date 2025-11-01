import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardHeader, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "Priya Sharma",
    rating: 5,
    comment: "Absolutely loved the rajma chawal from Sunita Aunty! It tasted just like home-cooked food. Will definitely order again.",
    food: "Homestyle Rajma Chawal",
    cook: "Sunita Devi",
    date: "2 days ago",
    helpful: 12
  },
  {
    id: 2,
    user: "Rahul Kumar",
    rating: 4,
    comment: "The biryani was fantastic! Perfectly spiced and the mutton was tender. Only complaint is it took a bit longer than expected.",
    food: "Special Mutton Biryani",
    cook: "Rashid Khan",
    date: "5 days ago",
    helpful: 8
  },
  {
    id: 3,
    user: "Anita Patel",
    rating: 5,
    comment: "Amazing Gujarati thali! All items were fresh and authentic. Meera Ben really knows her cooking. Worth every rupee!",
    food: "Complete Gujarati Thali",
    cook: "Meera Patel",
    date: "1 week ago",
    helpful: 15
  },
  {
    id: 4,
    user: "Vikash Singh",
    rating: 4,
    comment: "Good samosas, crispy and hot. The mint chutney was excellent. Quick delivery too!",
    food: "Crispy Samosa",
    cook: "Raju Bhai",
    date: "1 week ago",
    helpful: 6
  }
];

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    food: '',
    cook: ''
  });
  const [showAddReview, setShowAddReview] = useState(false);

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = () => {
    // Mock review submission
    alert('Thank you for your review! It helps other customers make better choices.');
    setNewReview({ rating: 0, comment: '', food: '', cook: '' });
    setShowAddReview(false);
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Customer Reviews & Feedback
          </DialogTitle>
          <DialogDescription>
            Read customer reviews and share your own experience to help others discover great home-cooked meals.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Review Section */}
          <div className="space-y-4">
            {!showAddReview ? (
              <Button 
                onClick={() => setShowAddReview(true)}
                className="w-full"
                variant="outline"
              >
                <Star className="h-4 w-4 mr-2" />
                Write a Review
              </Button>
            ) : (
              <Card>
                <CardHeader>
                  <h3 className="font-medium">Share Your Experience</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="food-item">Food Item</Label>
                      <Input
                        id="food-item"
                        placeholder="e.g., Homestyle Rajma Chawal"
                        value={newReview.food}
                        onChange={(e) => setNewReview({ ...newReview, food: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cook-name">Cook Name</Label>
                      <Input
                        id="cook-name"
                        placeholder="e.g., Sunita Devi"
                        value={newReview.cook}
                        onChange={(e) => setNewReview({ ...newReview, cook: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex items-center gap-2">
                      {renderStars(newReview.rating, true, handleStarClick)}
                      <span className="text-sm text-muted-foreground">
                        {newReview.rating > 0 && `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-comment">Your Review</Label>
                    <Textarea
                      id="review-comment"
                      placeholder="Share your experience with this food item..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitReview}
                      disabled={!newReview.rating || !newReview.comment || !newReview.food || !newReview.cook}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Submit Review
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddReview(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <h3 className="font-medium">Recent Reviews</h3>
            
            {mockReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{review.user}</h4>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {review.food}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            by {review.cook}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">4.6</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm text-muted-foreground">Total Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-muted-foreground">Positive Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Active Cooks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}