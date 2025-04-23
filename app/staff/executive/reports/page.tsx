"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MetricCard } from "@/components/executive/metric-card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign, TrendingUp, FileText, Download, Printer, Mail } from "lucide-react"

// Sample data
const financialSummary = [
  { category: "Revenue", value: "₹2,85,67,890" },
  { category: "Expenses", value: "₹1,75,43,210" },
  { category: "Profit", value: "₹1,10,24,680" },
  { category: "Tax", value: "₹33,07,404" },
  { category: "Net Profit", value: "₹77,17,276" },
]

const revenueExpenseTrend = [
  { month: "Jan", revenue: 2500000, expenses: 1500000 },
  { month: "Feb", revenue: 2600000, expenses: 1550000 },
  { month: "Mar", revenue: 2700000, expenses: 1600000 },
  { month: "Apr", revenue: 2800000, expenses: 1650000 },
  { month: "May", revenue: 2900000, expenses: 1700000 },
  { month: "Jun", revenue: 3000000, expenses: 1750000 },
]

const departmentProfitability = [
  { department: "Accommodation", revenue: 1500000, expenses: 800000, profit: 700000 },
  { department: "F&B", revenue: 800000, expenses: 500000, profit: 300000 },
  { department: "Spa", revenue: 400000, expenses: 250000, profit: 150000 },
  { department: "Events", revenue: 300000, expenses: 200000, profit: 100000 },
]

export default function ReportsDashboard() {
  const [timeframe, setTimeframe] = useState("month")
  const [reportType, setReportType] = useState("financial")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Generate and analyze financial reports.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select defaultValue="financial" value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financial Summary</SelectItem>
              <SelectItem value="revenue">Revenue Report</SelectItem>
              <SelectItem value="expense">Expense Report</SelectItem>
              <SelectItem value="profit">Profit & Loss</SelectItem>
              <SelectItem value="tax">Tax Report</SelectItem>
            </SelectContent>
          </Select>
          <Tabs defaultValue="month" value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="₹2.85 Cr"
          description={`Total revenue for this ${timeframe}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Total Expenses"
          value="₹1.75 Cr"
          description={`Total expenses for this ${timeframe}`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 5.3, isPositive: false }}
        />
        <MetricCard
          title="Net Profit"
          value="₹1.10 Cr"
          description={`Net profit for this ${timeframe}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 15.7, isPositive: true }}
        />
        <MetricCard
          title="Profit Margin"
          value="38.6%"
          description="Percentage of revenue as profit"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Financial Summary Report</CardTitle>
              <CardDescription>
                {timeframe === "month"
                  ? "June 2023"
                  : timeframe === "quarter"
                    ? "Q2 2023"
                    : timeframe === "year"
                      ? "FY 2022-23"
                      : ""}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialSummary.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue (₹)",
                  color: "hsl(var(--chart-1))",
                },
                expenses: {
                  label: "Expenses (₹)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueExpenseTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Profitability</CardTitle>
            <CardDescription>Revenue, expenses, and profit by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue (₹)",
                  color: "hsl(var(--chart-1))",
                },
                expenses: {
                  label: "Expenses (₹)",
                  color: "hsl(var(--chart-2))",
                },
                profit: {
                  label: "Profit (₹)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentProfitability} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue (₹)" />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses (₹)" />
                  <Bar dataKey="profit" fill="var(--color-profit)" name="Profit (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
