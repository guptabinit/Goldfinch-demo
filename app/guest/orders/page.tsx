import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock orders data
const orders = [
  {
    id: "GF12345",
    status: "preparing",
    date: "April 20, 2023",
    time: "10:30 AM",
    service: "In-Room Dining",
    items: [
      {
        name: "Butter Chicken",
        quantity: 1,
      },
      {
        name: "Avocado Toast",
        quantity: 2,
      },
    ],
    total: 1277,
    image: "https://media.istockphoto.com/id/1209739507/photo/all-that-you-need-waitress-in-uniform-delivering-tray-with-food-in-a-room-of-hotel-room.jpg?s=612x612&w=0&k=20&c=z90y1f283lp57wFmFX6iRp3yiQ1iLEY8qPPhV6J6pYg=",
  },
  {
    id: "GF12344",
    status: "delivered",
    date: "April 19, 2023",
    time: "8:15 PM",
    service: "In-Room Dining",
    items: [
      {
        name: "Paneer Tikka",
        quantity: 1,
      },
      {
        name: "Garlic Naan",
        quantity: 2,
      },
    ],
    total: 850,
    image: "https://media.istockphoto.com/id/1209739507/photo/all-that-you-need-waitress-in-uniform-delivering-tray-with-food-in-a-room-of-hotel-room.jpg?s=612x612&w=0&k=20&c=z90y1f283lp57wFmFX6iRp3yiQ1iLEY8qPPhV6J6pYg=",
  },
  {
    id: "GF12343",
    status: "cancelled",
    date: "April 19, 2023",
    time: "2:45 PM",
    service: "Spa",
    items: [
      {
        name: "Swedish Massage",
        quantity: 1,
      },
    ],
    total: 2500,
    image: "https://t4.ftcdn.net/jpg/03/93/85/55/360_F_393855516_0BcgVZqNlVrvDE0kiD3YTlVJaur8Q02G.jpg",
  },
  {
    id: "GF12342",
    status: "delivered",
    date: "April 18, 2023",
    time: "7:30 PM",
    service: "Laundry",
    items: [
      {
        name: "Shirt",
        quantity: 3,
      },
      {
        name: "Trousers",
        quantity: 2,
      },
    ],
    total: 750,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzmh03Pdq2cpBiXRxMEaCsQWGHFY5-mdDRw&s",
  },
]

export default function OrdersPage() {
  const activeOrders = orders.filter((order) => ["received", "preparing", "on-the-way"].includes(order.status))
  const pastOrders = orders.filter((order) => ["delivered", "cancelled"].includes(order.status))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received":
        return <Badge className="bg-blue-500">Received</Badge>
      case "preparing":
        return <Badge className="bg-goldfinch-gold">Preparing</Badge>
      case "on-the-way":
        return <Badge className="bg-amber-500">On the way</Badge>
      case "delivered":
        return <Badge className="bg-green-600">Delivered</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "received":
      case "preparing":
      case "on-the-way":
        return <Clock className="h-4 w-4 text-goldfinch-gold" />
      case "delivered":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">My Orders</h1>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {activeOrders.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-lg font-medium mb-2">No active orders</h2>
              <p className="text-muted-foreground mb-6">You don't have any active orders at the moment</p>
              <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Link href="/guest">Browse Services</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Link key={order.id} href={`/guest/orders/${order.id}`}>
                  <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition">
                    <CardContent className="p-0">
                      <div className="flex p-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={order.image || "/placeholder.svg"}
                            fill
                            alt={order.service}
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                {order.service}
                                {getStatusBadge(order.status)}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Order #{order.id} • {order.date}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="mt-2">
                            <p className="text-sm line-clamp-1">
                              {order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center gap-1 text-sm">
                                {getStatusIcon(order.status)}
                                <span className="text-muted-foreground">
                                  {order.status === "received" && "Order received"}
                                  {order.status === "preparing" && "Preparing your order"}
                                  {order.status === "on-the-way" && "On the way to your room"}
                                </span>
                              </div>
                              <span className="font-medium">₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastOrders.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-lg font-medium mb-2">No past orders</h2>
              <p className="text-muted-foreground mb-6">You don't have any past orders</p>
              <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Link href="/guest">Browse Services</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <Link key={order.id} href={`/guest/orders/${order.id}`}>
                  <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition">
                    <CardContent className="p-0">
                      <div className="flex p-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={order.image || "/placeholder.svg"}
                            fill
                            alt={order.service}
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                {order.service}
                                {getStatusBadge(order.status)}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Order #{order.id} • {order.date}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="mt-2">
                            <p className="text-sm line-clamp-1">
                              {order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center gap-1 text-sm">
                                {getStatusIcon(order.status)}
                                <span className="text-muted-foreground">
                                  {order.status === "delivered" && "Delivered"}
                                  {order.status === "cancelled" && "Cancelled"}
                                </span>
                              </div>
                              <span className="font-medium">₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
