export type NicheId = "cafe" | "salon" | "clinic" | "course" | "event";

export type LandingCase = {
  id: string;
  title: string;
  preview: {
    src: string;
    alt: string;
  };
  niche: string;
  /** Группа фильтра «Ниша». Без неё карточка видна только когда ниша не выбрана. */
  filterNiche?: NicheId;
  /** Срок в рабочих днях */
  duration: number;
  /** Цена «от», ₽ */
  priceFrom: number;
  stack: string[];
};

/** Порядок массива — от новых кейсов к старым. Сортировка «новее» его сохраняет. */
export const cases: LandingCase[] = [
  {
    id: "aurora-dental",
    title: "Aurora Dental",
    preview: {
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга стоматологии Aurora Dental",
    },
    niche: "Стоматология",
    filterNiche: "clinic",
    duration: 6,
    priceFrom: 48000,
    stack: ["Next.js", "Tailwind", "Motion"],
  },
  {
    id: "northline",
    title: "Northline",
    preview: {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга логистической компании Northline",
    },
    niche: "Логистика",
    duration: 9,
    priceFrom: 72000,
    stack: ["Next.js", "TypeScript", "Mapbox"],
  },
  {
    id: "lumen-studio",
    title: "Lumen Studio",
    preview: {
      src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга фотостудии Lumen Studio",
    },
    niche: "Фотостудия",
    filterNiche: "salon",
    duration: 5,
    priceFrom: 39000,
    stack: ["Astro", "CSS", "GSAP"],
  },
  {
    id: "verde-market",
    title: "Verde Market",
    preview: {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга доставки продуктов Verde Market",
    },
    niche: "Доставка продуктов",
    filterNiche: "cafe",
    duration: 8,
    priceFrom: 64000,
    stack: ["Next.js", "Tailwind", "Stripe"],
  },
  {
    id: "kite-school",
    title: "Kite School",
    preview: {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга языковой школы Kite School",
    },
    niche: "Языковая школа",
    filterNiche: "course",
    duration: 7,
    priceFrom: 52000,
    stack: ["React", "Vite", "Formspree"],
  },
  {
    id: "forge-fit",
    title: "Forge Fit",
    preview: {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга фитнес-клуба Forge Fit",
    },
    niche: "Фитнес",
    filterNiche: "salon",
    duration: 6,
    priceFrom: 45000,
    stack: ["Next.js", "Tailwind", "Cal.com"],
  },
  {
    id: "solstice-realty",
    title: "Solstice Realty",
    preview: {
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга агентства недвижимости Solstice Realty",
    },
    niche: "Недвижимость",
    duration: 12,
    priceFrom: 95000,
    stack: ["Next.js", "TypeScript", "Sanity"],
  },
  {
    id: "harbor-coffee",
    title: "Harbor Coffee",
    preview: {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга кофейни Harbor Coffee",
    },
    niche: "Кофейня",
    filterNiche: "cafe",
    duration: 4,
    priceFrom: 32000,
    stack: ["Astro", "Tailwind"],
  },
  {
    id: "nimbus",
    title: "Nimbus",
    preview: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга B2B-сервиса Nimbus",
    },
    niche: "B2B-сервис",
    duration: 14,
    priceFrom: 120000,
    stack: ["Next.js", "TypeScript", "MDX"],
  },
  {
    id: "clay-oak",
    title: "Clay & Oak",
    preview: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга мебельной мастерской Clay & Oak",
    },
    niche: "Мебель на заказ",
    duration: 8,
    priceFrom: 58000,
    stack: ["Next.js", "Tailwind", "Three.js"],
  },
  {
    id: "atelier-night",
    title: "Atelier Night",
    preview: {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      alt: "Превью лендинга мероприятия Atelier Night",
    },
    niche: "Мероприятие",
    filterNiche: "event",
    duration: 5,
    priceFrom: 41000,
    stack: ["Next.js", "Tailwind", "Motion"],
  },
];

export function getCase(id: string) {
  return cases.find((item) => item.id === id);
}
