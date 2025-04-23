"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Calendar,
  Clock,
  Dumbbell,
  Users,
  User,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function GymPage() {
  const { toast } = useToast()
  const [activeDay, setActiveDay] = useState("monday")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleBookClass = (className: string) => {
    toast({
      title: "Class Booked",
      description: `You've successfully booked ${className}. Check your email for confirmation.`,
      duration: 5000,
    })
  }

  const handleBookTrainer = () => {
    toast({
      title: "Request Sent",
      description: "Your personal training request has been sent. Our fitness team will contact you shortly.",
      duration: 5000,
    })
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const classes = {
    monday: [
      { time: "07:00 - 08:00", name: "Morning Yoga", instructor: "Priya S.", level: "All Levels", spots: "8/12" },
      { time: "09:00 - 10:00", name: "HIIT Circuit", instructor: "James T.", level: "Intermediate", spots: "6/10" },
      { time: "18:00 - 19:00", name: "Core Strength", instructor: "Michael R.", level: "All Levels", spots: "10/15" },
    ],
    tuesday: [
      { time: "07:00 - 08:00", name: "Pilates", instructor: "Sarah M.", level: "All Levels", spots: "7/12" },
      { time: "12:00 - 13:00", name: "Spin Class", instructor: "David K.", level: "Intermediate", spots: "8/12" },
      { time: "18:00 - 19:00", name: "Strength Training", instructor: "Robert J.", level: "All Levels", spots: "5/10" },
    ],
    wednesday: [
      { time: "07:00 - 08:00", name: "Morning Yoga", instructor: "Priya S.", level: "All Levels", spots: "8/12" },
      { time: "09:00 - 10:00", name: "Boxing Fitness", instructor: "Alex P.", level: "Beginner", spots: "6/8" },
      { time: "18:00 - 19:00", name: "Functional Training", instructor: "Michael R.", level: "Advanced", spots: "4/8" },
    ],
    thursday: [
      {
        time: "07:00 - 08:00",
        name: "Stretching & Mobility",
        instructor: "Lisa T.",
        level: "All Levels",
        spots: "10/15",
      },
      { time: "12:00 - 13:00", name: "Spin Class", instructor: "David K.", level: "Intermediate", spots: "8/12" },
      { time: "18:00 - 19:00", name: "HIIT Circuit", instructor: "James T.", level: "Intermediate", spots: "7/10" },
    ],
    friday: [
      { time: "07:00 - 08:00", name: "Morning Yoga", instructor: "Priya S.", level: "All Levels", spots: "8/12" },
      { time: "12:00 - 13:00", name: "Core Strength", instructor: "Michael R.", level: "All Levels", spots: "9/15" },
      {
        time: "18:00 - 19:00",
        name: "Total Body Workout",
        instructor: "Robert J.",
        level: "Intermediate",
        spots: "6/10",
      },
    ],
    saturday: [
      { time: "09:00 - 10:00", name: "Weekend Yoga", instructor: "Priya S.", level: "All Levels", spots: "10/15" },
      { time: "11:00 - 12:00", name: "Bootcamp", instructor: "James T.", level: "Advanced", spots: "8/12" },
      { time: "16:00 - 17:00", name: "Pilates", instructor: "Sarah M.", level: "All Levels", spots: "7/12" },
    ],
    sunday: [
      { time: "09:00 - 10:00", name: "Gentle Yoga", instructor: "Lisa T.", level: "Beginner", spots: "8/12" },
      {
        time: "11:00 - 12:00",
        name: "Meditation & Stretching",
        instructor: "Priya S.",
        level: "All Levels",
        spots: "12/15",
      },
    ],
  }

  const faqs = [
    {
      question: "What are the gym operating hours?",
      answer: "Our fitness center is open 24 hours for hotel guests. Access is available with your room key card.",
    },
    {
      question: "Do I need to bring my own towel?",
      answer: "No, we provide fresh towels at the gym entrance. Simply return them to the designated bins after use.",
    },
    {
      question: "How do I book a fitness class?",
      answer:
        "You can book fitness classes through this page, at the front desk, or by calling our fitness center directly at ext. 4580 from your room.",
    },
    {
      question: "Is there an additional fee for fitness classes?",
      answer:
        "Most fitness classes are complimentary for hotel guests. Premium classes and personal training sessions may have additional fees.",
    },
    {
      question: "Can I request a specific personal trainer?",
      answer:
        "Yes, you can request a specific trainer when booking a personal training session. We'll do our best to accommodate your preference based on availability.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/guest" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Guest Dashboard
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
          alt="Goldfinch Hotel Fitness Center"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Fitness Center</h1>
          <p className="text-white/90 max-w-2xl">
            Our state-of-the-art fitness center offers premium equipment, expert trainers, and a variety of classes to
            keep you energized during your stay.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="trainers">Personal Training</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Our Premium Fitness Center</h2>
                <p>
                  The Goldfinch Hotel Fitness Center offers a luxurious environment for maintaining your fitness routine
                  while traveling. Our facility features premium equipment, expert trainers, and a variety of classes to
                  suit all fitness levels.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Image
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
                    alt="Cardio Equipment"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-[200px]"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Strength Training Area"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-[200px]"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Complimentary towel service
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Filtered water stations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Luxury changing rooms
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Shower facilities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Complimentary earbuds
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Fitness assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Chilled towels
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                    Fresh fruit
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Hours & Access</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-goldfinch-amber" />
                    <span className="font-medium">Fitness Center: 24 hours daily</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-goldfinch-amber" />
                    <span className="font-medium">Fitness Classes: 7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-goldfinch-amber" />
                    <span className="font-medium">Personal Training: 8:00 AM - 8:00 PM (by appointment)</span>
                  </div>
                </div>

                <div className="bg-goldfinch-ivory/30 border border-goldfinch-amber/20 p-4 rounded-lg">
                  <h4 className="flex items-center text-lg font-medium mb-2">
                    <Info className="h-5 w-5 mr-2 text-goldfinch-amber" />
                    Health & Safety
                  </h4>
                  <p className="text-sm">
                    For your safety and comfort, we regularly sanitize all equipment and maintain high cleanliness
                    standards. Please wipe down equipment after use with the provided sanitizing wipes.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Premium Fitness Equipment</h2>
                <p>
                  Our fitness center features top-of-the-line equipment from leading brands to ensure a comprehensive
                  and effective workout experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <Image
                    src="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop"
                    alt="Treadmills"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-[180px]"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
                    alt="Free Weights"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-[180px]"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2071&auto=format&fit=crop"
                    alt="Resistance Machines"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-[180px]"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Cardio Equipment</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Treadmills with integrated screens
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Elliptical trainers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Stationary bikes
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Stair climbers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Rowing machines
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Assault bikes
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Strength Training</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Free weights (1-50kg)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Smith machines
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Cable machines
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Bench press stations
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Squat racks
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Resistance machines
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Functional Training</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        TRX suspension trainers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Kettlebells
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Medicine balls
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Resistance bands
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        BOSU balls
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Foam rollers
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Stretching & Recovery</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Yoga mats
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Stretching area
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Foam rollers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-goldfinch-amber"></div>
                        Massage guns
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-goldfinch-ivory/30 border border-goldfinch-amber/20 p-4 rounded-lg">
                  <h4 className="flex items-center text-lg font-medium mb-2">
                    <Info className="h-5 w-5 mr-2 text-goldfinch-amber" />
                    Equipment Assistance
                  </h4>
                  <p className="text-sm">
                    Not familiar with a piece of equipment? Our fitness staff is available to provide guidance on proper
                    usage. Just ask at the fitness center desk or call ext. 4580 from your room.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Fitness Classes</h2>
                <p>
                  Join our expert-led fitness classes designed for all levels. From energizing morning yoga to
                  high-intensity interval training, we offer a variety of options to enhance your fitness routine.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Image
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
                    alt="Yoga Class"
                    width={400}
                    height={250}
                    className="rounded-lg object-cover w-full h-[200px]"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2074&auto=format&fit=crop"
                    alt="HIIT Class"
                    width={400}
                    height={250}
                    className="rounded-lg object-cover w-full h-[200px]"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>

                <div className="mb-6">
                  <div className="flex overflow-x-auto pb-2 mb-4">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`px-4 py-2 whitespace-nowrap capitalize font-medium text-sm rounded-md mr-2 ${
                          activeDay === day
                            ? "bg-goldfinch-amber text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {classes[activeDay as keyof typeof classes].map((cls, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{cls.name}</CardTitle>
                              <CardDescription>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {cls.time}
                                </span>
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-goldfinch-ivory/50">
                              {cls.level}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <User className="h-3 w-3 mr-1" /> Instructor: {cls.instructor}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-3 w-3 mr-1" /> Available: {cls.spots}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full"
                            onClick={() => handleBookClass(cls.name)}
                          >
                            Book Class
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="bg-goldfinch-ivory/30 border border-goldfinch-amber/20 p-4 rounded-lg">
                  <h4 className="flex items-center text-lg font-medium mb-2">
                    <Info className="h-5 w-5 mr-2 text-goldfinch-amber" />
                    Class Information
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• Please arrive 10 minutes before class start time</li>
                    <li>• Wear comfortable athletic attire and appropriate footwear</li>
                    <li>• Bring a water bottle (water stations available)</li>
                    <li>• Towels are provided at the fitness center entrance</li>
                    <li>• Classes are complimentary for hotel guests</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Personal Training Tab */}
            <TabsContent value="trainers" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Personal Training</h2>
                <p>
                  Elevate your fitness experience with our certified personal trainers. Whether you're looking to
                  maintain your routine, start a new fitness journey, or prepare for a specific event, our trainers can
                  customize a program to meet your goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
                      alt="Personal Trainer James"
                      width={300}
                      height={400}
                      className="rounded-lg object-cover w-full h-[280px]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 rounded-b-lg">
                      <h4 className="text-white font-medium">James T.</h4>
                      <p className="text-white/80 text-sm">HIIT & Strength Specialist</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop"
                      alt="Personal Trainer Priya"
                      width={300}
                      height={400}
                      className="rounded-lg object-cover w-full h-[280px]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 rounded-b-lg">
                      <h4 className="text-white font-medium">Priya S.</h4>
                      <p className="text-white/80 text-sm">Yoga & Wellness Coach</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1567598508481-65985588e295?q=80&w=1974&auto=format&fit=crop"
                      alt="Personal Trainer Michael"
                      width={300}
                      height={400}
                      className="rounded-lg object-cover w-full h-[280px]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 rounded-b-lg">
                      <h4 className="text-white font-medium">Michael R.</h4>
                      <p className="text-white/80 text-sm">Functional Training Expert</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Training Options</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Single Session</CardTitle>
                      <CardDescription>Perfect for a focused workout or introduction</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-goldfinch-amber mr-2 flex-shrink-0">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <span>60-minute personalized session</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-goldfinch-amber mr-2 flex-shrink-0">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <span>Fitness assessment included</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-goldfinch-amber mr-2 flex-shrink-0">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <span>Workout plan to take home</span>
                        </li>
                      </ul>
                      <div className="mt-4 text-xl font-semibold">₹3,500</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Package (3 Sessions)</CardTitle>
                      <CardDescription>Ideal for guests staying multiple days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-goldfinch-amber mr-2 flex-shrink-0">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <span>Three 60-minute sessions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-goldfinch-amber mr-2 flex-shrink-0">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <span>Comprehensive fitness assessment</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-goldfinch-amber mr-2 flex-shrink-0">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <span>Customized program to continue at home</span>
                        </li>
                      </ul>
                      <div className="mt-4 text-xl font-semibold">₹9,000</div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold mb-4">Book a Session</h3>

                <Card>
                  <CardContent className="pt-6">
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleBookTrainer()
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="trainer" className="text-sm font-medium">
                            Preferred Trainer
                          </label>
                          <select id="trainer" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="">
                            <option value="" disabled>
                              Select a trainer
                            </option>
                            <option value="james">James T. - HIIT & Strength</option>
                            <option value="priya">Priya S. - Yoga & Wellness</option>
                            <option value="michael">Michael R. - Functional Training</option>
                            <option value="any">No preference</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="session-type" className="text-sm font-medium">
                            Session Type
                          </label>
                          <select
                            id="session-type"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select session type
                            </option>
                            <option value="single">Single Session</option>
                            <option value="package">Package (3 Sessions)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm font-medium">
                            Preferred Date
                          </label>
                          <input type="date" id="date" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="time" className="text-sm font-medium">
                            Preferred Time
                          </label>
                          <select id="time" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="">
                            <option value="" disabled>
                              Select a time
                            </option>
                            <option value="morning">Morning (8:00 - 11:00)</option>
                            <option value="afternoon">Afternoon (12:00 - 16:00)</option>
                            <option value="evening">Evening (17:00 - 20:00)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="goals" className="text-sm font-medium">
                          Fitness Goals & Notes
                        </label>
                        <textarea
                          id="goals"
                          rows={3}
                          placeholder="Tell us about your fitness goals and any specific areas you'd like to focus on..."
                          className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                      </div>

                      <Button type="submit" className="w-full">
                        Request Personal Training
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h4 className="font-medium">Hours</h4>
                  <p className="text-sm text-gray-600">24 hours daily</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h4 className="font-medium">Access</h4>
                  <p className="text-sm text-gray-600">Room key required</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Dumbbell className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h4 className="font-medium">Equipment</h4>
                  <p className="text-sm text-gray-600">Premium cardio & strength</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h4 className="font-medium">Classes</h4>
                  <p className="text-sm text-gray-600">Daily, 7:00 AM - 7:00 PM</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Virtual Tour Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Virtual Tour</CardTitle>
              <CardDescription>Explore our fitness center before your visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[180px] rounded-md overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1570829460005-c840387bb1ca?q=80&w=2132&auto=format&fit=crop"
                  alt="Fitness Center Virtual Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button variant="outline" className="bg-white/90 hover:bg-white">
                    View Tour
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left font-medium py-2"
                  >
                    {faq.question}
                    {expandedFaq === index ? (
                      <ChevronUp className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && <div className="text-sm text-gray-600 pt-1 pb-2">{faq.answer}</div>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
