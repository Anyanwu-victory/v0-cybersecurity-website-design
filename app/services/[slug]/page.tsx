import { servicesDetail } from '@/lib/servicesDetailsData';
import ServicePageClient from './service-page-client';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';

export const generateStaticParams = () => {
  return servicesDetail.map((service) => ({
    slug: service.slug,
  }));
};

export const dynamicParams = false;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesDetail.find((s) => s.slug === slug);

  if (!service) return { title: 'Service Not Found' };

  const pageUrl = `https://www.rtdsentinel.com/services/${slug}`;

  return {
    title: `${service.title} | Cybersecurity Services`,
    description: service.description || service.subtitle,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.title} | Cybersecurity Services`,
      description: service.description || service.subtitle,
      url: pageUrl,
      images: [{ url: 'https://www.rtdsentinel.com/images/redtraced_logo.jpeg', alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Cybersecurity Services`,
      description: service.description || service.subtitle,
      images: ['https://www.rtdsentinel.com/images/redtraced_logo.jpeg'],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesDetail.find((s) => s.slug === slug);

  return (
    <>
      {service && (
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.rtdsentinel.com' },
            { name: 'Services', url: 'https://www.rtdsentinel.com/#services' },
            { name: service.title, url: `https://www.rtdsentinel.com/services/${slug}` },
          ]}
        />
      )}
      <ServicePageClient slug={slug} />
    </>
  );
}

