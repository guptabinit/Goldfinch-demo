// Dining options
export const diningOptions = [
  {
    id: "in-room-dining",
    title: "In-Room Dining",
    description: "Enjoy our exquisite menu in the comfort of your room",
    image: "/opulent-breakfast-balcony.png",
    href: "/guest/dining/in-room-dining",
    features: ["24/7 Service", "International Cuisine", "Special Dietary Options"],
    openingHours: "24 hours",
    location: "Available in all rooms",
  },
  {
    id: "banjara",
    title: "Banjara Restaurant",
    description: "Authentic Indian cuisine with a modern twist",
    image: "https://wyndhamdananggoldenbay.com/wp-content/uploads/2023/04/25542415_1664135023650768_1938754405628211889_o-1200x650.jpg",
    href: "/guest/dining/banjara",
    features: ["Multi-Cuisine", "Live Music (Weekends)", "Fine Dining"],
    openingHours: "7:00 AM - 11:00 PM",
    location: "Ground Floor",
  }
]

// Spa services
export const spaServices = [
  {
    id: "treatments",
    title: "On-Site Spa",
    description: "Rejuvenating massages and body treatments",
    image: "/serene-spa-retreat.png",
    href: "/guest/spa/treatments",
    features: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone"],
    openingHours: "9:00 AM - 9:00 PM",
    location: "3rd Floor",
  },
  {
    id: "facials",
    title: "Facials",
    description: "Revitalizing facials for glowing skin",
    image: "/serene-spa-facial.png",
    href: "/guest/spa/facials",
    features: ["Anti-Aging", "Hydrating", "Deep Cleansing", "Brightening"],
    openingHours: "9:00 AM - 9:00 PM",
    location: "3rd Floor",
  }
]

// Housekeeping services
export const housekeepingServices = [
  {
    id: "daily-service",
    title: "Daily Housekeeping",
    description: "Regular cleaning and maintenance of your room",
    image: "/pristine-suite-refresh.png",
    href: "/guest/housekeeping/daily",
    features: ["Bed Making", "Bathroom Cleaning", "Vacuuming", "Amenity Replenishment"],
    availableHours: "8:00 AM - 8:00 PM",
    requestType: "Scheduled or On-Demand",
  },
  {
    id: "turndown",
    title: "Evening Turndown Service",
    description: "Prepare your room for a comfortable night's sleep",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Turndown+Service",
    href: "/guest/housekeeping/turndown",
    features: ["Bed Preparation", "Lighting Adjustment", "Curtain Closing", "Chocolate Treat"],
    availableHours: "6:00 PM - 10:00 PM",
    requestType: "Opt-in Service",
  },
  {
    id: "special-requests",
    title: "Special Requests",
    description: "Additional amenities and services for your comfort",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Amenities",
    href: "/guest/housekeeping/special-requests",
    features: ["Extra Pillows", "Hypoallergenic Bedding", "Baby Crib", "Extra Towels"],
    availableHours: "24 hours",
    requestType: "On-Demand",
  },
  {
    id: "laundry",
    title: "Laundry & Dry Cleaning",
    description: "Premium garment care services",
    image: "/pristine-hotel-linens.png",
    href: "/guest/laundry",
    features: ["Same-Day Service", "Express Service", "Dry Cleaning", "Pressing"],
    availableHours: "7:00 AM - 10:00 PM",
    requestType: "Drop-off or Collection",
  },
]

// Banquet and conference facilities
export const banquetFacilities = [
  {
    id: "silver-bills",
    title: "Silver Bills Banquet",
    description: "Elegant venue for weddings, corporate events, and celebrations",
    image: "/silver-bills-banquet.png",
    href: "/guest/banquets/silver-bills",
    capacity: 350,
    area: "5000 sq ft",
    features: ["Partitionable", "Wedding Venue", "Corporate Events", "Customizable Layouts"],
    amenities: ["State-of-the-art AV", "High-speed Wi-Fi", "Dedicated Event Coordinator", "Catering Options"],
  },
  {
    id: "senate-hall",
    title: "Senate Conference Hall",
    description: "Modern facilities for business meetings and conferences",
    image: "/senate-conference-hall.png",
    href: "/guest/banquets/senate-hall",
    capacity: 150,
    area: "2500 sq ft",
    features: ["Business Meetings", "Conferences", "Modern AV Equipment", "Breakout Rooms"],
    amenities: ["Video Conferencing", "Interactive Displays", "Executive Seating", "Business Services"],
  },
  {
    id: "rooftop-venue",
    title: "Rooftop Venue",
    description: "Stunning open-air venue with panoramic city views",
    image: "/rooftop-venue.png",
    href: "/guest/banquets/rooftop-venue",
    capacity: 250,
    area: "3000 sq ft",
    features: ["Open Air", "Panoramic Views", "Wedding Receptions", "Cocktail Parties"],
    amenities: ["Weather Protection", "Ambient Lighting", "Sound System", "Flexible Seating"],
  }
]

