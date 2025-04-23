import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-goldfinch-ivory/50 border-b border-goldfinch-amber/10">
        <div className="container mx-auto px-4 py-2 max-w-7xl">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/guest" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-1" />
            <Link href="/guest/facilities" className="hover:text-gray-900">
              Facilities
            </Link>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">Current Facility</span>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
