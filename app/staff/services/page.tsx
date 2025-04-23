"use client"

import { useState } from "react"
import { Coffee, Utensils, Bed, SpadeIcon as Spa, Check, X, Clock, Edit, Save, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { mockServiceAvailability } from "@/lib/staff/mock-data"

// Service type icons
const serviceTypeIcons = {
  "Room Service": Coffee,
  Housekeeping: Bed,
  "Spa Services": Spa,
  Dining: Utensils,
}

export default function ServicesPage() {
  const { toast } = useToast()
  const [services, setServices] = useState(mockServiceAvailability)
  const [editingHours, setEditingHours] = useState<string | null>(null)
  const [editingTime, setEditingTime] = useState<string | null>(null)
  const [hoursValue, setHoursValue] = useState("")
  const [timeValue, setTimeValue] = useState("")

  const handleServiceToggle = (serviceId: string, available: boolean) => {
    setServices(services.map((service) => (service.id === serviceId ? { ...service, available } : service)))

    toast({
      title: `Service ${available ? "Enabled" : "Disabled"}`,
      description: `${services.find((s) => s.id === serviceId)?.name} is now ${available ? "available" : "unavailable"} for guests`,
    })
  }

  const handleItemToggle = (serviceId: string, itemId: string, available: boolean) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              items: service.items.map((item) => (item.id === itemId ? { ...item, available } : item)),
            }
          : service,
      ),
    )

    const serviceName = services.find((s) => s.id === serviceId)?.name
    const itemName = services.find((s) => s.id === serviceId)?.items.find((i) => i.id === itemId)?.name

    toast({
      title: `Item ${available ? "Enabled" : "Disabled"}`,
      description: `${itemName} is now ${available ? "available" : "unavailable"} in ${serviceName}`,
    })
  }

  const handleEditHours = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setEditingHours(serviceId)
      setHoursValue(service.availableHours)
    }
  }

  const handleSaveHours = (serviceId: string) => {
    setServices(
      services.map((service) => (service.id === serviceId ? { ...service, availableHours: hoursValue } : service)),
    )

    setEditingHours(null)

    toast({
      title: "Hours Updated",
      description: `Available hours have been updated for ${services.find((s) => s.id === serviceId)?.name}`,
    })
  }

  const handleEditTime = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setEditingTime(serviceId)
      setTimeValue(service.estimatedDeliveryTime)
    }
  }

  const handleSaveTime = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, estimatedDeliveryTime: timeValue } : service,
      ),
    )

    setEditingTime(null)

    toast({
      title: "Delivery Time Updated",
      description: `Estimated delivery time has been updated for ${services.find((s) => s.id === serviceId)?.name}`,
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <h1 className="text-2xl font-bold">Service Availability Management</h1>
        <p className="text-muted-foreground">Manage which services and items are available to guests</p>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue={services[0].id}>
          <TabsList className="mb-6">
            {services.map((service) => {
              const Icon = serviceTypeIcons[service.name as keyof typeof serviceTypeIcons]
              return (
                <TabsTrigger key={service.id} value={service.id} className="gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {service.name}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription>Manage availability and settings</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`service-${service.id}`} className="text-sm font-medium">
                        {service.available ? "Available" : "Unavailable"}
                      </Label>
                      <Switch
                        id={`service-${service.id}`}
                        checked={service.available}
                        onCheckedChange={(checked) => handleServiceToggle(service.id, checked)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Available Hours</Label>
                        {editingHours === service.id ? (
                          <Button variant="ghost" size="sm" onClick={() => handleSaveHours(service.id)}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => handleEditHours(service.id)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                      {editingHours === service.id ? (
                        <Input
                          value={hoursValue}
                          onChange={(e) => setHoursValue(e.target.value)}
                          placeholder="e.g. 8:00 AM - 10:00 PM"
                          className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{service.availableHours}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Estimated Delivery Time</Label>
                        {editingTime === service.id ? (
                          <Button variant="ghost" size="sm" onClick={() => handleSaveTime(service.id)}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => handleEditTime(service.id)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                      {editingTime === service.id ? (
                        <Input
                          value={timeValue}
                          onChange={(e) => setTimeValue(e.target.value)}
                          placeholder="e.g. 30-45 minutes"
                          className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{service.estimatedDeliveryTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Items & Services</h3>
                    <div className="space-y-4">
                      {service.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.price > 0 && (
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            )}
                            {!item.available && item.reason && (
                              <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                                <AlertTriangle className="h-3 w-3" />
                                <span>{item.reason}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`item-${item.id}`} className="sr-only">
                              {item.available ? "Available" : "Unavailable"}
                            </Label>
                            <div className="flex items-center gap-1">
                              {item.available ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                              <Switch
                                id={`item-${item.id}`}
                                checked={item.available}
                                onCheckedChange={(checked) => handleItemToggle(service.id, item.id, checked)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    {service.items.filter((item) => item.available).length} of {service.items.length} items available
                  </p>
                  <Button
                    variant={service.available ? "default" : "outline"}
                    className={
                      service.available
                        ? "bg-goldfinch-gold hover:bg-goldfinch-gold/90"
                        : "text-goldfinch-gold border-goldfinch-gold/30 hover:bg-goldfinch-gold/10"
                    }
                    onClick={() => handleServiceToggle(service.id, !service.available)}
                  >
                    {service.available ? (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Disable Service
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Enable Service
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
