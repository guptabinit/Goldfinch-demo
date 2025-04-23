"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"

const departments = [
  { value: "housekeeping", label: "Housekeeping" },
  { value: "dining", label: "Dining" },
  { value: "spa", label: "Spa & Wellness" },
  { value: "concierge", label: "Concierge" },
  { value: "frontdesk", label: "Front Desk" },
  { value: "maintenance", label: "Maintenance" },
  { value: "security", label: "Security" },
]

export function DepartmentSelector() {
  const { user, updateUserDepartment } = useStaffAuth()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(user?.department?.toLowerCase() || "housekeeping")

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setOpen(false)

    // Find the department label
    const selectedDept = departments.find((dept) => dept.value === currentValue)
    if (selectedDept) {
      updateUserDepartment(selectedDept.label)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-goldfinch-gold/20 hover:bg-goldfinch-gold/10 hover:text-goldfinch-gold"
        >
          {value ? departments.find((department) => department.value === value)?.label : "Select department..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search department..." />
          <CommandList>
            <CommandEmpty>No department found.</CommandEmpty>
            <CommandGroup>
              {departments.map((department) => (
                <CommandItem key={department.value} value={department.value} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", value === department.value ? "opacity-100" : "opacity-0")} />
                  {department.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
