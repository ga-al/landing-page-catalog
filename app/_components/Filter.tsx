"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { NicheId } from "../_lib/data";
import {
  budgetOptions,
  clearConstraints,
  durationOptions,
  nicheOptions,
  sortOptions,
  type BudgetId,
  type DurationId,
  type FilterState,
  type SortId,
} from "../_lib/filters";

type FilterProps = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
};

type Chip = {
  key: string;
  label: string;
  onRemove: () => void;
};

export function Filter({ value, onChange, resultCount }: FilterProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  function patch(partial: Partial<FilterState>) {
    onChange({ ...value, ...partial });
  }

  function toggleNiche(id: NicheId) {
    patch({ niche: value.niche === id ? null : id });
  }

  function toggleDuration(id: DurationId) {
    patch({ duration: value.duration === id ? null : id });
  }

  function toggleBudget(id: BudgetId) {
    patch({ budget: value.budget === id ? null : id });
  }

  const chips: Chip[] = [];
  const niche = nicheOptions.find((option) => option.id === value.niche);
  const duration = durationOptions.find(
    (option) => option.id === value.duration,
  );
  const budget = budgetOptions.find((option) => option.id === value.budget);

  if (niche) {
    chips.push({
      key: "niche",
      label: niche.label,
      onRemove: () => patch({ niche: null }),
    });
  }

  if (duration) {
    chips.push({
      key: "duration",
      label: duration.label,
      onRemove: () => patch({ duration: null }),
    });
  }

  if (budget) {
    chips.push({
      key: "budget",
      label: budget.label,
      onRemove: () => patch({ budget: null }),
    });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    function closeOnDesktop() {
      if (media.matches) setOpen(false);
    }

    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <section className="mt-10 mb-8" aria-label="Фильтр каталога">
      <p className="sr-only" aria-live="polite">
        {resultCount === 0
          ? "Нет лендингов по этим условиям"
          : `Показано ${resultCount}`}
      </p>

      <div className="hidden border border-primary-200 lg:block">
        <div className="border-b border-primary-200 px-5 py-4">
          <ChoiceGroup
            label="Ниша"
            options={nicheOptions}
            selected={value.niche}
            onToggle={toggleNiche}
          />
        </div>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4 px-5 py-4">
          <ChoiceGroup
            label="Срок"
            options={durationOptions}
            selected={value.duration}
            onToggle={toggleDuration}
          />
          <ChoiceGroup
            label="Бюджет"
            options={budgetOptions}
            selected={value.budget}
            onToggle={toggleBudget}
          />
          <div className="ml-auto flex items-end gap-4">
            {chips.length > 0 && (
              <button
                type="button"
                onClick={() => onChange(clearConstraints(value))}
                className="mb-2 text-sm text-primary-600 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                Сбросить
              </button>
            )}
            <SortGroup
              value={value.sort}
              onChange={(id) => patch({ sort: id })}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 border border-primary-300 px-4 py-2 text-sm hover:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            <FilterIcon />
            Фильтры
            {chips.length > 0 && (
              <span className="bg-accent-500 px-1.5 text-xs font-medium text-primary-50">
                {chips.length}
              </span>
            )}
          </button>
          <SortButtons
            value={value.sort}
            onChange={(id) => patch({ sort: id })}
            joined
          />
        </div>

        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1 border border-accent-500 bg-accent-100 py-1 pr-1 pl-3 text-sm text-primary-800"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Убрать ${chip.label}`}
                  className="px-1.5 text-base leading-none text-primary-800 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => onChange(clearConstraints(value))}
              className="px-1 text-sm text-primary-600 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              Сбросить
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="filter-panel"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="flex h-full flex-col px-5 py-5">
          <div className="mb-6 flex items-center justify-between">
            <h2 id={titleId} className="text-xl text-accent-500">
              Фильтры
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть фильтры"
              className="px-2 text-2xl leading-none text-primary-800 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              ×
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
            <ChoiceGroup
              label="Ниша"
              options={nicheOptions}
              selected={value.niche}
              onToggle={toggleNiche}
            />
            <ChoiceGroup
              label="Срок"
              options={durationOptions}
              selected={value.duration}
              onToggle={toggleDuration}
            />
            <ChoiceGroup
              label="Бюджет"
              options={budgetOptions}
              selected={value.budget}
              onToggle={toggleBudget}
            />
          </div>

          <div className="mt-6 flex gap-3 border-t border-primary-200 pt-4">
            <button
              type="button"
              onClick={() => onChange(clearConstraints(value))}
              className="flex-1 border border-primary-300 py-3 text-sm hover:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              Сбросить
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-accent-500 py-3 text-sm text-primary-50 hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              Показать {resultCount}
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}

function ChoiceGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  selected: T | null;
  onToggle: (id: T) => void;
}) {
  return (
    <FilterGroup label={label}>
      {options.map((option) => (
        <OptionButton
          key={option.id}
          pressed={selected === option.id}
          onClick={() => onToggle(option.id)}
        >
          {option.label}
        </OptionButton>
      ))}
    </FilterGroup>
  );
}

function SortGroup({
  value,
  onChange,
}: {
  value: SortId;
  onChange: (id: SortId) => void;
}) {
  return (
    <FilterGroup label="Сортировка">
      <SortButtons value={value} onChange={onChange} />
    </FilterGroup>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs tracking-[0.16em] text-primary-600 uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function OptionButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`border px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${
        pressed
          ? "border-accent-500 bg-accent-500 text-primary-50"
          : "border-primary-300 text-primary-800 hover:border-accent-500"
      }`}
    >
      {children}
    </button>
  );
}

function SortButtons({
  value,
  onChange,
  joined = false,
}: {
  value: SortId;
  onChange: (id: SortId) => void;
  joined?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Сортировка"
      className={
        joined ? "flex border border-primary-200" : "flex flex-wrap gap-2"
      }
    >
      {sortOptions.map((option, index) => {
        const selected = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={`px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${
              joined
                ? index > 0
                  ? "border-l border-primary-200"
                  : ""
                : "border"
            } ${
              selected
                ? "border-accent-500 bg-accent-500 text-primary-50"
                : joined
                  ? "text-primary-800 hover:bg-primary-100"
                  : "border-primary-300 text-primary-800 hover:border-accent-500"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 3h12M4 8h8M6 13h4" />
    </svg>
  );
}
