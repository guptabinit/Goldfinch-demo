"use client"

import { useEffect, useState } from "react"

type HodSlaGaugeProps = {
  value: number
}

export function HodSlaGauge({ value }: HodSlaGaugeProps) {
  const [color, setColor] = useState("#10B981")

  useEffect(() => {
    // Set color based on value
    if (value >= 95) {
      setColor("#10B981") // Green
    } else if (value >= 85) {
      setColor("#FFB800") // Amber
    } else {
      setColor("#EF4444") // Red
    }
  }, [value])

  // Calculate the angle for the needle
  const angle = (value / 100) * 180 - 90

  return (
    <div className="relative w-64 h-32 mx-auto">
      {/* Gauge background */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute bottom-0 w-full h-full rounded-t-full bg-gray-200"></div>
      </div>

      {/* Gauge segments */}
      <div className="absolute bottom-0 w-full h-full overflow-hidden">
        <div className="absolute bottom-0 w-full h-full rounded-t-full bg-red-500 opacity-20"></div>
      </div>
      <div
        className="absolute bottom-0 w-full h-full overflow-hidden"
        style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 30%, 0% 30%)" }}
      >
        <div className="absolute bottom-0 w-full h-full rounded-t-full bg-amber-500 opacity-20"></div>
      </div>
      <div
        className="absolute bottom-0 w-full h-full overflow-hidden"
        style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 10%, 0% 10%)" }}
      >
        <div className="absolute bottom-0 w-full h-full rounded-t-full bg-green-500 opacity-20"></div>
      </div>

      {/* Gauge needle */}
      <div
        className="absolute bottom-0 left-1/2 w-1 h-[95%] bg-gray-800 rounded-t-full origin-bottom transform -translate-x-1/2 transition-transform duration-1000"
        style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
      ></div>

      {/* Gauge center point */}
      <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

      {/* Value display */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-center">
        <div className="text-3xl font-bold" style={{ color }}>
          {value}%
        </div>
        <div className="text-sm text-gray-500">SLA Adherence</div>
      </div>

      {/* Scale markers */}
      <div className="absolute bottom-0 w-full">
        <div className="relative h-full">
          <div className="absolute bottom-1 left-[10%] h-2 w-0.5 bg-gray-400"></div>
          <div className="absolute bottom-1 left-1/4 h-2 w-0.5 bg-gray-400"></div>
          <div className="absolute bottom-1 left-1/2 h-3 w-0.5 bg-gray-400"></div>
          <div className="absolute bottom-1 left-3/4 h-2 w-0.5 bg-gray-400"></div>
          <div className="absolute bottom-1 left-[90%] h-2 w-0.5 bg-gray-400"></div>
        </div>
      </div>
    </div>
  )
}
