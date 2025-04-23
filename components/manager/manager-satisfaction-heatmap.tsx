"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for satisfaction heatmap
const heatmapData = {
  "Room Service": {
    Breakfast: [4.7, 4.8, 4.6, 4.9, 4.7, 4.8, 4.9],
    Lunch: [4.6, 4.5, 4.7, 4.8, 4.6, 4.7, 4.8],
    Dinner: [4.8, 4.9, 4.7, 4.6, 4.8, 4.9, 4.7],
    "Late Night": [4.5, 4.6, 4.4, 4.5, 4.7, 4.8, 4.6],
  },
  Housekeeping: {
    "Morning Service": [4.5, 4.6, 4.4, 4.5, 4.3, 4.6, 4.7],
    "Evening Turndown": [4.7, 4.8, 4.6, 4.5, 4.7, 4.8, 4.6],
    "Special Requests": [4.4, 4.5, 4.3, 4.6, 4.5, 4.7, 4.4],
  },
  Spa: {
    Massage: [4.9, 4.8, 4.9, 5.0, 4.9, 4.8, 4.9],
    Facial: [4.8, 4.7, 4.9, 4.8, 4.7, 4.8, 4.9],
    "Body Treatment": [4.7, 4.8, 4.6, 4.7, 4.8, 4.9, 4.7],
  },
}

export function ManagerSatisfactionHeatmap() {
  const [serviceType, setServiceType] = useState("Room Service")

  const getColorForRating = (rating: number) => {
    if (rating >= 4.8) return "bg-green-500"
    if (rating >= 4.6) return "bg-green-400"
    if (rating >= 4.4) return "bg-green-300"
    if (rating >= 4.2) return "bg-amber-300"
    if (rating >= 4.0) return "bg-amber-400"
    return "bg-red-400"
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(heatmapData).map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(heatmapData[serviceType as keyof typeof heatmapData]).map(([service, ratings]) => (
              <tr key={service}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service}</td>
                {ratings.map((rating, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <div
                        className={`h-10 w-10 rounded-md flex items-center justify-center ${getColorForRating(rating)} text-white font-medium`}
                      >
                        {rating.toFixed(1)}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-2">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-green-500 mr-1"></div>
          <span className="text-xs">4.8-5.0</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-green-400 mr-1"></div>
          <span className="text-xs">4.6-4.7</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-green-300 mr-1"></div>
          <span className="text-xs">4.4-4.5</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-amber-300 mr-1"></div>
          <span className="text-xs">4.2-4.3</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-amber-400 mr-1"></div>
          <span className="text-xs">4.0-4.1</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-red-400 mr-1"></div>
          <span className="text-xs">&lt;4.0</span>
        </div>
      </div>
    </div>
  )
}
