"use client";

import type { LandingCase } from "../_lib/data";
import { LandingCard, LandingCardSkeleton } from "./LandingCard";

type LandingListProps = {
  cases: LandingCase[];
  pending?: boolean;
  skeletonCount?: number;
};

const gridClassName =
  "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14";

export function LandingList({
  cases,
  pending = false,
  skeletonCount = 4,
}: LandingListProps) {
  if (pending) {
    return (
      <div aria-busy="true" aria-live="polite">
        <p className="sr-only">Обновляем каталог</p>
        <div className={gridClassName}>
          {Array.from({ length: skeletonCount }, (_, index) => (
            <LandingCardSkeleton key={index} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {cases.map((item, index) => (
        <LandingCard key={item.id} item={item} priority={index < 2} />
      ))}
    </div>
  );
}
