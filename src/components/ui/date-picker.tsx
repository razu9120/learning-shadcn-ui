"use client"

import * as React from "react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  // 現在の年を取得
  const currentYear = new Date().getFullYear();
  // 年選択用の配列（現在の年から前後10年）
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  // 選択された年
  const [selectedYear, setSelectedYear] = React.useState<number>(date ? date.getFullYear() : currentYear);
  // 選択された月
  const [selectedMonth, setSelectedMonth] = React.useState<number>(date ? date.getMonth() : new Date().getMonth());

  // 年が変更されたときの処理
  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    setSelectedYear(newYear);
    
    // 日付が選択されている場合は、年を更新
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(newYear);
      setDate(newDate);
    }
  };

  // 月が変更されたときの処理
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    
    // 日付が選択されている場合は、月を更新
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(month);
      setDate(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ja }) : <span>日付を選択</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center space-x-2">
            <Select
              value={selectedYear.toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="年を選択" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}年
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value: string) => handleMonthChange(parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="月を選択" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i + 1}月
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={ja}
          month={new Date(selectedYear, selectedMonth)}
          onMonthChange={(date) => {
            setSelectedMonth(date.getMonth());
            setSelectedYear(date.getFullYear());
          }}
        />
      </PopoverContent>
    </Popover>
  )
} 