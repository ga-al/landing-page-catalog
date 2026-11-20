import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-primary-50 px-6 py-16 text-primary-800">
      <h1 className="text-4xl text-accent-500">Страница не найдена</h1>
      <p className="mt-4 text-lg">Такого кейса в каталоге нет.</p>
      <Link
        href="/"
        className="mt-6 inline-block text-accent-500 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
      >
        ← К каталогу
      </Link>
    </main>
  );
}
