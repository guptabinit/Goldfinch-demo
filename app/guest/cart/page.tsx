"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Trash2, Clock, CreditCard, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

// Mock cart items
const initialCartItems = [
  {
    id: "butter-chicken-1",
    name: "Butter Chicken",
    price: 550,
    quantity: 1,
    image: "/creamy-butter-chicken.png",
    modifiers: {
      spiceLevel: "medium",
      extras: ["extra-naan"],
    },
    extrasCost: 60,
  },
  {
    id: "avocado-toast-1",
    name: "Avocado Toast",
    price: 420,
    quantity: 2,
    image: "/vibrant-avocado-toast.png",
    modifiers: {
      extras: ["poached-egg", "feta"],
    },
    extrasCost: 110,
  },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [paymentMethod, setPaymentMethod] = useState("room-charge")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const calculateItemTotal = (item: any) => {
    return (item.price + item.extrasCost) * item.quantity
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)
  }

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.05) // 5% tax
  }

  const calculateServiceCharge = () => {
    return Math.round(calculateSubtotal() * 0.1) // 10% service charge
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateServiceCharge()
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate API call
    setTimeout(() => {
      router.push("/guest/orders/confirmation")
    }, 1500)
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
        <h1 className="text-xl font-semibold">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add items to your cart to continue</p>
          <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
            <Link href="/guest">Browse Services</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex p-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} fill alt={item.name} className="object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="font-medium">₹{calculateItemTotal(item)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>
                        Qty: {item.quantity} × ₹{item.price}
                      </div>
                      {item.modifiers.spiceLevel && (
                        <div>
                          Spice:{" "}
                          {item.modifiers.spiceLevel.charAt(0).toUpperCase() + item.modifiers.spiceLevel.slice(1)}
                        </div>
                      )}
                      {item.modifiers.extras && item.modifiers.extras.length > 0 && (
                        <div>
                          Extras:{" "}
                          {item.modifiers.extras
                            .map((extra: string) =>
                              extra
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" "),
                            )
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%)</span>
                  <span>₹{calculateTax()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Charge (10%)</span>
                  <span>₹{calculateServiceCharge()}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-goldfinch-gold" />
                <span>Estimated delivery time: 30-45 minutes</span>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Special Instructions</h3>
                <Textarea
                  placeholder="Any special requests for delivery?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guest-name">Guest Name</Label>
                    <Input
                      id="guest-name"
                      placeholder="Enter your name"
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-number">Room Number</Label>
                    <Input
                      id="room-number"
                      placeholder="e.g. 301"
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                </div>
              </div>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center justify-between space-x-2 border rounded-md p-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="room-charge" id="room-charge" />
                    <Label htmlFor="room-charge" className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Charge to Room
                    </Label>
                  </div>
                  <span className="text-sm text-muted-foreground">Room 301</span>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
