import { CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function HodScheduleLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton className="h-10 w-full mb-4" />

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-6 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                    <CardFooter className="p-2 bg-gray-50 flex justify-end space-x-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-20" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
