"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check, ImageIcon, Palette, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ManagerBranding() {
  const [primaryColor, setPrimaryColor] = useState("#d4af37")
  const [secondaryColor, setSecondaryColor] = useState("#1e293b")
  const [accentColor, setAccentColor] = useState("#0f766e")
  const [fontFamily, setFontFamily] = useState("inter")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branding Management</h1>
          <p className="text-muted-foreground">Customize the appearance and branding of the hotel portal</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="logos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logos">Logos & Images</TabsTrigger>
          <TabsTrigger value="colors">Colors & Themes</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="logos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo Management</CardTitle>
              <CardDescription>Upload and manage hotel logos for different applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Primary Logo</h3>
                    <p className="text-sm text-muted-foreground">
                      Main logo used across the portal and printed materials
                    </p>
                  </div>

                  <div className="flex items-center justify-center h-40 rounded-md border border-dashed bg-muted/50">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <ImageIcon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium">Drop logo here or click to upload</span>
                        <span className="text-xs text-muted-foreground">SVG, PNG or JPG (max. 2MB)</span>
                      </div>
                      <Button variant="outline" size="sm" className="relative">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Favicon</h3>
                    <p className="text-sm text-muted-foreground">Small icon displayed in browser tabs</p>
                  </div>

                  <div className="flex items-center justify-center h-40 rounded-md border border-dashed bg-muted/50">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                        <ImageIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium">Drop favicon here or click to upload</span>
                        <span className="text-xs text-muted-foreground">ICO, PNG or SVG (max. 1MB)</span>
                      </div>
                      <Button variant="outline" size="sm" className="relative">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Favicon
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Hero Images</h3>
                  <p className="text-sm text-muted-foreground">Banner images displayed on the portal homepage</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col space-y-2">
                      <div className="flex items-center justify-center h-40 rounded-md border border-dashed bg-muted/50">
                        <div className="flex flex-col items-center space-y-2 text-center p-4">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Hero Image {i}</span>
                          <Button variant="outline" size="sm" className="relative">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hero Image {i}</span>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize the color palette used throughout the portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: primaryColor }} />
                    <Input
                      id="primary-color"
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Main brand color used for primary elements</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: secondaryColor }} />
                    <Input
                      id="secondary-color"
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Complementary color for secondary elements</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: accentColor }} />
                    <Input
                      id="accent-color"
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Highlight color for calls-to-action</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Preview</h3>
                  <p className="text-sm text-muted-foreground">See how your color scheme looks in the interface</p>
                </div>

                <div className="p-6 rounded-md border" style={{ backgroundColor: secondaryColor }}>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md" style={{ backgroundColor: "white" }}>
                      <h4 className="text-lg font-medium mb-2" style={{ color: primaryColor }}>
                        Sample Card Title
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        This is how your content will appear with the selected color scheme.
                      </p>
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: accentColor }}>
                        Sample Button
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <div className="flex-1 p-4 rounded-md" style={{ backgroundColor: "white" }}>
                        <h5 className="text-sm font-medium mb-2" style={{ color: primaryColor }}>
                          Feature One
                        </h5>
                        <p className="text-xs text-gray-600">Feature description text.</p>
                      </div>
                      <div className="flex-1 p-4 rounded-md" style={{ backgroundColor: "white" }}>
                        <h5 className="text-sm font-medium mb-2" style={{ color: primaryColor }}>
                          Feature Two
                        </h5>
                        <p className="text-xs text-gray-600">Feature description text.</p>
                      </div>
                      <div className="flex-1 p-4 rounded-md" style={{ backgroundColor: "white" }}>
                        <h5 className="text-sm font-medium mb-2" style={{ color: primaryColor }}>
                          Feature Three
                        </h5>
                        <p className="text-xs text-gray-600">Feature description text.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  Reset to Default
                </Button>
                <Button>
                  <Palette className="mr-2 h-4 w-4" />
                  Apply Color Scheme
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
              <CardDescription>Configure fonts and text styles used in the portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="font-family">Primary Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                        <SelectItem value="playfair">Playfair Display</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Main font used throughout the portal</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heading-size">Heading Size Scale</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="heading-size">
                        <SelectValue placeholder="Select heading scale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="relaxed">Relaxed</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Size scale for heading elements</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body-size">Body Text Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="body-size">
                        <SelectValue placeholder="Select body text size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Size for body text content</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Typography Preview</h3>
                    <p className="text-sm text-muted-foreground">Preview of selected typography settings</p>
                  </div>

                  <div className="p-6 rounded-md border bg-white">
                    <div className="space-y-4">
                      <div>
                        <h1 className={`text-3xl font-bold ${fontFamily}`}>Heading 1</h1>
                        <p className="text-sm text-muted-foreground">Font: {fontFamily}, Size: 3xl</p>
                      </div>

                      <div>
                        <h2 className={`text-2xl font-semibold ${fontFamily}`}>Heading 2</h2>
                        <p className="text-sm text-muted-foreground">Font: {fontFamily}, Size: 2xl</p>
                      </div>

                      <div>
                        <h3 className={`text-xl font-medium ${fontFamily}`}>Heading 3</h3>
                        <p className="text-sm text-muted-foreground">Font: {fontFamily}, Size: xl</p>
                      </div>

                      <div>
                        <p className={`text-base ${fontFamily}`}>
                          This is a sample paragraph in the selected font family. It demonstrates how body text will
                          appear throughout the portal with the current typography settings.
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Font: {fontFamily}, Size: base</p>
                      </div>

                      <div>
                        <p className={`text-sm ${fontFamily}`}>
                          This is smaller text often used for secondary information and metadata.
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Font: {fontFamily}, Size: sm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  Reset to Default
                </Button>
                <Button>Apply Typography Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage hotel information and content displayed in the portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hotel-name">Hotel Name</Label>
                  <Input id="hotel-name" defaultValue="Goldfinch Hotels" />
                  <p className="text-xs text-muted-foreground mt-1">Official name displayed throughout the portal</p>
                </div>

                <div>
                  <Label htmlFor="hotel-tagline">Tagline</Label>
                  <Input id="hotel-tagline" defaultValue="Luxury Redefined" />
                  <p className="text-xs text-muted-foreground mt-1">Short slogan or tagline for the hotel</p>
                </div>

                <div>
                  <Label htmlFor="hotel-description">Hotel Description</Label>
                  <Textarea
                    id="hotel-description"
                    rows={4}
                    defaultValue="Experience unparalleled luxury at Goldfinch Hotels, where exceptional service meets elegant accommodations. Located in the heart of Mumbai, our hotel offers a perfect blend of traditional hospitality and modern amenities."
                  />
                  <p className="text-xs text-muted-foreground mt-1">Brief description of the hotel</p>
                </div>

                <div>
                  <Label htmlFor="contact-info">Contact Information</Label>
                  <Textarea
                    id="contact-info"
                    rows={3}
                    defaultValue="123 Marine Drive, Mumbai 400001, India
+91 22 1234 5678
info@goldfinchhotels.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Hotel contact details</p>
                </div>

                <div>
                  <Label htmlFor="social-media">Social Media Links</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex space-x-2">
                      <span className="w-24 text-sm">Facebook:</span>
                      <Input defaultValue="https://facebook.com/goldfinchhotels" />
                    </div>
                    <div className="flex space-x-2">
                      <span className="w-24 text-sm">Instagram:</span>
                      <Input defaultValue="https://instagram.com/goldfinchhotels" />
                    </div>
                    <div className="flex space-x-2">
                      <span className="w-24 text-sm">Twitter:</span>
                      <Input defaultValue="https://twitter.com/goldfinchhotels" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  Reset to Default
                </Button>
                <Button>Save Content</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
