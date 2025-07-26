"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  MessageCircle,
  Shield,
  Clock,
  Droplets,
  Star,
  MapPin,
  CheckCircle,
  ArrowRight,
  Calendar,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Bed,
  Home,
  Flame,
  ImageIcon,
  Axe,
} from "lucide-react"

// Updated product data structure with the new STANLEY Camp Axe
const products = {
  "premium-4-person-tent": {
    id: "premium-4-person-tent",
    name: "Premium 4-Person Tent",
    icon: <Home className="h-6 w-6" />,
    description: "High-quality waterproof tent perfect for families and small groups",
    images: [
      "/tent1.jpg",
      "/tent2.jpg",
      "/tent3.jpg",
      "/tent4.jpg",
    ],
    specifications: ["100% Waterproof", "4-Person Capacity", "Easy Setup", "Premium Material", "Wind Resistant"],
    pricing: {
      1: { rate: 500, total: 500 },
      2: { rate: 395, total: 790 },
      3: { rate: 330, total: 990 },
      4: { rate: 310, total: 1240 },
      5: { rate: 295, total: 1475 },
      6: { rate: 290, total: 1740 },
      7: { rate: 285, total: 1995 },
    },
  },
  "amazon-basics-tent": {
    id: "amazon-basics-tent",
    name: "Amazon Basics 4-Person Tent",
    icon: <Home className="h-6 w-6" />,
    description: "Reliable and affordable 4-person tent from Amazon Basics",
    images: ["/amazon-basics-1.jpg", "/amazon-basics-2.jpg", "/amazon-basics-3.jpg", "/amazon-basics-4.jpg"],
    specifications: ["Weather Resistant", "4-Person Capacity", "Quick Setup", "Durable Frame", "Ventilation System"],
    pricing: {
      1: { rate: 450, total: 450 },
      2: { rate: 350, total: 700 },
      3: { rate: 300, total: 900 },
      4: { rate: 280, total: 1120 },
      5: { rate: 265, total: 1325 },
      6: { rate: 260, total: 1560 },
      7: { rate: 255, total: 1785 },
    },
  },
  "decathlon-mh100-tent": {
    id: "decathlon-mh100-tent",
    name: "Decathlon MH100 4-Person Tent",
    icon: <Home className="h-6 w-6" />,
    description: "QUECHUA MH100 - Lightweight and easy-to-setup 4-person camping tent",
    images: [
      "/D4img.webp",
      "/D4img2.webp",
      "/D4img3.webp",
      "/D4img4.webp",
    ],
    specifications: ["4.65KG Weight", '54" Height', "4-Person Capacity", "Easy Assembly", "Compact Storage"],
    pricing: {
      1: { rate: 480, total: 480 },
      2: { rate: 375, total: 750 },
      3: { rate: 320, total: 960 },
      4: { rate: 300, total: 1200 },
      5: { rate: 285, total: 1425 },
      6: { rate: 280, total: 1680 },
      7: { rate: 275, total: 1925 },
    },
  },
  "sleeping-bag": {
    id: "sleeping-bag",
    name: "Sleeping Bag",
    icon: <Bed className="h-6 w-6" />,
    description: "Comfortable and warm sleeping bag for a good night's rest outdoors",
    images: [
      "/SBimg1.webp",
      "/SBimg2.webp",
      "/SBimg3.webp",
      "/SBimg4.webp",
    ],
    specifications: ["Temperature Rated", "Comfortable Padding", "Compact Storage", "Easy to Clean", "All Season"],
    pricing: {
      1: { rate: 150, total: 150 },
      2: { rate: 125, total: 250 },
      3: { rate: 100, total: 300 },
      4: { rate: 90, total: 360 },
      5: { rate: 85, total: 425 },
      6: { rate: 80, total: 480 },
      7: { rate: 75, total: 525 },
    },
  },
  "portable-burner": {
    id: "portable-burner",
    name: "Portable Burner",
    icon: <Flame className="h-6 w-6" />,
    description: "Compact and efficient portable gas burner for outdoor cooking",
    images: [
      "/placeholder.jpg",
      "/tent2.jpg",
      "/tent3.jpg",
      "/tent4.jpg",
    ],
    specifications: ["Gas Powered", "Compact Design", "Easy Ignition", "Wind Shield", "Safety Features"],
    pricing: {
      1: { rate: 200, total: 200 },
      2: { rate: 175, total: 350 },
      3: { rate: 150, total: 450 },
      4: { rate: 140, total: 560 },
      5: { rate: 135, total: 675 },
      6: { rate: 130, total: 780 },
      7: { rate: 125, total: 875 },
    },
  },
  "stanley-camp-axe": {
    id: "stanley-camp-axe",
    name: "STANLEY Camp Axe",
    icon: <Axe className="h-6 w-6" />,
    description: "Professional steel shaft camp axe for carpentry, camping, hiking & wood cutting",
    images: [
      "/stanley-axe-1.jpg",
      "/stanley-axe-2.jpg", 
      "/stanley-axe-3.jpg",
      "/stanley-axe-4.jpg",
    ],
    specifications: ["Steel Shaft", "Anti-Rust Properties", "Rubber Handle", "35.6L x 15.2W cm", "Professional Grade"],
    pricing: {
      1: { rate: 180, total: 180 },
      2: { rate: 160, total: 320 },
      3: { rate: 140, total: 420 },
      4: { rate: 130, total: 520 },
      5: { rate: 125, total: 625 },
      6: { rate: 120, total: 720 },
      7: { rate: 115, total: 805 },
    },
  },
}

