"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type StaffPerformance = {
  id: number
  name: string
  role: string
  ordersCompleted: number
  avgResponseTime: string
  slaAdherence: number
  customerRating: number
}

type HodPerformanceTableProps = {
  data: StaffPerformance[]
}

export function HodPerformanceTable({ data }: HodPerformanceTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<StaffPerformance>[] = [
    {
      accessorKey: "name",
      header: "Staff Member",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-xs text-muted-foreground">{row.original.role}</div>
        </div>
      ),
    },
    {
      accessorKey: "ordersCompleted",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Orders Completed
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("ordersCompleted")}</div>,
    },
    {
      accessorKey: "avgResponseTime",
      header: "Avg. Response Time",
      cell: ({ row }) => <div className="text-center">{row.getValue("avgResponseTime")}</div>,
    },
    {
      accessorKey: "slaAdherence",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            SLA Adherence
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const value = row.getValue("slaAdherence") as number
        return (
          <div className="flex items-center gap-2">
            <Progress value={value} className="h-2 w-24" />
            <span>{value}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: "customerRating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Customer Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const rating = row.getValue("customerRating") as number
        return (
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 ${star <= rating ? "text-goldfinch-gold" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-5.196 2.733a1 1 0 01-1.451-1.054l.992-5.783-4.2-4.1a1 1 0 01.554-1.705l5.803-.844 2.598-5.263a1 1 0 011.8 0l2.598 5.263 5.803.844a1 1 0 01.554 1.705l-4.2 4.1.992 5.783a1 1 0 01-1.451 1.054L10 15.585z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-2">{rating.toFixed(1)}</span>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b bg-muted/50">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left text-sm font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
