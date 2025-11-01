import React, {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  ShoppingCart,
  User,
  ChefHat,
  Star,
  Heart,
  MapPin,
  Clock,
  Search,
  Package,
  Menu,
  Truck,
  Navigation,
  Users,
  Crown,
} from "lucide-react";
import { AuthModal } from "./components/AuthModal";
import { Cart } from "./components/Cart";
import { CookDashboard } from "./components/CookDashboard";
import { PaymentModal } from "./components/PaymentModal";
import { FeedbackModal } from "./components/FeedbackModal";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { PromoSection } from "./components/PromoSection";
import { OrderTracking } from "./components/OrderTracking";
import { CookProfile } from "./components/CookProfile";
import { LocationService } from "./components/LocationService";
import { DeliveryPartners } from "./components/DeliveryPartners";
import { MembershipService } from "./components/MembershipService";
import { HealthCertification } from "./components/HealthCertification";
import { CookManagement } from "./components/CookManagement";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import logoImage from "figma:asset/3dd8b071494fbd3bc0ed5be0ada47e68eb86018e.png";

// Context for managing app state
const AppContext = createContext<any>(null);

// Enhanced mock data for food items with more variety
const mockFoodItems = [
  {
    id: 1,
    name: "Homestyle Rajma Chawal",
    description:
      "Authentic rajma curry with basmati rice, made with love by Sunita Aunty",
    price: 120,
    image:
      "https://images.pexels.com/photos/12737912/pexels-photo-12737912.jpeg",
    cook: "Sunita Devi",
    cookId: "cook-1",
    location: "Lajpat Nagar, Delhi",
    rating: 4.8,
    time: "30-45 mins",
    tags: ["Vegetarian", "Homemade", "North Indian"],
    category: "north-indian",
    dietary: ["Vegetarian"],
  },
  {
    id: 2,
    name: "Special Mutton Biryani",
    description:
      "Aromatic biryani with tender mutton pieces, prepared by Chef Rashid",
    price: 250,
    image:
      "https://images.pexels.com/photos/9609863/pexels-photo-9609863.jpeg",
    cook: "Rashid Khan",
    cookId: "cook-2",
    location: "Old Delhi",
    rating: 4.9,
    time: "45-60 mins",
    tags: ["Non-Vegetarian", "Biryani", "Mughlai"],
    category: "biryani",
    dietary: ["Non-Vegetarian"],
  },
  {
    id: 3,
    name: "Complete Gujarati Thali",
    description:
      "Traditional thali with dal, sabzi, roti, rice, and sweets by Meera Ben",
    price: 180,
    image:
      "https://images.pexels.com/photos/7804406/pexels-photo-7804406.jpeg",
    cook: "Meera Patel",
    cookId: "cook-3",
    location: "Karol Bagh, Delhi",
    rating: 4.7,
    time: "25-40 mins",
    tags: ["Vegetarian", "Thali", "Gujarati"],
    category: "thali",
    dietary: ["Vegetarian"],
  },
  {
    id: 4,
    name: "Crispy Samosa (6 pieces)",
    description:
      "Fresh hot samosas with mint chutney, perfect evening snack",
    price: 60,
    image:
      "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg",
    cook: "Raju Bhai",
    cookId: "cook-4",
    location: "Connaught Place, Delhi",
    rating: 4.5,
    time: "15-25 mins",
    tags: ["Vegetarian", "Snacks", "Street Food"],
    category: "snacks",
    dietary: ["Vegetarian"],
  },
  {
    id: 5,
    name: "South Indian Dosa Combo",
    description:
      "Crispy dosa with sambar, coconut chutney, and potato curry",
    price: 95,
    image:
      "https://images.pexels.com/photos/20422129/pexels-photo-20422129.jpeg",
    cook: "Lakshmi Amma",
    cookId: "cook-5",
    location: "Laxmi Nagar, Delhi",
    rating: 4.6,
    time: "20-30 mins",
    tags: ["Vegetarian", "South Indian", "Healthy"],
    category: "south-indian",
    dietary: ["Vegetarian"],
  },
  {
    id: 6,
    name: "Homemade Gulab Jamun",
    description:
      "Soft and sweet gulab jamun made with love, perfect dessert",
    price: 80,
    image:
      "https://images.pexels.com/photos/15014919/pexels-photo-15014919.jpeg",
    cook: "Rekha Devi",
    cookId: "cook-6",
    location: "Rohini, Delhi",
    rating: 4.4,
    time: "10-20 mins",
    tags: ["Vegetarian", "Dessert", "Sweet"],
    category: "desserts",
    dietary: ["Vegetarian"],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'customer' or 'cook'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login"); // 'login' or 'register'
  const [authUserType, setAuthUserType] = useState("customer");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCookId, setSelectedCookId] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [hideHeroSection, setHideHeroSection] = useState(false);
  const [hidePromoSection, setHidePromoSection] =
    useState(false);
  const [orders, setOrders] = useState([]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 500],
    ratings: 0,
    deliveryTime: "",
    dietary: [],
    location: "",
  });

  const contextValue = {
    user,
    setUser,
    userType,
    setUserType,
    cart,
    setCart,
    favorites,
    setFavorites,
    currentPage,
    setCurrentPage,
    orders,
    setOrders,
  };

  // Optimized scroll effect to hide hero sections with smooth transitions
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          // More gradual hero section hiding with smooth transition
          const heroThreshold = Math.min(
            200,
            windowHeight * 0.3,
          );
          const shouldHideHero = scrollY > heroThreshold;
          setHideHeroSection(shouldHideHero);

          // More gradual promo section hiding
          const promoThreshold = Math.min(
            500,
            windowHeight * 0.6,
          );
          const shouldHidePromo = scrollY > promoThreshold;
          setHidePromoSection(shouldHidePromo);

          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Initial check
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter food items based on search and filters
  const filteredFoodItems = mockFoodItems.filter((item) => {
    // Search query filter - search in name, description, cook name, location, and tags
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.cook.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(query),
        );

      if (!matchesSearch) {
        return false;
      }
    }

    // Category filter
    if (
      selectedCategory &&
      selectedCategory !== "all" &&
      item.category !== selectedCategory
    ) {
      return false;
    }

    // Price range filter
    if (
      selectedFilters.priceRange &&
      (item.price < selectedFilters.priceRange[0] ||
        item.price > selectedFilters.priceRange[1])
    ) {
      return false;
    }

    // Rating filter
    if (
      selectedFilters.ratings &&
      selectedFilters.ratings > 0 &&
      item.rating < selectedFilters.ratings
    ) {
      return false;
    }

    // Delivery time filter
    if (
      selectedFilters.deliveryTime &&
      selectedFilters.deliveryTime !== ""
    ) {
      // This would need more complex logic based on actual delivery time ranges
      // For now, we'll just check if the item time matches the selected range
      const timeMatch =
        item.time.includes(
          selectedFilters.deliveryTime.split(" ")[0],
        ) || selectedFilters.deliveryTime === "Above 60 mins";
      if (!timeMatch) {
        return false;
      }
    }

    // Dietary filter
    if (
      selectedFilters.dietary &&
      selectedFilters.dietary.length > 0 &&
      !selectedFilters.dietary.some((diet) =>
        item.dietary.includes(diet),
      )
    ) {
      return false;
    }

    return true;
  });

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id,
    );
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  };

  const handleLogin = (email, password) => {
    // Mock login logic
    setUser({ email, name: email.split("@")[0] });
    setUserType(authUserType);
    setShowAuthModal(false);
    if (authUserType === "cook") {
      setCurrentPage("cook-dashboard");
    }
  };

  const handleRegister = (formData) => {
    // Mock registration logic
    setUser({ email: formData.email, name: formData.name });
    setUserType(authUserType);
    setShowAuthModal(false);
    if (authUserType === "cook") {
      setCurrentPage("cook-dashboard");
    }
  };

  const openAuth = (type, userType) => {
    setAuthType(type);
    setAuthUserType(userType);
    setShowAuthModal(true);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setCurrentPage("home");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedFilters({
      priceRange: [0, 500],
      ratings: 0,
      deliveryTime: "",
      dietary: [],
      location: "",
    });
  };

  const applyPromoCode = (code) => {
    // Mock promo code application
    console.log("Applied promo code:", code);
    // In real app, would apply discount to cart
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/40 to-secondary/30 relative smooth-scroll">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <div className="relative z-10">
          {/* Header */}
          <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-lg transition-all duration-300 ease-out">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={logoImage}
                    alt="Gharse Logo"
                    className="h-12 w-12 rounded-full object-cover shadow-sm flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <h1 className="text-2xl font-bold text-primary leading-tight">
                      Gharse
                    </h1>
                    <span className="hidden sm:block text-xs text-muted-foreground font-medium leading-tight">
                      Home Kitchen Network
                    </span>
                  </div>
                </div>

                {/* Quick Search in Navbar - only show on home page */}
                {currentPage === "home" && !selectedCookId && (
                  <div className="hidden lg:flex items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search dishes..."
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(e.target.value)
                        }
                        className="pl-10 w-64 h-9 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>
                )}

                <nav className="hidden md:flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentPage("home");
                      setSelectedCookId(null);
                    }}
                    className={`px-3 py-2 ${currentPage === "home" && !selectedCookId ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                  >
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage("location")}
                    className={`px-3 py-2 ${currentPage === "location" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                  >
                    <Navigation className="h-4 w-4 mr-1.5" />
                    Near Me
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage("membership")}
                    className={`px-3 py-2 ${currentPage === "membership" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                  >
                    <Crown className="h-4 w-4 mr-1.5" />
                    Membership
                  </Button>
                  {/* Admin-only tabs - only visible to owner (not logged in users) */}
                  {!user && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage("cooks")}
                        className={`px-3 py-2 ${currentPage === "cooks" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                      >
                        <ChefHat className="h-4 w-4 mr-1.5" />
                        Cooks
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setCurrentPage("delivery")
                        }
                        className={`px-3 py-2 ${currentPage === "delivery" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                      >
                        <Users className="h-4 w-4 mr-1.5" />
                        Delivery
                      </Button>
                    </>
                  )}
                  {user && userType === "customer" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage("orders")}
                      className={`px-3 py-2 ${currentPage === "orders" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                    >
                      <Truck className="h-4 w-4 mr-1.5" />
                      Orders
                    </Button>
                  )}
                  {user && userType === "cook" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage("cook-dashboard")
                      }
                      className={`px-3 py-2 ${currentPage === "cook-dashboard" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
                    >
                      Dashboard
                    </Button>
                  )}
                </nav>

                <div className="flex items-center space-x-3">
                  {user && userType === "customer" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCart(true)}
                      className="relative px-3 py-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {getTotalItems() > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                          {getTotalItems()}
                        </Badge>
                      )}
                    </Button>
                  )}

                  {user ? (
                    <div className="flex items-center space-x-2">
                      <span className="hidden sm:block text-sm font-medium text-foreground">
                        Hello, {user.name}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={logout}
                        className="px-3 py-2"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openAuth("login", "customer")
                        }
                        className="px-3 py-2 flex items-center"
                      >
                        <User className="h-4 w-4 md:mr-1.5" />
                        <span className="hidden md:inline">
                          Customer
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openAuth("login", "cook")
                        }
                        className="px-3 py-2 flex items-center"
                      >
                        <ChefHat className="h-4 w-4 md:mr-1.5" />
                        <span className="hidden md:inline">
                          Cook
                        </span>
                      </Button>
                    </div>
                  )}

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden px-2 py-2"
                    onClick={() =>
                      setShowMobileMenu(!showMobileMenu)
                    }
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Menu */}
              {showMobileMenu && (
                <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-300 ease-out">
                  {/* Mobile Search */}
                  {currentPage === "home" &&
                    !selectedCookId && (
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search dishes..."
                            value={searchQuery}
                            onChange={(e) =>
                              setSearchQuery(e.target.value)
                            }
                            className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50"
                          />
                        </div>
                      </div>
                    )}
                  <nav className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage("home");
                        setSelectedCookId(null);
                        setShowMobileMenu(false);
                      }}
                      className={`justify-start ${currentPage === "home" && !selectedCookId ? "bg-accent" : ""}`}
                    >
                      Home
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage("location");
                        setShowMobileMenu(false);
                      }}
                      className={`justify-start ${currentPage === "location" ? "bg-accent" : ""}`}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Near Me
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage("membership");
                        setShowMobileMenu(false);
                      }}
                      className={`justify-start ${currentPage === "membership" ? "bg-accent" : ""}`}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Membership
                    </Button>
                    {/* Admin-only tabs in mobile menu - only visible to owner (not logged in users) */}
                    {!user && (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setCurrentPage("cooks");
                            setShowMobileMenu(false);
                          }}
                          className={`justify-start ${currentPage === "cooks" ? "bg-accent" : ""}`}
                        >
                          <ChefHat className="h-4 w-4 mr-2" />
                          Cooks
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setCurrentPage("delivery");
                            setShowMobileMenu(false);
                          }}
                          className={`justify-start ${currentPage === "delivery" ? "bg-accent" : ""}`}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Delivery
                        </Button>
                      </>
                    )}
                    {user && userType === "customer" && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setCurrentPage("orders");
                          setShowMobileMenu(false);
                        }}
                        className={`justify-start ${currentPage === "orders" ? "bg-accent" : ""}`}
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Orders
                      </Button>
                    )}
                    {user && userType === "cook" && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setCurrentPage("cook-dashboard");
                          setShowMobileMenu(false);
                        }}
                        className={`justify-start ${currentPage === "cook-dashboard" ? "bg-accent" : ""}`}
                      >
                        Dashboard
                      </Button>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-transition">
            {selectedCookId ? (
              <div className="page-transition">
                <CookProfile
                  cookId={selectedCookId}
                  onClose={() => setSelectedCookId(null)}
                  onAddToCart={addToCart}
                />
              </div>
            ) : currentPage === "home" ? (
              <div className="space-y-8 page-transition">
                {/* Hero Section */}
                <div
                  className={`text-center mb-12 bg-gradient-to-br from-accent/60 via-secondary/30 to-primary/10 rounded-3xl py-16 px-6 shadow-lg border border-primary/20 will-animate scroll-transition-slow ${
                    hideHeroSection
                      ? "opacity-0 transform -translate-y-12 scale-95 pointer-events-none max-h-0 overflow-hidden py-0 mb-0"
                      : "opacity-100 transform translate-y-0 scale-100"
                  }`}
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <img
                        src={logoImage}
                        alt="Gharse - Home Cooking"
                        className="h-28 w-28 rounded-full shadow-2xl border-4 border-white/50"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
                    </div>
                  </div>
                  <h2 className="text-5xl mb-6 text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Discover Authentic Home-Cooked Meals
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Connect with loving home cooks, experienced
                    dabbawala's, and talented housewives who
                    bring the warmth of their kitchen to your
                    doorstep
                  </p>
                  {!user && (
                    <div className="flex justify-center space-x-4">
                      <Button
                        size="lg"
                        onClick={() =>
                          openAuth("register", "customer")
                        }
                        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-2xl text-lg px-8 py-3 rounded-full"
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                          openAuth("register", "cook")
                        }
                        className="border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/20 text-lg px-8 py-3 rounded-full shadow-lg"
                      >
                        Start Cooking
                      </Button>
                    </div>
                  )}
                </div>

                {/* Promotions Section */}
                <div
                  className={`will-animate scroll-transition-slow ${
                    hidePromoSection
                      ? "opacity-0 transform -translate-y-10 scale-95 pointer-events-none max-h-0 overflow-hidden mb-0"
                      : "opacity-100 transform translate-y-0 scale-100"
                  }`}
                >
                  <PromoSection onApplyPromo={applyPromoCode} />
                </div>

                {/* Search and Filters */}
                <SearchAndFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  onClearFilters={clearFilters}
                />

                {/* Results Info */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">
                      {filteredFoodItems.length} dishes found
                      {searchQuery && ` for "${searchQuery}"`}
                      {selectedCategory !== "all" &&
                        ` in ${selectedCategory.replace("-", " ")}`}
                    </p>
                    {/* Active filters display */}
                    <div className="flex items-center space-x-2">
                      {searchQuery && (
                        <Badge
                          variant="secondary"
                          className="flex items-center space-x-1"
                        >
                          <Search className="h-3 w-3" />
                          <span>{searchQuery}</span>
                          <button
                            onClick={() => setSearchQuery("")}
                            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {selectedCategory !== "all" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center space-x-1"
                        >
                          <span>
                            {selectedCategory.replace("-", " ")}
                          </span>
                          <button
                            onClick={() =>
                              setSelectedCategory("all")
                            }
                            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                  {(filteredFoodItems.length !==
                    mockFoodItems.length ||
                    searchQuery ||
                    selectedCategory !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-primary hover:text-primary/80"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>

                {/* Food Items Grid */}
                {filteredFoodItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFoodItems.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] border-border/50 bg-gradient-to-br from-card/90 via-card/80 to-accent/20 backdrop-blur-sm hover:border-primary/30 will-animate"
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                          {user && userType === "customer" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-sm"
                              onClick={() =>
                                toggleFavorite(item.id)
                              }
                            >
                              <Heart
                                className={`h-4 w-4 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                              />
                            </Button>
                          )}
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">
                              {item.name}
                            </h3>
                            <span className="font-bold text-lg">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <button
                              onClick={() =>
                                setSelectedCookId(item.cookId)
                              }
                              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <User className="h-4 w-4" />
                              <span className="hover:underline">
                                {item.cook}
                              </span>
                            </button>
                            <HealthCertification
                              cookId={item.cookId}
                              compact
                            />
                          </div>

                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm mb-3">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{item.time}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-secondary/70 text-secondary-foreground"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {user && userType === "customer" ? (
                            <Button
                              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
                              onClick={() => addToCart(item)}
                            >
                              Add to Cart
                            </Button>
                          ) : (
                            <Button
                              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
                              onClick={() =>
                                openAuth("login", "customer")
                              }
                            >
                              Login to Order
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-border/50">
                    <div className="text-muted-foreground">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">
                        No dishes found
                      </h3>
                      <p>
                        Try adjusting your search or filters to
                        find what you're looking for.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            ) : currentPage === "location" ? (
              <div className="page-transition">
                <LocationService
                  onSelectCook={setSelectedCookId}
                  selectedLocation={userLocation}
                  onLocationChange={setUserLocation}
                />
              </div>
            ) : currentPage === "membership" ? (
              <div className="page-transition">
                <MembershipService />
              </div>
            ) : currentPage === "cooks" && !user ? (
              <div className="page-transition">
                <CookManagement />
              </div>
            ) : currentPage === "delivery" && !user ? (
              <div className="page-transition">
                <DeliveryPartners />
              </div>
            ) : currentPage === "orders" &&
              user &&
              userType === "customer" ? (
              <div className="page-transition">
                <OrderTracking />
              </div>
            ) : currentPage === "cook-dashboard" &&
              user &&
              userType === "cook" ? (
              <div className="page-transition">
                <CookDashboard />
              </div>
            ) : null}
          </main>

          {/* Modals */}
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            type={authType}
            userType={authUserType}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onSwitchType={(type) => setAuthType(type)}
            onSwitchUserType={(type) => setAuthUserType(type)}
          />

          <Cart
            isOpen={showCart}
            onClose={() => setShowCart(false)}
            onCheckout={() => {
              setShowCart(false);
              setShowPayment(true);
            }}
          />

          <PaymentModal
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            onPaymentComplete={() => {
              setShowPayment(false);
              setCart([]);
              // Show success message
            }}
          />

          <FeedbackModal
            isOpen={showFeedback}
            onClose={() => setShowFeedback(false)}
          />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };