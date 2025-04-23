import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-goldfinch-ivory p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-8">
          <Image src="/stylized-goldfinch.png" width={80} height={80} alt="Goldfinch Hotels" className="mb-4" />
          <h1 className="text-3xl font-serif font-semibold text-center">
            <span className="text-goldfinch-gold">Goldfinch</span>
          </h1>
        </div>

        <div className="relative h-40 w-40 mx-auto mb-8">
          <Image src="/404-illustration.png" fill alt="Page not found" className="object-contain" />
        </div>

        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
            <Link href="/guest">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/guest/help">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
