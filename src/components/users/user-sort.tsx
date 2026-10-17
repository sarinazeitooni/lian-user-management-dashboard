"use client";

import { Select } from "@/components/ui/select";
import type { SortOption } from "@/features/users/types/user";

interface UserSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: Array<{ value: string; label: string; option: SortOption }> = [
  {
    value: "name-asc",
    label: "Name (A–Z)",
    option: { field: "name", direction: "asc" },
  },
  {
    value: "name-desc",
    label: "Name (Z–A)",
    option: { field: "name", direction: "desc" },
  },
  {
    value: "email-asc",
    label: "Email (A–Z)",
    option: { field: "email", direction: "asc" },
  },
  {
    value: "email-desc",
    label: "Email (Z–A)",
    option: { field: "email", direction: "desc" },
  },
];

export function UserSort({ value, onChange }: UserSortProps) {
  const current =
    SORT_OPTIONS.find(
      (item) =>
        item.option.field === value.field &&
        item.option.direction === value.direction,
    )?.value ?? "name-asc";

  return (
    <Select
      label="Sort by"
      aria-label="Sort users"
      value={current}
      onChange={(event) => {
        const next = SORT_OPTIONS.find((item) => item.value === event.target.value);
        if (next) onChange(next.option);
      }}
      options={SORT_OPTIONS.map(({ value: optionValue, label }) => ({
        value: optionValue,
        label,
      }))}
      className="min-w-[11rem]"
    />
  );
}
