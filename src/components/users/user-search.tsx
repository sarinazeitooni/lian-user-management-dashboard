"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or email"
        aria-label="Search users by name or email"
        className="h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Clear search"
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
