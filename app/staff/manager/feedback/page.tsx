"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Calendar, Download, MessageSquare, RefreshCw, TrendingDown, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ManagerFeedbackChart } from "@/components/manager/manager-feedback-chart"
import { ManagerSentimentAnalysis } from "@/components/manager/manager-sentiment-analysis"
import { ManagerFeedbackList } from "@/components/manager/manager-feedback-list"
import { ManagerFeedbackTrends } from "@/components/manager/manager-feedback-trends"

export default function ManagerFeedback() {
  const [timeRange, setTimeRange] = useState("month")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guest Feedback</h1>
          <p className="text-muted-foreground">Analyze guest feedback, sentiment trends, and satisfaction metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />
                8%
              </Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                <span>Positive: 68%</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
                <span>Neutral: 22%</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div>
                <span>Negative: 10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5.0</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />
                0.2
              </Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex-1 space-y-1">
                <div className="flex items-center text-xs">
                  <span className="w-8">5★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="w-8 text-right">75%</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-8">4★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full" style={{ width: "20%" }}></div>
                  </div>
                  <span className="w-8 text-right">20%</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-8">≤3★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: "5%" }}></div>
                  </div>
                  <span className="w-8 text-right">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />5
              </Badge>
              <p className="text-xs text-muted-foreground">from last quarter</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <span className="font-medium text-green-500">78%</span>
                <span className="text-muted-foreground">Promoters</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-gray-500">16%</span>
                <span className="text-muted-foreground">Passives</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-red-500">6%</span>
                <span className="text-muted-foreground">Detractors</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Trends</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />
                Improving
              </Badge>
              <p className="text-xs text-muted-foreground">month-over-month</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col">
                <span className="font-medium text-green-500">
                  <TrendingUp className="inline mr-1 h-3 w-3" />
                  Staff Service
                </span>
                <span className="text-muted-foreground">+18.2%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-green-500">
                  <TrendingUp className="inline mr-1 h-3 w-3" />
                  Room Quality
                </span>
                <span className="text-muted-foreground">+9.7%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-red-500">
                  <TrendingDown className="inline mr-1 h-3 w-3" />
                  Food Quality
                </span>
                <span className="text-muted-foreground">-3.5%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-green-500">
                  <TrendingUp className="inline mr-1 h-3 w-3" />
                  Cleanliness
                </span>
                <span className="text-muted-foreground">+7.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
          <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Feedback by Department</CardTitle>
                <CardDescription>Distribution of feedback across hotel services</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerFeedbackChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Positive, neutral, and negative sentiment distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerSentimentAnalysis />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>Latest guest feedback submissions</CardDescription>
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="room-service">Room Service</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="spa">Spa & Wellness</SelectItem>
                    <SelectItem value="front-desk">Front Desk</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <ManagerFeedbackList />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Most mentioned topics in guest feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <ManagerFeedbackTrends />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Sentiment Analysis</CardTitle>
              <CardDescription>In-depth analysis of guest sentiment across all feedback channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Detailed sentiment analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Trends & Insights</CardTitle>
              <CardDescription>Long-term trends and actionable insights from guest feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Feedback trends and insights will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Feedback Submissions</CardTitle>
              <CardDescription>Complete list of guest feedback with filtering options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">All feedback submissions will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
