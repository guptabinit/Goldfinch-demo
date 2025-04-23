"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

// Mock data for department performance
const departmentData = [
  {
    department: "Room Service",
    responseTime: "6.5 min",
    responseStatus: "improved",
    completionRate: "97.1%",
    completionStatus: "improved",
    satisfaction: "4.8/5.0",
    satisfactionStatus: "improved",
    slaCompliance: "97.1%",
    slaStatus: "stable",
  },
  {
    department: "Housekeeping",
    responseTime: "9.8 min",
    responseStatus: "declined",
    completionRate: "91.3%",
    completionStatus: "declined",
    satisfaction: "4.5/5.0",
    satisfactionStatus: "stable",
    slaCompliance: "91.3%",
    slaStatus: "declined",
  },
  {
    department: "Spa & Wellness",
    responseTime: "8.3 min",
    responseStatus: "stable",
    completionRate: "94.2%",
    completionStatus: "improved",
    satisfaction: "4.7/5.0",
    satisfactionStatus: "improved",
    slaCompliance: "94.2%",
    slaStatus: "stable",
  },
  {
    department: "Concierge",
    responseTime: "5.2 min",
    responseStatus: "improved",
    completionRate: "98.5%",
    completionStatus: "improved",
    satisfaction: "4.9/5.0",
    satisfactionStatus: "improved",
    slaCompliance: "98.5%",
    slaStatus: "improved",
  },
  {
    department: "Maintenance",
    responseTime: "12.4 min",
    responseStatus: "declined",
    completionRate: "89.7%",
    completionStatus: "declined",
    satisfaction: "4.3/5.0",
    satisfactionStatus: "declined",
    slaCompliance: "89.7%",
    slaStatus: "declined",
  },
]

export function ManagerDepartmentPerformance() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "improved":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "declined":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "improved":
        return "text-green-500"
      case "declined":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Avg. Response Time</TableHead>
            <TableHead>Completion Rate</TableHead>
            <TableHead>Guest Satisfaction</TableHead>
            <TableHead>SLA Compliance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentData.map((dept) => (
            <TableRow key={dept.department}>
              <TableCell className="font-medium">{dept.department}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={getStatusClass(dept.responseStatus)}>{dept.responseTime}</span>
                  <span className="ml-2">{getStatusIcon(dept.responseStatus)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={getStatusClass(dept.completionStatus)}>{dept.completionRate}</span>
                  <span className="ml-2">{getStatusIcon(dept.completionStatus)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={getStatusClass(dept.satisfactionStatus)}>{dept.satisfaction}</span>
                  <span className="ml-2">{getStatusIcon(dept.satisfactionStatus)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={getStatusClass(dept.slaStatus)}>{dept.slaCompliance}</span>
                  <span className="ml-2">{getStatusIcon(dept.slaStatus)}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
