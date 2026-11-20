import type { LandingCase, NicheId } from "./data";

export const nicheOptions: { id: NicheId; label: string }[] = [
  { id: "cafe", label: "кафе" },
  { id: "salon", label: "салон" },
  { id: "clinic", label: "клиника" },
  { id: "course", label: "курс" },
  { id: "event", label: "мероприятие" },
];

export const durationOptions = [
  { id: "5", label: "до 5 дней", max: 5 },
  { id: "10", label: "до 10 дней", max: 10 },
] as const;

export const budgetOptions = [
  { id: "50", label: "до 50 тыс.", min: 0, max: 50_000 },
  { id: "80", label: "50–80 тыс.", min: 50_001, max: 80_000 },
  { id: "over", label: "от 80 тыс.", min: 80_001, max: Number.POSITIVE_INFINITY },
] as const;

export const sortOptions = [
  { id: "new", label: "новее" },
  { id: "cheap", label: "дешевле" },
] as const;

export type DurationId = (typeof durationOptions)[number]["id"];
export type BudgetId = (typeof budgetOptions)[number]["id"];
export type SortId = (typeof sortOptions)[number]["id"];

export type FilterState = {
  niche: NicheId | null;
  duration: DurationId | null;
  budget: BudgetId | null;
  sort: SortId;
};

export const initialFilters: FilterState = {
  niche: null,
  duration: null,
  budget: null,
  sort: "new",
};

export function clearConstraints(state: FilterState): FilterState {
  return { ...state, niche: null, duration: null, budget: null };
}

export function hasConstraints(state: FilterState) {
  return state.niche !== null || state.duration !== null || state.budget !== null;
}

export function applyFilters(cases: LandingCase[], filters: FilterState) {
  const indexed = cases.map((item, index) => ({ item, index }));

  const filtered = indexed.filter(({ item }) => {
    if (filters.niche && item.filterNiche !== filters.niche) return false;

    if (filters.duration) {
      const option = durationOptions.find((entry) => entry.id === filters.duration);
      if (option && item.duration > option.max) return false;
    }

    if (filters.budget) {
      const option = budgetOptions.find((entry) => entry.id === filters.budget);
      if (option && (item.priceFrom < option.min || item.priceFrom > option.max)) {
        return false;
      }
    }

    return true;
  });

  filtered.sort((a, b) => {
    if (filters.sort === "cheap") {
      return a.item.priceFrom - b.item.priceFrom || a.index - b.index;
    }

    return a.index - b.index;
  });

  return filtered.map(({ item }) => item);
}
