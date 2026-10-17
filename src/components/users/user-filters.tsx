"use client";

import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface UserFiltersProps {
  companies: string[];
  company: string;
  onCompanyChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function UserFilters({
  companies,
  company,
  onCompanyChange,
  hasActiveFilters,
  onClearFilters,
}: UserFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
      <div className="w-full sm:max-w-xs">
        <Select
          label="Company"
          aria-label="Filter by company"
          value={company}
          onChange={(event) => onCompanyChange(event.target.value)}
          options={[
            { value: "", label: "All companies" },
            ...companies.map((name) => ({ value: name, label: name })),
          ]}
        />
      </div>
      {hasActiveFilters ? (
        <Button variant="ghost" onClick={onClearFilters} className="sm:mb-0.5">
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}
