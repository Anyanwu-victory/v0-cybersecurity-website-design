import { servicesDetail } from '@/lib/servicesDetailsData';
import ServicePageClient from './service-page-client';

export const generateStaticParams = () => {
  return servicesDetail.map((service) => ({
    slug: service.slug,
  }));
};

export const dynamicParams = false;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  return <ServicePageClient slug={slug} />;
}
