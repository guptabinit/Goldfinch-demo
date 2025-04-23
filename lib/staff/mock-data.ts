// Mock data for staff dashboard

export const mockOrders = [
  {
    id: "order-1",
    guestName: "John Smith",
    roomNumber: "301",
    orderTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: "new",
    serviceType: "room_service",
    items: [
      { id: "item-1", name: "Club Sandwich", quantity: 1, price: 18.5 },
      { id: "item-2", name: "French Fries", quantity: 1, price: 8.0 },
      { id: "item-3", name: "Sparkling Water", quantity: 2, price: 5.0 },
    ],
    specialInstructions: "Please deliver within 30 minutes. Extra ketchup on the side.",
    totalAmount: 36.5,
    isUrgent: true,
    staffNotes: [],
  },
  {
    id: "order-2",
    guestName: "Sarah Johnson",
    roomNumber: "415",
    orderTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: "preparing",
    serviceType: "dining",
    items: [
      { id: "item-1", name: "Butter Chicken", quantity: 1, price: 24.0 },
      { id: "item-2", name: "Garlic Naan", quantity: 2, price: 4.5 },
      { id: "item-3", name: "Mango Lassi", quantity: 1, price: 6.0 },
    ],
    specialInstructions: "Medium spicy for the butter chicken.",
    totalAmount: 39.0,
    isUrgent: false,
    staffNotes: [
      {
        id: "note-1",
        text: "Guest called to confirm order is vegetarian-friendly",
        staffName: "Michael Chen",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
    ],
  },
  {
    id: "order-3",
    guestName: "Robert Williams",
    roomNumber: "208",
    orderTime: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    status: "completed",
    serviceType: "housekeeping",
    items: [
      { id: "item-1", name: "Extra Towels", quantity: 4, price: 0 },
      { id: "item-2", name: "Pillow Replacement", quantity: 2, price: 0 },
    ],
    totalAmount: 0,
    isUrgent: false,
    staffNotes: [],
  },
  {
    id: "order-4",
    guestName: "Emily Davis",
    roomNumber: "512",
    orderTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "new",
    serviceType: "spa",
    items: [
      { id: "item-1", name: "Swedish Massage", quantity: 1, price: 120.0 },
      { id: "item-2", name: "Aromatherapy Add-on", quantity: 1, price: 25.0 },
    ],
    specialInstructions: "Prefer female therapist. Allergic to lavender oil.",
    totalAmount: 145.0,
    isUrgent: false,
    staffNotes: [],
  },
  {
    id: "order-5",
    guestName: "Michael Brown",
    roomNumber: "107",
    orderTime: new Date(Date.now() - 1000 * 60 * 90), // 90 minutes ago
    status: "preparing",
    serviceType: "room_service",
    items: [
      { id: "item-1", name: "Eggs Benedict", quantity: 2, price: 16.0 },
      { id: "item-2", name: "Fresh Fruit Platter", quantity: 1, price: 12.0 },
      { id: "item-3", name: "Coffee", quantity: 2, price: 4.5 },
    ],
    specialInstructions: "No hollandaise sauce on one of the Eggs Benedict.",
    totalAmount: 53.0,
    isUrgent: false,
    staffNotes: [],
  },
  {
    id: "order-6",
    guestName: "Jennifer Wilson",
    roomNumber: "320",
    orderTime: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    status: "completed",
    serviceType: "housekeeping",
    items: [{ id: "item-1", name: "Room Cleaning", quantity: 1, price: 0 }],
    specialInstructions: "Please clean after 11 AM.",
    totalAmount: 0,
    isUrgent: false,
    staffNotes: [
      {
        id: "note-1",
        text: "Guest requested extra attention to bathroom cleaning",
        staffName: "Lisa Wong",
        timestamp: new Date(Date.now() - 1000 * 60 * 150),
      },
      {
        id: "note-2",
        text: "Completed at 11:45 AM. Left thank you note.",
        staffName: "Lisa Wong",
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
      },
    ],
  },
  {
    id: "order-7",
    guestName: "David Miller",
    roomNumber: "405",
    orderTime: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    status: "new",
    serviceType: "dining",
    items: [
      { id: "item-1", name: "Grilled Salmon", quantity: 1, price: 28.0 },
      { id: "item-2", name: "Caesar Salad", quantity: 1, price: 12.0 },
      { id: "item-3", name: "Cheesecake", quantity: 1, price: 9.0 },
      { id: "item-4", name: "Sparkling Water", quantity: 1, price: 5.0 },
    ],
    specialInstructions: "Salmon cooked medium. Dressing on the side for salad.",
    totalAmount: 54.0,
    isUrgent: true,
    staffNotes: [],
  },
  {
    id: "order-8",
    guestName: "Amanda Taylor",
    roomNumber: "219",
    orderTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: "preparing",
    serviceType: "spa",
    items: [{ id: "item-1", name: "Deep Tissue Massage", quantity: 1, price: 140.0 }],
    specialInstructions: "Focusing on lower back area.",
    totalAmount: 140.0,
    isUrgent: false,
    staffNotes: [
      {
        id: "note-1",
        text: "Guest is a regular. Prefers firm pressure.",
        staffName: "John Therapist",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
      },
    ],
  },
]

export const mockStaffPerformance = [
  {
    id: "staff-1",
    name: "Michael Chen",
    role: "Room Service Attendant",
    department: "Dining",
    avatar: "/blue-being.png",
    ordersCompleted: 28,
    averageResponseTime: 4.2, // minutes
    customerRating: 4.8,
    lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "staff-2",
    name: "Lisa Wong",
    role: "Housekeeping Supervisor",
    department: "Housekeeping",
    avatar: "/abstract-letter-L.png",
    ordersCompleted: 42,
    averageResponseTime: 6.5, // minutes
    customerRating: 4.9,
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "staff-3",
    name: "John Therapist",
    role: "Massage Therapist",
    department: "Spa",
    avatar: "/elemental-master.png",
    ordersCompleted: 18,
    averageResponseTime: 3.8, // minutes
    customerRating: 4.7,
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "staff-4",
    name: "Sarah Johnson",
    role: "Front Desk Manager",
    department: "Reception",
    avatar: "/mystical-forest-spirit.png",
    ordersCompleted: 35,
    averageResponseTime: 2.9, // minutes
    customerRating: 4.6,
    lastActive: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  },
]

export const mockServiceAvailability = [
  {
    id: "service-1",
    name: "Room Service",
    available: true,
    availableHours: "24 hours",
    estimatedDeliveryTime: "30-45 minutes",
    items: [
      { id: "item-1", name: "Club Sandwich", available: true, price: 18.5 },
      { id: "item-2", name: "Caesar Salad", available: true, price: 12.0 },
      { id: "item-3", name: "Margherita Pizza", available: false, price: 16.0, reason: "Chef unavailable" },
      { id: "item-4", name: "Burger & Fries", available: true, price: 22.0 },
      { id: "item-5", name: "Pasta Carbonara", available: true, price: 19.5 },
    ],
  },
  {
    id: "service-2",
    name: "Housekeeping",
    available: true,
    availableHours: "8:00 AM - 8:00 PM",
    estimatedDeliveryTime: "15-30 minutes",
    items: [
      { id: "item-1", name: "Room Cleaning", available: true, price: 0 },
      { id: "item-2", name: "Turndown Service", available: true, price: 0 },
      { id: "item-3", name: "Extra Towels", available: true, price: 0 },
      { id: "item-4", name: "Laundry Service", available: false, price: 0, reason: "Service unavailable after 6 PM" },
    ],
  },
  {
    id: "service-3",
    name: "Spa Services",
    available: true,
    availableHours: "9:00 AM - 9:00 PM",
    estimatedDeliveryTime: "Book in advance",
    items: [
      { id: "item-1", name: "Swedish Massage", available: true, price: 120.0 },
      { id: "item-2", name: "Deep Tissue Massage", available: true, price: 140.0 },
      { id: "item-3", name: "Hot Stone Massage", available: false, price: 160.0, reason: "Therapist unavailable" },
      { id: "item-4", name: "Facial Treatment", available: true, price: 95.0 },
    ],
  },
]
