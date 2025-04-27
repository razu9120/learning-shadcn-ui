"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Home() {
  // 日付の状態管理
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex flex-col p-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">DatePickerの例</h1>
        <DatePicker date={date} setDate={setDate} />
        <div className="mt-4">
          <p>選択された日付: {date ? date.toLocaleDateString('ja-JP') : '未選択'}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">テーブルの例</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>電話番号</TableHead>
              <TableHead>住所</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>山田太郎</TableCell>
              <TableCell>yamada@example.com</TableCell>
              <TableCell>090-1234-5678</TableCell>
              <TableCell>東京都渋谷区</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-8">
        <Button>ボタン</Button>
      </div>
      <div className="mt-8">
        <Textarea />
      </div>
      <div className="mt-8">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </main>
  );
}
