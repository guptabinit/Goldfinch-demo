import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ManagerPerformanceLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px] mt-2" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <Skeleton className="h-10 w-[300px]" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array(4)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <Skeleton className="h-10 w-[180px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
