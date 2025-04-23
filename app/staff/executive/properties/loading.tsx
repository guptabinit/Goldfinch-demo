import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[300px]" />
      </div>

      <div className="grid gap-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    </div>
  )
}
