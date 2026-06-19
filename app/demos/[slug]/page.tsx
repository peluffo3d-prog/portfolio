import { notFound } from "next/navigation";
import { NICHES, getNiche } from "@/lib/niches";
import NicheLanding from "@/components/niche/NicheLanding";

export function generateStaticParams() {
  return NICHES.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getNiche(slug);
  if (!config) return {};
  return {
    title: `${config.businessName} — Demo ${config.niche} | PelufoStudio`,
    description: config.tagline,
  };
}

export default async function NicheDemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getNiche(slug);
  if (!config) notFound();
  return <NicheLanding config={config} />;
}
