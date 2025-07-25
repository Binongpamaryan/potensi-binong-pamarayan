import PotensiDetailClient from "@/components/PotensiDetailClient";

export default async function PotensiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <PotensiDetailClient id={id} />
    </section>
  );
}
