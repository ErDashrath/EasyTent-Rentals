"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Image from "next/image"

export default function EasytentRentals() {
  const phoneNumber = "070587 82520"
  const whatsappNumber = "917058782520" // Indian format for WhatsApp
  const businessAddress = "Matoshree Sadan, near Balaji Mandir Road, Nerul West, Nerul, Navi Mumbai, Maharashtra 400706"
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9000000000005!2d73.01148400000001!3d19.0335567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3f764a9b8af%3A0x41162d6e08e5fe80!2sMatoshree%20Sadan%2C%20near%20Balaji%20Mandir%20Road%2C%20Nerul%20West%2C%20Nerul%2C%20Navi%20Mumbai%2C%20Maharashtra%20400706!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" // Placeholder timestamp
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir//Matoshree+Sadan,+near+Balaji+Mandir+Road,+Nerul+West,+Nerul,+Navi+Mumbai,+Maharashtra+400706/@19.0335384,72.9316573,26778m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3be7c3f764a9b8af:0x41162d6e08e5fe80!2m2!1d73.014059!2d19.0335567?hl=en&authuser=0&entry=ttu"

  const [days, setDays] = useState([3])
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Form state
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [rentalDays, setRentalDays] = useState(3) // Default to 3 days
  const [deliveryRequired, setDeliveryRequired] = useState<"yes" | "no" | null>(null)
  const [startDate, setStartDate] = useState("") // New state for start date
  const [phoneError, setPhoneError] = useState<string | null>(null) // State for phone number validation error

  const priceCalculatorRef = useRef<HTMLElement>(null)
  const bookingFormRef = useRef<HTMLElement>(null)

  // Pricing logic
  const getPricing = (numDays: number) => {
    const rates = {
      1: { rate: 500, total: 500 },
      2: { rate: 395, total: 790 },
      3: { rate: 330, total: 990 },
      4: { rate: 310, total: 1240 },
      5: { rate: 295, total: 1475 },
      6: { rate: 290, total: 1740 },
      7: { rate: 285, total: 1995 },
    }

    const pricing = rates[numDays as keyof typeof rates]
    const originalTotal = numDays * 500
    const savings = originalTotal - pricing.total
    const discountPercent = Math.round((savings / originalTotal) * 100)

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

  const currentPricing = getPricing(days[0])

  const galleryImages = ["/tent1.jpg", "/tent2.jpg", "/tent3.jpg", "/tent4.jpg"]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const advantages = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "100% Waterproof",
      description: "Premium quality tents that keep you dry in any weather",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Sanitized & Quality Checked",
      description: "Every tent is thoroughly cleaned and inspected before rental",
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

  // Function to validate Indian phone number
  const isValidIndianPhoneNumber = (phone: string) => {
    // Regex for 10 digits, starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number
    if (!isValidIndianPhoneNumber(customerPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number (starts with 6-9).")
      return
    } else {
      setPhoneError(null) // Clear error if valid
    }

    if (!customerName || !customerPhone || !rentalDays || deliveryRequired === null || !startDate) {
      alert("Please fill in all required fields.")
      return
    }

    const bookingMessage = `
Hello Easytent Rentals,

I would like to book a 4-Person Tent with the following details:

Name: ${customerName}
Phone Number: ${customerPhone}
Rental Duration: ${rentalDays} ${rentalDays === 1 ? "day" : "days"}
Start Date: ${startDate}
Delivery Required: ${deliveryRequired === "yes" ? "Yes" : "No"}

Total Estimated Cost: ₹${getPricing(rentalDays).total.toLocaleString()}

Please confirm the booking and further steps. Thank you!
`.trim()

    const encodedMessage = encodeURIComponent(bookingMessage)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-green-400">Easytent</div>
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
                  `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in renting a 4-person tent. Can you help me with pricing and availability?`,
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
              Your One-Stop Tent Rental Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Planning a party, camping, or outdoor event? We've got you covered — literally
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-500 text-lg px-8 py-4"
              onClick={scrollToPriceCalculator}
            >
              Check Prices
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

      {/* Price Calculator */}
      <section
        ref={priceCalculatorRef}
        className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">4-Person Tent Rental</h2>
            <p className="text-gray-300 text-lg">Perfect for small groups, families, and intimate gatherings</p>
          </div>

          <Card className="p-8 shadow-xl border-gray-700 bg-gray-900">
            <CardContent className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Select Rental Duration: {days[0]} {days[0] === 1 ? "Day" : "Days"}
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-500 text-lg py-6"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=Hi! I'd like to book a 4-person tent for ${days[0]} ${days[0] === 1 ? "day" : "days"}. The total cost is ₹${currentPricing.total.toLocaleString()}. Please confirm availability.`,
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-lg py-6 border-green-500 text-green-400 bg-transparent hover:bg-green-900/20"
                  onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call to Book
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-700 bg-gray-800 hover:bg-gray-750"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {advantage.icon}
                  </div>
                  <h3 className="font-bold text-lg text-green-400 mb-2">{advantage.title}</h3>
                  <p className="text-gray-300">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-12">
            Nature is calling you !!!{" "}
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl border border-gray-700">
              <Image
                src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Tent setup ${currentImageIndex + 1}`}
                width={800}
                height={450}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {galleryImages.map((_, index) => (
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
      </section>

      {/* Booking Form */}
      <section ref={bookingFormRef} className="py-16 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-12">Quick Booking Form</h2>
          <Card className="shadow-xl border-gray-700 bg-gray-800">
            <CardContent className="p-8">
              <form onSubmit={handleSubmitBooking} className="space-y-6">
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
                      if (phoneError) setPhoneError(null) // Clear error as user types
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
                  <label htmlFor="rentalDays" className="block text-sm font-medium text-green-400 mb-2">
                    Number of Days *
                  </label>
                  <Input
                    id="rentalDays"
                    type="number"
                    min="1"
                    max="7"
                    className="border-gray-600 focus:border-green-500 bg-gray-700 text-gray-100"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number.parseInt(e.target.value))}
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
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-lg py-6">
                  Submit Booking Request
                </Button>
              </form>
            </CardContent>
          </Card>
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
                  ₹2,500 refundable security deposit required. Fully refunded upon return and condition check.
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
            <Card className="border-gray-700 bg-gray-900">
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
              `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in tent rentals. Can you help me?`,
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
