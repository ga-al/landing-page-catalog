import { Catalog } from "@/app/_components/Catalog";
import { cases } from "./_lib/data";

export default function Home() {
  return (
    <main className="bg-primary-50 px-6 py-6 text-primary-800">
      <h1 className="mb-7 text-5xl text-accent-500">Каталог лендингов</h1>
      <p className="text-2xl text-primary-600">
        Подберите лендинг по нише, сроку и бюджету.
      </p>

      <Catalog cases={cases} />
    </main>
  );
}
