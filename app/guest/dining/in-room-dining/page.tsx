"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Plus, Minus, Clock, ShoppingCart, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const menuCategories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "all-day", label: "All Day" },
  { id: "dinner", label: "Dinner" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Beverages" },
]

const menuItems = [
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potatoes, served with sambar and chutneys",
    price: 350,
    image: "https://t4.ftcdn.net/jpg/01/89/45/21/360_F_189452136_gJBG4ZRXY9NnZZCGV2s8QhObmpeerJTO.jpg",
    category: "breakfast",
    tags: ["vegetarian", "popular"],
    modifiers: {
      spiceLevel: [
        { id: "mild", label: "Mild" },
        { id: "medium", label: "Medium" },
        { id: "spicy", label: "Spicy" },
      ],
      extras: [
        { id: "extra-chutney", label: "Extra Chutney", price: 50 },
        { id: "ghee", label: "Extra Ghee", price: 30 },
      ],
    },
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Multigrain toast topped with smashed avocado, cherry tomatoes, and microgreens",
    price: 420,
    image: "https://media.istockphoto.com/id/1139597774/photo/toast-with-mashed-avocado-arugula.jpg?s=612x612&w=0&k=20&c=MXJpDlUCAMVnHCIuO6d4uq8iRXrJXegAYkGeuoTd5Wc=",
    category: "breakfast",
    tags: ["vegetarian", "healthy"],
    modifiers: {
      extras: [
        { id: "poached-egg", label: "Add Poached Egg", price: 60 },
        { id: "feta", label: "Add Feta Cheese", price: 50 },
      ],
    },
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    description: "Tender chicken in a rich tomato and butter gravy, served with naan",
    price: 550,
    image: "https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=",
    category: "all-day",
    tags: ["popular", "chef-special"],
    modifiers: {
      spiceLevel: [
        { id: "mild", label: "Mild" },
        { id: "medium", label: "Medium" },
        { id: "spicy", label: "Spicy" },
      ],
      extras: [
        { id: "extra-naan", label: "Extra Naan", price: 60 },
        { id: "extra-gravy", label: "Extra Gravy", price: 80 },
      ],
    },
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection, served with mint chutney",
    price: 480,
    image: "https://media.istockphoto.com/id/1186759790/photo/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-tikka-is-an-indian.jpg?s=612x612&w=0&k=20&c=cITToqM1KEnrixXjoLhEciqP24SxdKtW3QXykq-W5OE=",
    category: "all-day",
    tags: ["vegetarian"],
    modifiers: {
      spiceLevel: [
        { id: "mild", label: "Mild" },
        { id: "medium", label: "Medium" },
        { id: "spicy", label: "Spicy" },
      ],
    },
  },
]

export default function InRoomDiningPage() {
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, any>>({})
  const [specialInstructions, setSpecialInstructions] = useState("")

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setQuantity(1)
    setSelectedModifiers({})
    setSpecialInstructions("")
    setIsDialogOpen(true)
  }

  const handleAddToCart = () => {
    // In a real app, this would add the item to the cart
    console.log("Added to cart:", {
      item: selectedItem,
      quantity,
      modifiers: selectedModifiers,
      specialInstructions,
    })
    setIsDialogOpen(false)
  }

  const calculateTotalPrice = () => {
    if (!selectedItem) return 0

    let total = selectedItem.price * quantity

    // Add extras
    if (selectedModifiers.extras) {
      selectedItem.modifiers.extras?.forEach((extra: any) => {
        if (selectedModifiers.extras.includes(extra.id)) {
          total += extra.price * quantity
        }
      })
    }

    return total
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/dining">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">In-Room Dining</h1>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="h-4 w-4" />
        <span>Available 24/7 | Delivery Time: 30-45 minutes</span>
      </div>

      <Tabs defaultValue="breakfast" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full justify-start overflow-auto py-1 mb-4">
          {menuCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 data-[state=active]:bg-goldfinch-gold data-[state=active]:text-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {menuCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden luxury-shadow cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex">
                    <div className="relative w-1/3 h-32">
                      <Image src={item.image || "/placeholder.svg"} fill alt={item.name} className="object-cover" />
                    </div>
                    <CardContent className="p-4 w-2/3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="text-goldfinch-gold font-medium">₹{item.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex gap-2">
                        {item.tags.includes("vegetarian") && (
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                            Veg
                          </Badge>
                        )}
                        {item.tags.includes("popular") && (
                          <Badge variant="outline" className="text-goldfinch-gold border-goldfinch-gold text-xs">
                            Popular
                          </Badge>
                        )}
                        {item.tags.includes("chef-special") && (
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-600 text-xs flex items-center gap-1"
                          >
                            <Flame className="h-3 w-3" /> Chef's Special
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto px-4 py-6">
  {selectedItem && (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">{selectedItem.name}</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          {selectedItem.description}
        </DialogDescription>
      </DialogHeader>

      <div className="relative h-40 rounded-md overflow-hidden my-4">
        <Image
          src={selectedItem.image || "/placeholder.svg"}
          fill
          alt={selectedItem.name}
          className="object-cover"
        />
      </div>

      <div className="space-y-6">
        {selectedItem.modifiers.spiceLevel && (
          <div>
            <h4 className="text-sm font-medium mb-2">Spice Level</h4>
            <RadioGroup
              value={selectedModifiers.spiceLevel || "medium"}
              onValueChange={(value) =>
                setSelectedModifiers({ ...selectedModifiers, spiceLevel: value })
              }
            >
              {selectedItem.modifiers.spiceLevel.map((level: any) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.id} id={`spice-${level.id}`} />
                  <Label htmlFor={`spice-${level.id}`}>{level.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {selectedItem.modifiers.extras && (
          <div>
            <h4 className="text-sm font-medium mb-2">Extras</h4>
            <div className="space-y-2">
              {selectedItem.modifiers.extras.map((extra: any) => (
                <div key={extra.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`extra-${extra.id}`}
                      checked={(selectedModifiers.extras || []).includes(extra.id)}
                      onCheckedChange={(checked) => {
                        const currentExtras = selectedModifiers.extras || []
                        const newExtras = checked
                          ? [...currentExtras, extra.id]
                          : currentExtras.filter((id: string) => id !== extra.id)
                        setSelectedModifiers({ ...selectedModifiers, extras: newExtras })
                      }}
                    />
                    <Label htmlFor={`extra-${extra.id}`}>{extra.label}</Label>
                  </div>
                  <span className="text-sm text-muted-foreground">+₹{extra.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-2">Special Instructions</h4>
          <Textarea
            placeholder="Any special requests or allergies?"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="resize-none"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Quantity</h4>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6">
        <Button
          className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2 text-white font-semibold"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart - ₹{calculateTotalPrice()}
        </Button>
      </DialogFooter>
    </>
  )}
</DialogContent>
      </Dialog>
    </div>
  )
}