// Tour and activity options
export const tourOptions = [
  {
    id: "city-tour",
    title: "Mumbai City Tour",
    description: "Explore the highlights of Mumbai with our expert guides",
    image: "/mumbai-tour.png",
    href: "/guest/tours/city-tour",
    duration: "8 hours",
    includes: ["Air-conditioned Vehicle", "Professional Guide", "Lunch", "Entrance Fees"],
    highlights: ["Gateway of India", "Marine Drive", "Dhobi Ghat", "Elephanta Caves"],
  },
  {
    id: "food-tour",
    title: "Mumbai Food Trail",
    description: "Taste the diverse culinary delights of Mumbai",
    image: "/placeholder.svg?height=200&width=400&query=Mumbai+Street+Food",
    href: "/guest/tours/food-tour",
    duration: "4 hours",
    includes: ["Walking Tour", "Food Tastings", "Culinary Guide", "Bottled Water"],
    highlights: ["Street Food", "Local Restaurants", "Spice Markets", "Sweet Shops"],
  },
  {
    id: "heritage-walk",
    title: "Heritage Walking Tour",
    description: "Discover Mumbai's colonial architecture and history",
    image: "/placeholder.svg?height=200&width=400&query=Mumbai+Colonial+Architecture",
    href: "/guest/tours/heritage-walk",
    duration: "3 hours",
    includes: ["Expert Historian Guide", "Refreshments", "Entry Tickets", "Map"],
    highlights: ["Victoria Terminus", "Fort Area", "University Buildings", "Art District"],
  },
  {
    id: "day-trips",
    title: "Day Trips from Mumbai",
    description: "Explore nearby attractions with convenient day excursions",
    image: "/placeholder.svg?height=200&width=400&query=Lonavala+Hills",
    href: "/guest/tours/day-trips",
    duration: "10-12 hours",
    includes: ["Transportation", "Guide", "Lunch", "Entrance Fees"],
    highlights: ["Lonavala", "Khandala", "Elephanta Caves", "Alibaug Beach"],
  },
]

// Facilities
export const hotelFacilities = [
  {
    id: "gym",
    title: "Fitness Center",
    description: "State-of-the-art equipment for your workout needs",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Gym",
    href: "/guest/facilities/gym",
    openingHours: "24 hours",
    location: "2nd Floor",
    features: ["Cardio Equipment", "Free Weights", "Personal Training", "Yoga Mats"],
  },
  {
    id: "pool",
    title: "Swimming Pool",
    description: "Relax and unwind in our temperature-controlled pool",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Pool",
    href: "/guest/facilities/pool",
    openingHours: "6:00 AM - 10:00 PM",
    location: "4th Floor",
    features: ["Temperature Controlled", "Poolside Service", "Towel Service", "Loungers"],
  },
  {
    id: "business-center",
    title: "Business Center",
    description: "Comprehensive business services for the working traveler",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Business+Center",
    href: "/guest/facilities/business-center",
    openingHours: "7:00 AM - 9:00 PM",
    location: "Lobby Level",
    features: ["Workstations", "Printing Services", "Meeting Rooms", "Administrative Support"],
  },
  {
    id: "concierge",
    title: "Concierge Services",
    description: "Personalized assistance for all your needs",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Concierge",
    href: "/guest/facilities/concierge",
    openingHours: "24 hours",
    location: "Lobby",
    features: ["Reservations", "Transportation", "Tickets & Tours", "Personal Shopping"],
  },
]

// Room types
export const roomTypes = [
  {
    id: "deluxe",
    title: "Deluxe Room",
    description: "Spacious and comfortable accommodation with modern amenities",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Deluxe+Room",
    href: "/guest/rooms/deluxe",
    size: "32 sq m",
    bedType: "King or Twin",
    occupancy: "2 Adults, 1 Child",
    features: ["City View", "Work Desk", "Mini Bar", "Rain Shower"],
  },
  {
    id: "premier",
    title: "Premier Room",
    description: "Enhanced comfort with additional space and premium amenities",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Premier+Room",
    href: "/guest/rooms/premier",
    size: "40 sq m",
    bedType: "King",
    occupancy: "2 Adults, 1 Child",
    features: ["Panoramic View", "Lounge Area", "Premium Toiletries", "Nespresso Machine"],
  },
  {
    id: "suite",
    title: "Executive Suite",
    description: "Luxurious suite with separate living area and exclusive benefits",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Suite",
    href: "/guest/rooms/suite",
    size: "60 sq m",
    bedType: "King",
    occupancy: "2 Adults, 2 Children",
    features: ["Separate Living Room", "Club Lounge Access", "Butler Service", "Jacuzzi Bathtub"],
  },
  {
    id: "presidential",
    title: "Presidential Suite",
    description: "The ultimate in luxury and sophistication",
    image: "/placeholder.svg?height=200&width=400&query=Luxury+Hotel+Presidential+Suite",
    href: "/guest/rooms/presidential",
    size: "120 sq m",
    bedType: "King",
    occupancy: "2 Adults, 2 Children",
    features: ["Dining Area", "Private Terrace", "Walk-in Closet", "Personalized Service"],
  },
]
