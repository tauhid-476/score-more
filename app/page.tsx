"use client"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks"

export default function Page() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}