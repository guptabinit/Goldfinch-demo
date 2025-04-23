import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="mt-2 h-4 w-[350px]" />
      </div>

      <Skeleton className="mb-6 h-10 w-full" />

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="p-6">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="mt-2 h-4 w-[300px]" />
        </div>
        <div className="p-6 pt-0 space-y-6">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
        </div>
        <div className="border-t p-6">
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>
    </div>
  )
}
