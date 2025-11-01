import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Gift, Percent, Clock, Users } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: "First Order Special",
    description: "Get 30% off on your first order from any home cook",
    discount: "30% OFF",
    code: "WELCOME30",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
    validUntil: "Valid till Dec 31",
    minOrder: "Min order ₹200",
    icon: Gift,
    color: "bg-gradient-to-r from-primary to-secondary"
  },
  {
    id: 2,
    title: "Weekend Family Feast",
    description: "Special discount on family thali orders this weekend",
    discount: "25% OFF",
    code: "FAMILY25",
    image: "https://images.unsplash.com/photo-1742281258189-3b933879867a",
    validUntil: "Weekend Only",
    minOrder: "Min order ₹500",
    icon: Users,
    color: "bg-gradient-to-r from-accent-foreground to-primary"
  },
  {
    id: 3,
    title: "Quick Bite Deals",
    description: "Fast delivery snacks at unbeatable prices",
    discount: "₹50 OFF",
    code: "QUICK50",
    image: "https://images.unsplash.com/photo-1743517894265-c86ab035adef",
    validUntil: "Today Only",
    minOrder: "Min order ₹150",
    icon: Clock,
    color: "bg-gradient-to-r from-secondary-foreground to-primary"
  },
  {
    id: 4,
    title: "Sweet Endings",
    description: "Special offers on homemade desserts and sweets",
    discount: "20% OFF",
    code: "SWEET20",
    image: "https://images.unsplash.com/photo-1728910869936-f0ca79a4342d",
    validUntil: "Valid till month end",
    minOrder: "Min order ₹100",
    icon: Percent,
    color: "bg-gradient-to-r from-primary to-accent-foreground"
  }
];

interface PromoSectionProps {
  onApplyPromo?: (code: string) => void;
}

export function PromoSection({ onApplyPromo }: PromoSectionProps) {
  return (
    <Card className="mb-8 overflow-hidden bg-gradient-to-br from-accent/30 to-secondary/20 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">🎉 Special Offers</h3>
            <p className="text-sm text-muted-foreground">Save more on your favorite home-cooked meals</p>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground/80">
            Limited Time
          </Badge>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {promotions.map((promo) => {
              const Icon = promo.icon;
              return (
                <CarouselItem key={promo.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative h-32">
                      <ImageWithFallback
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 ${promo.color} opacity-90`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Icon className="h-8 w-8 mx-auto mb-2" />
                          <div className="text-2xl font-bold">{promo.discount}</div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1">{promo.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{promo.description}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{promo.validUntil}</span>
                          <span>{promo.minOrder}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <code className="bg-accent px-2 py-1 rounded text-xs font-mono text-accent-foreground">
                            {promo.code}
                          </code>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onApplyPromo?.(promo.code)}
                            className="text-xs"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
}