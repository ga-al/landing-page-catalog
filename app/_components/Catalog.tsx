"use client";

import { useEffect, useMemo, useState } from "react";
import type { LandingCase } from "../_lib/data";
import {
  applyFilters,
  clearConstraints,
  hasConstraints,
  initialFilters,
  type FilterState,
} from "../_lib/filters";
import { Filter } from "./Filter";
import { LandingList } from "./LandingList";

const SKELETON_DELAY_MS = 500;

type CatalogProps = {
  cases: LandingCase[];
};

export function Catalog({ cases }: CatalogProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [pending, setPending] = useState(true);
  const visible = useMemo(() => applyFilters(cases, filters), [cases, filters]);
  const filtersActive = hasConstraints(filters);

  function updateFilters(next: FilterState) {
    setFilters(next);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPending(true);
  }

  useEffect(() => {
    if (!pending) return;

    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : SKELETON_DELAY_MS;
    const timer = window.setTimeout(() => setPending(false), delay);
    return () => window.clearTimeout(timer);
  }, [pending, filters]);

  return (
    <>
      <Filter
        value={filters}
        onChange={updateFilters}
        resultCount={visible.length}
      />
      {pending ? (
        <LandingList
          cases={visible}
          pending
          skeletonCount={visible.length > 0 ? visible.length : 4}
        />
      ) : visible.length === 0 ? (
        <div className="border border-primary-200 px-6 py-12 text-center">
          <p className="text-lg">Нет лендингов по этим условиям.</p>
          {filtersActive && (
            <button
              type="button"
              onClick={() => updateFilters(clearConstraints(filters))}
              className="mt-4 text-accent-500 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      ) : (
        <LandingList cases={visible} />
      )}
    </>
  );
}
