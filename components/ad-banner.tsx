"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  slot: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  className?: string
}

export function AdBanner({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This would be replaced with actual AdSense code in production
    if (adRef.current && typeof window !== "undefined") {
      // Simulate ad loading with a placeholder
      const adElement = document.createElement("div")
      adElement.className = "bg-muted/30 flex items-center justify-center text-muted-foreground text-sm"

      // Set dimensions based on format
      if (format === "rectangle") {
        adElement.style.width = "300px"
        adElement.style.height = "250px"
        adElement.innerText = "Advertisement (300x250)"
      } else if (format === "horizontal") {
        adElement.style.width = "728px"
        adElement.style.height = "90px"
        adElement.innerText = "Advertisement (728x90)"
      } else if (format === "vertical") {
        adElement.style.width = "160px"
        adElement.style.height = "600px"
        adElement.innerText = "Advertisement (160x600)"
      } else {
        adElement.style.width = "100%"
        adElement.style.height = "100%"
        adElement.style.minHeight = "100px"
        adElement.innerText = "Advertisement (Responsive)"
      }

      // Clear previous content and append the new ad
      while (adRef.current.firstChild) {
        adRef.current.removeChild(adRef.current.firstChild)
      }
      adRef.current.appendChild(adElement)
    }
  }, [format, responsive, slot])

  return (
    <div
      ref={adRef}
      className={`overflow-hidden rounded-lg border ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  )
}

