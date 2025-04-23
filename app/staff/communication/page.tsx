"use client"

import { useState } from "react"
import { MessageSquare, Phone, Send, User, Search, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"

// Mock guest data
const mockGuests = [
  {
    id: "guest-1",
    name: "John Smith",
    roomNumber: "301",
    avatar: "/elemental-master.png",
    hasUnread: true,
    lastMessage: "I'd like to request extra towels please.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "guest-2",
    name: "Sarah Johnson",
    roomNumber: "415",
    avatar: "/mystical-forest-spirit.png",
    hasUnread: false,
    lastMessage: "What time does the spa open tomorrow?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "guest-3",
    name: "Robert Williams",
    roomNumber: "208",
    avatar: "/abstract-letter-r.png",
    hasUnread: false,
    lastMessage: "Thank you for the excellent service!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "guest-4",
    name: "Emily Davis",
    roomNumber: "512",
    avatar: "/placeholder.svg?height=200&width=200&query=Avatar+E",
    hasUnread: true,
    lastMessage: "Is room service still available?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
]

// Mock messages
const mockMessages = {
  "guest-1": [
    {
      id: "msg-1",
      sender: "guest",
      text: "Hello, I'd like to request extra towels please.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: "msg-2",
      sender: "staff",
      text: "Of course, Mr. Smith. How many towels would you like?",
      timestamp: new Date(Date.now() - 1000 * 60 * 14), // 14 minutes ago
    },
    {
      id: "msg-3",
      sender: "guest",
      text: "Two bath towels and one hand towel would be great.",
      timestamp: new Date(Date.now() - 1000 * 60 * 13), // 13 minutes ago
    },
  ],
  "guest-4": [
    {
      id: "msg-1",
      sender: "guest",
      text: "Is room service still available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
  ],
}

// Mock callback requests
const mockCallbacks = [
  {
    id: "callback-1",
    guestName: "Michael Brown",
    roomNumber: "107",
    requestTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    reason: "Question about check-out time",
    status: "pending",
    phoneNumber: "+1 (555) 123-4567",
  },
  {
    id: "callback-2",
    guestName: "Jennifer Wilson",
    roomNumber: "320",
    requestTime: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    reason: "Issue with room temperature",
    status: "completed",
    phoneNumber: "+1 (555) 987-6543",
    completedBy: "Sarah Johnson",
    completedAt: new Date(Date.now() - 1000 * 60 * 90), // 90 minutes ago
  },
]

export default function CommunicationPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<string | null>("guest-1")
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [guests, setGuests] = useState(mockGuests)
  const [callbacks, setCallbacks] = useState(mockCallbacks)

  const filteredGuests = searchQuery
    ? guests.filter(
        (guest) =>
          guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || guest.roomNumber.includes(searchQuery),
      )
    : guests

  const currentMessages = selectedGuest ? messages[selectedGuest] || [] : []
  const currentGuest = guests.find((g) => g.id === selectedGuest)

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedGuest) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "staff",
      text: messageText,
      timestamp: new Date(),
    }

    // Update messages
    setMessages((prev) => ({
      ...prev,
      [selectedGuest]: [...(prev[selectedGuest] || []), newMessage],
    }))

    // Update guest's last message
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === selectedGuest
          ? {
              ...guest,
              lastMessage: messageText,
              lastMessageTime: new Date(),
              hasUnread: false,
            }
          : guest,
      ),
    )

    setMessageText("")

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the guest",
    })
  }

  const handleSelectGuest = (guestId: string) => {
    setSelectedGuest(guestId)

    // Mark as read when selecting
    setGuests((prev) => prev.map((guest) => (guest.id === guestId ? { ...guest, hasUnread: false } : guest)))
  }

  const handleCompleteCallback = (callbackId: string) => {
    setCallbacks((prev) =>
      prev.map((callback) =>
        callback.id === callbackId
          ? {
              ...callback,
              status: "completed",
              completedBy: "You",
              completedAt: new Date(),
            }
          : callback,
      ),
    )

    toast({
      title: "Callback Completed",
      description: "The callback request has been marked as completed",
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <h1 className="text-2xl font-bold">Guest Communication</h1>
        <p className="text-muted-foreground">Chat with guests and manage callback requests</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="my-2">
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="callbacks" className="gap-2">
                <Phone className="h-4 w-4" />
                Callback Requests
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 overflow-hidden p-0 m-0">
            <div className="grid h-full grid-cols-1 md:grid-cols-3">
              {/* Guest List */}
              <div className="border-r">
                <div className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search guests..."
                      className="pl-8 border-goldfinch-gold/20 focus:border-goldfinch-gold"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
                        <div
                          key={guest.id}
                          className={`flex items-start gap-3 p-3 rounded-md cursor-pointer ${
                            selectedGuest === guest.id ? "bg-goldfinch-gold/10" : "hover:bg-muted"
                          }`}
                          onClick={() => handleSelectGuest(guest.id)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={guest.avatar || "/placeholder.svg"} alt={guest.name} />
                            <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{guest.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(guest.lastMessageTime), "h:mm a")}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="h-5 px-1">
                                Room {guest.roomNumber}
                              </Badge>
                              {guest.hasUnread && <Badge className="h-5 px-1 bg-goldfinch-gold">New</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground truncate mt-1">{guest.lastMessage}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">No guests found matching your search.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="col-span-2 flex flex-col h-full">
                {selectedGuest && currentGuest ? (
                  <>
                    <div className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentGuest.avatar || "/placeholder.svg"} alt={currentGuest.name} />
                          <AvatarFallback>{currentGuest.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{currentGuest.name}</p>
                          <p className="text-sm text-muted-foreground">Room {currentGuest.roomNumber}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto gap-1">
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {currentMessages.length > 0 ? (
                        currentMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "staff" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === "staff" ? "bg-goldfinch-gold text-white" : "bg-muted"
                              }`}
                            >
                              <p>{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "staff" ? "text-white/70" : "text-muted-foreground"
                                }`}
                              >
                                {format(new Date(message.timestamp), "h:mm a")}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <MessageSquare className="h-12 w-12 text-muted-foreground opacity-20" />
                          <p className="mt-4 text-muted-foreground">No messages yet</p>
                        </div>
                      )}
                    </div>

                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          className="min-h-[80px] border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90" onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <MessageSquare className="h-16 w-16 text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
                    <p className="text-muted-foreground">Select a guest from the list to start chatting</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="callbacks" className="flex-1 p-6 overflow-auto m-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {callbacks.map((callback) => (
                <Card key={callback.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{callback.guestName}</CardTitle>
                      <Badge
                        variant={callback.status === "completed" ? "outline" : "default"}
                        className={callback.status === "completed" ? "" : "bg-goldfinch-gold"}
                      >
                        {callback.status === "completed" ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Room {callback.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{callback.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{format(new Date(callback.requestTime), "MMM d, h:mm a")}</span>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-sm font-medium">Reason for callback:</p>
                      <p className="text-sm text-muted-foreground">{callback.reason}</p>
                    </div>

                    {callback.status === "completed" && callback.completedBy && (
                      <div>
                        <p className="text-sm font-medium">Completed by:</p>
                        <p className="text-sm text-muted-foreground">
                          {callback.completedBy} ({format(new Date(callback.completedAt!), "MMM d, h:mm a")})
                        </p>
                      </div>
                    )}

                    {callback.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 bg-goldfinch-gold hover:bg-goldfinch-gold/90"
                          onClick={() => handleCompleteCallback(callback.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Completed
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
