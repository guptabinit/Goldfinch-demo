import { Skeleton } from "@/components/ui/skeleton"

export default function LoyaltyLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>

      <Skeleton className="h-[180px] w-full rounded-lg" />

      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="grid gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-t-lg" />
              <Skeleton className="h-6 w-3/4 mx-4" />
              <Skeleton className="h-4 w-5/6 mx-4" />
              <Skeleton className="h-10 w-[calc(100%-32px)] mx-4 mb-4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
