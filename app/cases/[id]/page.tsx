import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cases, getCase } from "@/app/_lib/data";
import { formatDuration, formatPrice } from "@/app/_lib/format";
import { CasePreview } from "./CasePreview";

type CasePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const { id } = await params;
  const item = getCase(id);

  return {
    title: item?.title ?? "Кейс не найден",
  };
}

export default function CasePage({ params }: CasePageProps) {
  return (
    <main className="bg-primary-50 px-6 py-6 text-primary-800">
      <Link
        href="/"
        className="text-sm text-accent-500 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
      >
        ← К каталогу
      </Link>

      <Suspense fallback={<CaseSkeleton />}>
        <CaseArticle params={params} />
      </Suspense>
    </main>
  );
}

async function CaseArticle({ params }: CasePageProps) {
  const { id } = await params;
  const item = getCase(id);

  if (!item) notFound();

  return (
    <article className="mt-6 grid border border-primary-200 md:grid-cols-2">
      <CasePreview src={item.preview.src} alt={item.preview.alt} />

      <div className="px-7 py-6">
        <p className="text-xs tracking-[0.16em] text-primary-600 uppercase">
          {item.niche}
        </p>
        <h1 className="mt-2 text-4xl text-accent-500">{item.title}</h1>
        <p className="mt-6 text-3xl font-[350]">от {formatPrice(item.priceFrom)}</p>

        <dl className="mt-8 grid gap-5">
          <div>
            <dt className="text-xs tracking-[0.16em] text-primary-600 uppercase">
              Срок
            </dt>
            <dd className="mt-1 text-lg">{formatDuration(item.duration)}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.16em] text-primary-600 uppercase">
              Стек
            </dt>
            <dd className="mt-1 text-lg">{item.stack.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function CaseSkeleton() {
  return (
    <div
      className="mt-6 grid border border-primary-200 md:grid-cols-2"
      aria-hidden="true"
    >
      <div className="min-h-72 animate-pulse bg-primary-300 motion-reduce:animate-none" />
      <div className="px-7 py-6">
        <div className="h-3 w-24 animate-pulse bg-primary-300 motion-reduce:animate-none" />
        <div className="mt-3 h-10 w-2/3 animate-pulse bg-primary-300 motion-reduce:animate-none" />
        <div className="mt-6 h-8 w-40 animate-pulse bg-primary-300 motion-reduce:animate-none" />
      </div>
    </div>
  );
}