// Separate gallery images for the interactive gallery section
const galleryImages = [
  "/tent1.jpg",
  "/tent2.jpg",
  "/amazon-basics-1.jpg",
  "/amazon-basics-2.jpg",
  "/D4img.webp",
  "/D4img2.webp",
  "/SBimg1.webp",
  "/SBimg2.webp",
  "/stanley-axe-1.jpg",
  "/stanley-axe-2.jpg",
]

export default function EasytentRentals() {
  const phoneNumber = "070587 82520"
  const whatsappNumber = "917058782520"
  const businessAddress = "Matoshree Sadan, near Balaji Mandir Road, Nerul West, Nerul, Navi Mumbai, Maharashtra 400706"
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9000000000005!2d73.01148400000001!3d19.0335567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3f764a9b8af%3A0x41162d6e08e5fe80!2sMatoshree%20Sadan%2C%20near%20Balaji%20Mandir%20Road%2C%20Nerul%20West%2C%20Nerul%2C%20Navi%20Mumbai%2C%20Maharashtra%20400706!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir//Matoshree+Sadan,+near+Balaji+Mandir+Road,+Nerul+West,+Nerul,+Navi+Mumbai,+Maharashtra+400706/@19.0335384,72.9316573,26778m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3be7c3f764a9b8af:0x41162d6e08e5fe80!2m2!1d73.014059!2d19.0335567?hl=en&authuser=0&entry=ttu"

  const [selectedProduct, setSelectedProduct] = useState("premium-4-person-tent")
  const [days, setDays] = useState([3])
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  // Form state
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({})
  const [startDate, setStartDate] = useState("")
  const [deliveryRequired, setDeliveryRequired] = useState<"yes" | "no" | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const priceCalculatorRef = useRef<HTMLElement>(null)
  const bookingFormRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)

  const currentProduct = products[selectedProduct as keyof typeof products]
  const productKeys = Object.keys(products)

  // Pricing logic
  const getPricing = (productId: string, numDays: number) => {
    const product = products[productId as keyof typeof products]
    const pricing = product.pricing[numDays as keyof typeof product.pricing]
    const originalTotal = numDays * product.pricing[1].rate
    const savings = originalTotal - pricing.total
    const discountPercent = savings > 0 ? Math.round((savings / originalTotal) * 100) : 0

    return { ...pricing, savings, discountPercent, originalTotal }
  }

  const scrollToPriceCalculator = () => {
    priceCalculatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const scrollToBookingForm = () => {
    bookingFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const currentPricing = getPricing(selectedProduct, days[0])

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentProduct.images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [currentProduct.images.length])

  // Auto-rotate products in hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % productKeys.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [productKeys.length])

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const advantages = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "100% Waterproof",
      description: "Premium quality equipment that keeps you dry in any weather",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Sanitized & Quality Checked",
      description: "Every item is thoroughly cleaned and inspected before rental",
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-600" />,
      title: "2-Minute Booking",
      description: "Quick booking via WhatsApp or phone call",
    },
    {
      icon: <Star className="h-8 w-8 text-purple-600" />,
      title: "Trusted by 500+ Customers",
      description: "Reliable service with excellent customer satisfaction",
    },
  ]

  const isValidIndianPhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const addProductToSelection = (productId: string, days: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: days,
    }))
    setJustAdded(true)
    // Reset the "just added" state after 3 seconds
    setTimeout(() => setJustAdded(false), 3000)
  }

  const handleAddMore = () => {
    setJustAdded(false)
  }

  const removeProductFromSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSelection = { ...prev }
      delete newSelection[productId]
      return newSelection
    })
  }

  const calculateTotalBookingCost = () => {
    return Object.entries(selectedProducts).reduce((total, [productId, days]) => {
      return total + getPricing(productId, days).total
    }, 0)
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidIndianPhoneNumber(customerPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number (starts with 6-9).")
      return
    } else {
      setPhoneError(null)
    }

    if (
      !customerName ||
      !customerPhone ||
      Object.keys(selectedProducts).length === 0 ||
      deliveryRequired === null ||
      !startDate
    ) {
      alert("Please fill in all required fields and select at least one product.")
      return
    }

    const productDetails = Object.entries(selectedProducts)
      .map(([productId, days]) => {
        const product = products[productId as keyof typeof products]
        const pricing = getPricing(productId, days)
        return `${product.name}: ${days} ${days === 1 ? "day" : "days"} - ₹${pricing.total.toLocaleString()}`
      })
      .join("\n")

    const totalCost = calculateTotalBookingCost()

    const bookingMessage = `
Hello Easytent Rentals,

I would like to book the following items:

Name: ${customerName}
Phone Number: ${customerPhone}
Start Date: ${startDate}
Delivery Required: ${deliveryRequired === "yes" ? "Yes" : "No"}

Products:
${productDetails}

Total Estimated Cost: ₹${totalCost.toLocaleString()}

Please confirm the booking and further steps. Thank you!
`.trim()

    const encodedMessage = encodeURIComponent(bookingMessage)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const nextProduct = () => {
    const currentIndex = productKeys.indexOf(selectedProduct)
    const nextIndex = (currentIndex + 1) % productKeys.length
    setSelectedProduct(productKeys[nextIndex])
    setCurrentImageIndex(0)
  }

  const prevProduct = () => {
    const currentIndex = productKeys.indexOf(selectedProduct)
    const prevIndex = currentIndex === 0 ? productKeys.length - 1 : currentIndex - 1
    setSelectedProduct(productKeys[prevIndex])
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentProduct.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentProduct.images.length - 1 : prev - 1))
  }

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  // Group products by category for better display
  const productCategories = {
    tents: Object.values(products).filter((p) => p.name.toLowerCase().includes("tent")),
    accessories: Object.values(products).filter((p) => !p.name.toLowerCase().includes("tent")),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-green-400">Easytent</div>
          <div className="hidden md:flex gap-6 text-sm">
            <button onClick={scrollToProducts} className="text-gray-300 hover:text-green-400 transition-colors">
              Products
            </button>
            <button onClick={scrollToPriceCalculator} className="text-gray-300 hover:text-green-400 transition-colors">
              Pricing
            </button>
            <button onClick={scrollToBookingForm} className="text-gray-300 hover:text-green-400 transition-colors">
              Book Now
            </button>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-500"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in renting camping equipment. Can you help me with pricing and availability?`,
                  "_blank",
                )
              }
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-blue-900/30 animate-pulse"></div>
        <div
          className={`container mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-6 leading-tight">
            Easytent Rentals
            <span className="block text-2xl md:text-3xl text-green-300 font-normal mt-2">
              Your Complete Camping Equipment Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            From premium tents to camp axes, portable burners and sleeping bags — we've got everything for your outdoor
            adventure
          </p>

          {/* Rotating Product Showcase */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 text-green-300">
              <div className="flex items-center gap-2">
                {products[productKeys[currentProductIndex] as keyof typeof products].icon}
                <span className="text-lg font-medium">
                  {products[productKeys[currentProductIndex] as keyof typeof products].name}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm">
                Starting from ₹{products[productKeys[currentProductIndex] as keyof typeof products].pricing[1].rate}/day
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-500 text-lg px-8 py-4" onClick={scrollToProducts}>
              View Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-green-500 text-green-400 hover:bg-green-900/20 bg-transparent"
              onClick={scrollToBookingForm}
            >
              Book Now
            </Button>
          </div>
          <div className="text-green-300 font-semibold text-lg">Rent. Rock. Return.</div>
        </div>
      </section>

      {/* Products Showcase */}
      <section ref={productsRef} className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-12">Our Product Range</h2>

          {/* Tents Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-green-300 mb-6 text-center">🏕️ Tents Collection</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 justify-items-center">
              {productCategories.tents.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 w-full max-w-sm ${
                    selectedProduct === product.id ? "border-green-500 bg-gray-750" : "border-gray-700 bg-gray-800"
                  } hover:bg-gray-750`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300 text-green-400">
                      {product.icon}
                    </div>
                    <h3 className="font-bold text-base text-green-400 mb-2">{product.name}</h3>
                    <p className="text-gray-300 text-xs mb-2 line-clamp-2">{product.description}</p>
                    <div className="text-green-300 font-semibold text-sm">From ₹{product.pricing[1].rate}/day</div>
                    {product.id === "decathlon-mh100-tent" && (
                      <Badge className="mt-2 bg-blue-900/50 text-blue-300 border-blue-700">QUECHUA Brand</Badge>
                    )}
                    {product.id === "amazon-basics-tent" && (
                      <Badge className="mt-2 bg-orange-900/50 text-orange-300 border-orange-700">Amazon Basics</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Accessories Section */}
          <div>
            <h3 className="text-2xl font-bold text-green-300 mb-6 text-center">🎒 Camping Accessories</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto justify-items-center">
              {productCategories.accessories.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 w-full max-w-sm ${
                    selectedProduct === product.id ? "border-green-500 bg-gray-750" : "border-gray-700 bg-gray-800"
                  } hover:bg-gray-750`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300 text-green-400">
                      {product.icon}
                    </div>
                    <h3 className="font-bold text-base text-green-400 mb-2">{product.name}</h3>
                    <p className="text-gray-300 text-xs mb-2 line-clamp-2">{product.description}</p>
                    <div className="text-green-300 font-semibold text-sm">From ₹{product.pricing[1].rate}/day</div>
                    {product.id === "portable-burner" && (
                      <Badge className="mt-2 bg-red-900/50 text-red-300 border-red-700">Gas Powered</Badge>
                    )}
                    {product.id === "stanley-camp-axe" && (
                      <Badge className="mt-2 bg-gray-900/50 text-gray-300 border-gray-700">STANLEY Brand</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Gallery - Now separate from product images */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Equipment Gallery</h2>
            <p className="text-gray-300 text-lg">See our camping equipment in action</p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Gallery Image Display */}
            <div className="relative">
              <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-xl border border-gray-700 relative bg-white max-h-100">
                <img
                  src={galleryImages[currentGalleryIndex]}
                  alt={`Gallery Image ${currentGalleryIndex + 1}`}
                  className="w-full h-full object-contain p-5"
                />

                {/* Gallery Navigation */}
                <button
                  onClick={prevGalleryImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextGalleryImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Gallery Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGalleryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentGalleryIndex ? "bg-green-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">{currentProduct.name}</h2>
            <p className="text-gray-300 text-lg">{currentProduct.description}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Product Details - Now on Left */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-green-400 mb-6">Specifications</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {currentProduct.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-base">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special badges for specific products */}
                <div className="flex flex-wrap gap-3">
                  {currentProduct.id === "decathlon-mh100-tent" && (
                    <>
                      <Badge className="bg-blue-900/50 text-blue-300 border-blue-700 text-base px-4 py-2">QUECHUA Brand</Badge>
                      <Badge className="bg-green-900/50 text-green-300 border-green-700 text-base px-4 py-2">4.65KG Weight</Badge>
                    </>
                  )}
                  {currentProduct.id === "amazon-basics-tent" && (
                    <Badge className="bg-orange-900/50 text-orange-300 border-orange-700 text-base px-4 py-2">Amazon Basics Quality</Badge>
                  )}
                  {currentProduct.id === "portable-burner" && (
                    <Badge className="bg-red-900/50 text-red-300 border-red-700 text-base px-4 py-2">Outdoor Cooking</Badge>
                  )}
                  {currentProduct.id === "stanley-camp-axe" && (
                    <>
                      <Badge className="bg-gray-900/50 text-gray-300 border-gray-700 text-base px-4 py-2">STANLEY Brand</Badge>
                      <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-700 text-base px-4 py-2">Professional Grade</Badge>
                    </>
                  )}
                </div>

                {/* Product Navigation */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={prevProduct}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Previous
                  </button>
                  <div className="flex gap-3">
                    {productKeys.map((key, index) => (
                      <button
                        key={key}
                        onClick={() => setSelectedProduct(key)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          selectedProduct === key ? "bg-green-500" : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextProduct}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    Next
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Product Images - Now on Right with 16:9 aspect ratio */}
              <div className="relative">
                <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-xl border border-gray-700 relative bg-white">
                  <img
                    src={currentProduct.images[currentImageIndex]}
                    alt={`${currentProduct.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain p-6"
                  />

                  {/* Image Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Image Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {currentProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-green-500" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section
        ref={priceCalculatorRef}
        className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Pricing Calculator</h2>
            <p className="text-gray-300 text-lg">Calculate rental costs for any of our products</p>
          </div>

          <Card className="p-8 shadow-xl border-gray-700 bg-gray-900">
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">Select Product</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="border-gray-600 focus:border-green-500 bg-gray-700 text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {Object.values(products).map((product) => (
                        <SelectItem key={product.id} value={product.id} className="text-gray-100 focus:bg-gray-700">
                          <div className="flex items-center gap-2">
                            {product.icon}
                            {product.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    Rental Duration: {days[0]} {days[0] === 1 ? "Day" : "Days"}
                  </label>
                  <Slider value={days} onValueChange={setDays} max={7} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-gray-400 mt-2 px-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <span key={num}>
                        {num} {num === 1 ? "Day" : "Days"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-400 flex items-center">
                      <IndianRupee className="h-8 w-8" />
                      {currentPricing.total.toLocaleString()}
                    </div>
                    <div className="text-green-300 font-medium">
                      ₹{currentPricing.rate}/day × {days[0]} {days[0] === 1 ? "day" : "days"}
                    </div>
                  </div>

                  {currentPricing.savings > 0 && (
                    <div className="text-right">
                      <div className="text-gray-400 line-through text-lg">
                        ₹{currentPricing.originalTotal.toLocaleString()}
                      </div>
                      <Badge className="bg-red-900/50 text-red-300 border-red-700 text-lg px-3 py-1">
                        Save ₹{currentPricing.savings.toLocaleString()} ({currentPricing.discountPercent}% OFF)
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              {justAdded && (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center text-green-300">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">{currentProduct.name} added to your booking!</span>
                  </div>
                  <p className="text-green-400 text-sm mt-1">
                    You can continue adding more products or proceed to the booking form below.
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                {!justAdded ? (
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-500 text-lg py-6"
                    onClick={() => addProductToSelection(selectedProduct, days[0])}
                  >
                    Add to Booking
                  </Button>
                ) : (
                  <div className="flex-1 flex gap-2">
                    <Button className="flex-1 bg-green-700 text-lg py-6 cursor-default" disabled>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Added to Booking!
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-lg py-6 px-6" onClick={handleAddMore}>
                      Add More
                    </Button>
                  </div>
                )}
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-lg py-6"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=Hi! I'd like to book a ${currentProduct.name} for ${days[0]} ${days[0] === 1 ? "day" : "days"}. The total cost is ₹${currentPricing.total.toLocaleString()}. Please confirm availability.`,
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Quick Book via WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-12">Why Choose Easytent?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {advantages.map((advantage, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-700 bg-gray-800 hover:bg-gray-750"
              >
                <CardContent className="p-4 text-center">
                  <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {advantage.icon}
                  </div>
                  <h3 className="font-bold text-base text-green-400 mb-2">{advantage.title}</h3>
                  <p className="text-gray-300 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section ref={bookingFormRef} className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-12">Complete Booking Form</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Selected Products Summary */}
            <Card className="shadow-xl border-gray-700 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">Selected Products</h3>
                {Object.keys(selectedProducts).length === 0 ? (
                  <p className="text-gray-400">No products selected. Use the price calculator above to add products.</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(selectedProducts).map(([productId, days]) => {
                      const product = products[productId as keyof typeof products]
                      const pricing = getPricing(productId, days)
                      return (
                        <div key={productId} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            {product.icon}
                            <div>
                              <div className="text-green-400 font-medium">{product.name}</div>
                              <div className="text-gray-300 text-sm">
                                {days} {days === 1 ? "day" : "days"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold">₹{pricing.total.toLocaleString()}</div>
                            <button
                              onClick={() => removeProductFromSelection(productId)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    <div className="border-t border-gray-600 pt-3 mt-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-green-400">Total:</span>
                        <span className="text-green-400">₹{calculateTotalBookingCost().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="shadow-xl border-gray-700 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">Customer Details</h3>
                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-green-400 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="customerName"
                      placeholder="Enter your full name"
                      className="border-gray-600 focus:border-green-500 bg-gray-700 text-gray-100 placeholder-gray-400"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium text-green-400 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`border-gray-600 focus:border-green-500 bg-gray-700 text-gray-100 placeholder-gray-400 ${phoneError ? "border-red-500" : ""}`}
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value)
                        if (phoneError) setPhoneError(null)
                      }}
                      required
                    />
                    {phoneError && <p className="text-red-400 text-sm mt-1">{phoneError}</p>}
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-green-400 mb-2">
                      Start Date *
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      className="border-gray-600 focus:border-green-500 bg-gray-700 text-gray-100 placeholder-gray-400"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">Delivery Required?</label>
                    <div className="flex gap-4 text-gray-300">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="yes"
                          className="mr-2 accent-green-500"
                          checked={deliveryRequired === "yes"}
                          onChange={() => setDeliveryRequired("yes")}
                          required
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="no"
                          className="mr-2 accent-green-500"
                          checked={deliveryRequired === "no"}
                          onChange={() => setDeliveryRequired("no")}
                          required
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-500 text-lg py-6"
                    disabled={Object.keys(selectedProducts).length === 0}
                  >
                    Submit Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-12">Terms & Conditions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-gray-700 bg-gray-900">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Security Deposit
                </h3>
                <p className="text-gray-300">
                  Security deposit varies by product. Fully refunded upon return and condition check.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-700 bg-gray-900">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-green-500" />
                  Late Returns
                </h3>
                <p className="text-gray-300">Late returns incur daily penalty based on original rental rate.</p>
              </CardContent>
            </Card>
            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  Damage Policy
                </h3>
                <p className="text-gray-300">
                  Customers responsible for major damage or loss. Minor wear and tear is acceptable.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-700 bg-gray-900">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-green-500" />
                  Delivery
                </h3>
                <p className="text-gray-300">Delivery available with charges varying based on distance and location.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-12">Contact & Location</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-green-500" />
                  Our Location
                </h3>
                <p className="text-gray-300 mb-4">{businessAddress}</p>
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 border border-gray-700">
                  <iframe
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Easytent Rentals Location"
                  ></iframe>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  View on Google Maps
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <div className="flex gap-2 mt-4">
                  <Badge className="bg-green-900/50 text-green-300 border-green-700">4.9 ⭐ Rating</Badge>
                  <Badge className="bg-blue-900/50 text-blue-300 border-blue-700">13 Google Reviews</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-green-500" />
                  Contact Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone className="mr-2 h-4 w-4" />
                    <a href={`tel:${phoneNumber}`} className="hover:text-green-400 transition-colors">
                      {phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-400 transition-colors"
                    >
                      WhatsApp: {phoneNumber}
                    </a>
                  </div>
                  <div className="text-green-300 font-medium">Open 24 Hours</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-12 px-4 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4 text-green-400">Easytent Rentals</div>
          <p className="text-green-300 mb-6">Rent. Rock. Return.</p>
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>
          <p className="text-gray-400 text-sm">© 2024 Easytent Rentals. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="secondary"
          className="rounded-full w-14 h-14 hover:bg-green-600 shadow-lg animate-bounce bg-white"
          onClick={() =>
            window.open(
              `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in camping equipment rentals. Can you help me?`,
              "_blank",
            )
          }
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
