import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  Calendar,
  FileText,
  Camera,
  Thermometer,
  Droplets,
  Utensils,
  Home,
  Users,
  Clock,
  Star,
  Verified
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HealthCertification {
  id: string;
  type: 'fssai' | 'health' | 'kitchen' | 'hygiene' | 'training';
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  certificateNumber: string;
  status: 'valid' | 'expiring' | 'expired';
  verificationScore: number;
  details: string;
}

interface CookHealthProfile {
  cookId: string;
  cookName: string;
  cookImage: string;
  overallScore: number;
  lastInspection: string;
  nextInspection: string;
  certifications: HealthCertification[];
  kitchenPhotos: string[];
  healthMetrics: {
    cleanliness: number;
    foodSafety: number;
    hygiene: number;
    storage: number;
    documentation: number;
  };
  ingredientSourcing: {
    organic: boolean;
    local: boolean;
    freshness: string;
    suppliers: string[];
  };
  safetyMeasures: string[];
  recentAudits: Array<{
    date: string;
    auditor: string;
    score: number;
    remarks: string;
  }>;
}

const mockHealthProfile: CookHealthProfile = {
  cookId: 'cook-1',
  cookName: 'Sunita Devi',
  cookImage: 'https://images.unsplash.com/photo-1494790108755-2616c0763c94',
  overallScore: 94,
  lastInspection: '2024-01-15',
  nextInspection: '2024-04-15',
  certifications: [
    {
      id: 'cert-1',
      type: 'fssai',
      name: 'FSSAI Food Safety License',
      issuer: 'Food Safety and Standards Authority of India',
      issueDate: '2023-06-01',
      expiryDate: '2024-06-01',
      certificateNumber: 'FSSAI-DL-2023-001234',
      status: 'valid',
      verificationScore: 98,
      details: 'Basic Food Safety Training and License for Home Food Business'
    },
    {
      id: 'cert-2',
      type: 'health',
      name: 'Health Department Certificate',
      issuer: 'Delhi Health Department',
      issueDate: '2023-12-01',
      expiryDate: '2024-12-01',
      certificateNumber: 'DHD-HC-2023-5678',
      status: 'valid',
      verificationScore: 96,
      details: 'Personal Health and Medical Fitness Certificate'
    },
    {
      id: 'cert-3',
      type: 'kitchen',
      name: 'Kitchen Safety Audit',
      issuer: 'Gharse Quality Assurance',
      issueDate: '2024-01-15',
      expiryDate: '2024-07-15',
      certificateNumber: 'GQA-KS-2024-9012',
      status: 'valid',
      verificationScore: 92,
      details: 'Kitchen Infrastructure and Safety Equipment Verification'
    },
    {
      id: 'cert-4',
      type: 'hygiene',
      name: 'Food Hygiene Training',
      issuer: 'National Institute of Food Technology',
      issueDate: '2023-09-15',
      expiryDate: '2025-09-15',
      certificateNumber: 'NIFT-FH-2023-3456',
      status: 'valid',
      verificationScore: 89,
      details: 'Advanced Food Hygiene and Safety Practices Training'
    }
  ],
  kitchenPhotos: [
    'https://images.unsplash.com/photo-1596522868222-0df01d62b628',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
    'https://images.unsplash.com/photo-1574484284002-952d92456975'
  ],
  healthMetrics: {
    cleanliness: 96,
    foodSafety: 94,
    hygiene: 92,
    storage: 90,
    documentation: 88
  },
  ingredientSourcing: {
    organic: true,
    local: true,
    freshness: 'Daily sourced from local vendors',
    suppliers: ['Azadpur Mandi', 'Local Organic Farm', 'Mother Dairy']
  },
  safetyMeasures: [
    'Temperature monitoring for storage',
    'Hand sanitization before cooking',
    'Separate cutting boards for vegetables and meat',
    'Daily kitchen deep cleaning',
    'Ingredient freshness verification',
    'Proper waste segregation',
    'Regular health check-ups'
  ],
  recentAudits: [
    {
      date: '2024-01-15',
      auditor: 'Gharse Quality Team',
      score: 94,
      remarks: 'Excellent kitchen hygiene and food safety practices'
    },
    {
      date: '2023-10-15',
      auditor: 'Health Department Inspector',
      score: 92,
      remarks: 'Very good compliance with health guidelines'
    }
  ]
};

interface HealthCertificationProps {
  cookId?: string;
  compact?: boolean;
}

export function HealthCertification({ cookId, compact = false }: HealthCertificationProps) {
  const [showFullCertification, setShowFullCertification] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<HealthCertification | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const healthProfile = mockHealthProfile; // In real app, fetch by cookId

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-500';
      case 'expiring': return 'bg-yellow-500';
      case 'expired': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCertificationIcon = (type: string) => {
    switch (type) {
      case 'fssai': return FileText;
      case 'health': return Shield;
      case 'kitchen': return Home;
      case 'hygiene': return Droplets;
      case 'training': return Award;
      default: return FileText;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full border border-green-200">
          <Shield className="h-3 w-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">Certified Safe</span>
          <Badge className="bg-green-500 text-white text-xs px-1 py-0 h-4">
            {healthProfile.overallScore}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Health & Safety Certification</h3>
          <p className="text-muted-foreground">Comprehensive health and safety verification for {healthProfile.cookName}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{healthProfile.overallScore}/100</div>
          <p className="text-sm text-muted-foreground">Overall Score</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-accent/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certificates</TabsTrigger>
          <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall Score Card */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-green-800">Verified Safe Kitchen</h4>
                  <p className="text-green-700">All health and safety standards met with regular monitoring</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-green-600">Last Inspection: {healthProfile.lastInspection}</span>
                    <span className="text-sm text-green-600">Next Inspection: {healthProfile.nextInspection}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h4 className="font-semibold">Health & Safety Metrics</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(healthProfile.healthMetrics).map(([metric, score]) => (
                <div key={metric}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthProfile.certifications.slice(0, 4).map((cert) => {
              const Icon = getCertificationIcon(cert.type);
              return (
                <Card key={cert.id} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{cert.name}</h5>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Badge className={`${getCertificationStatusColor(cert.status)} text-white`}>
                        {cert.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {healthProfile.certifications.map((cert) => {
              const Icon = getCertificationIcon(cert.type);
              return (
                <Card key={cert.id} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-sm text-muted-foreground mt-1">{cert.details}</p>
                        </div>
                      </div>
                      <Badge className={`${getCertificationStatusColor(cert.status)} text-white`}>
                        {cert.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Certificate No.</p>
                        <p className="font-medium">{cert.certificateNumber}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issue Date</p>
                        <p className="font-medium">{cert.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiry Date</p>
                        <p className="font-medium">{cert.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Verification Score</p>
                        <p className="font-medium text-green-600">{cert.verificationScore}%</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="kitchen" className="space-y-6">
          {/* Kitchen Photos */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h4 className="font-semibold">Kitchen Infrastructure</h4>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {healthProfile.kitchenPhotos.map((photo, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={photo}
                      alt={`Kitchen view ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Measures */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h4 className="font-semibold">Safety Measures & Protocols</h4>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthProfile.safetyMeasures.map((measure, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-accent/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{measure}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingredients" className="space-y-6">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h4 className="font-semibold">Ingredient Sourcing & Quality</h4>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium">Source Quality</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Organic Ingredients</span>
                      <Badge className={healthProfile.ingredientSourcing.organic ? 'bg-green-500' : 'bg-gray-500'}>
                        {healthProfile.ingredientSourcing.organic ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Local Sourcing</span>
                      <Badge className={healthProfile.ingredientSourcing.local ? 'bg-green-500' : 'bg-gray-500'}>
                        {healthProfile.ingredientSourcing.local ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Freshness Policy</span>
                      <p className="text-sm">{healthProfile.ingredientSourcing.freshness}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium">Suppliers</h5>
                  <div className="space-y-2">
                    {healthProfile.ingredientSourcing.suppliers.map((supplier, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-accent/30 rounded">
                        <Verified className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{supplier}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          {healthProfile.recentAudits.map((audit, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">Audit Report</h4>
                    <p className="text-sm text-muted-foreground">Conducted by {audit.auditor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{audit.score}/100</div>
                    <p className="text-sm text-muted-foreground">{audit.date}</p>
                  </div>
                </div>
                <p className="text-sm bg-accent/30 p-3 rounded-lg">{audit.remarks}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Certificate Details</DialogTitle>
              <DialogDescription>
                {selectedCertificate.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center p-6 bg-accent/30 rounded-lg">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold">{selectedCertificate.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedCertificate.issuer}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Certificate Number</span>
                  <span className="font-mono">{selectedCertificate.certificateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issue Date</span>
                  <span>{selectedCertificate.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expiry Date</span>
                  <span>{selectedCertificate.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verification Score</span>
                  <span className="font-semibold text-green-600">{selectedCertificate.verificationScore}%</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground bg-accent/20 p-3 rounded">
                {selectedCertificate.details}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}