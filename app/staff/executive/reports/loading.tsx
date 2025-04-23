import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[300px]" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="mt-3 h-8 w-[120px]" />
              <Skeleton className="mt-2 h-4 w-[180px]" />
            </div>
          ))}
      </div>

      <div className="mt-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
}
