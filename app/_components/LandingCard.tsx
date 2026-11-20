import Image from "next/image";
import Link from "next/link";
import type { LandingCase } from "../_lib/data";
import { formatPrice } from "../_lib/format";

type LandingCardProps = {
  item: LandingCase;
  priority?: boolean;
};

const titleWidths = ["w-3/5", "w-2/3", "w-1/2", "w-4/5"] as const;

export function LandingCardSkeleton({ index = 0 }: { index?: number }) {
  const titleWidth = titleWidths[index % titleWidths.length];

  return (
    <div
      className="flex flex-col border border-primary-200 md:flex-row"
      aria-hidden="true"
    >
      <div className="h-60 animate-pulse bg-primary-300 motion-reduce:animate-none md:h-auto md:min-h-50 md:flex-1" />
      <div className="grow">
        <div className="px-7 pt-5 pb-4">
          <div
            className={`mb-3 h-8 animate-pulse bg-primary-300 motion-reduce:animate-none ${titleWidth}`}
          />
          <div className="mb-2 h-6 w-24 animate-pulse bg-primary-300 motion-reduce:animate-none" />
          <div className="mt-1 flex justify-end">
            <div className="h-9 w-36 animate-pulse bg-primary-300 motion-reduce:animate-none" />
          </div>
        </div>
        <div className="flex justify-end border-t border-primary-200">
          <div className="h-14 w-56 animate-pulse bg-primary-300 motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

export function LandingCard({ item, priority = false }: LandingCardProps) {
  return (
    <div className="flex flex-col border border-primary-200 md:flex-row">
      <div className="relative h-60 md:h-auto md:min-h-50 md:flex-1">
        <Image
          src={item.preview.src}
          alt={item.preview.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 25vw, 100vw"
          className="border-r border-primary-200 object-cover"
        />
      </div>
      <div className="grow">
        <div className="bg-primary-50 px-7 pt-5 pb-4">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            {item.title}
          </h3>

          <p className="mb-2 text-lg text-primary-800">{item.niche}</p>

          <p className="flex items-baseline justify-end gap-3">
            <span className="text-primary-800">от</span>
            <span className="text-3xl font-[350]">
              {formatPrice(item.priceFrom)}
            </span>
          </p>
        </div>

        <div className="border-t border-primary-200 bg-primary-50 text-right">
          <Link
            href={`/cases/${item.id}`}
            className="inline-block border-l border-primary-200 px-6 py-4 transition-all hover:bg-accent-600 hover:text-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  );
}
