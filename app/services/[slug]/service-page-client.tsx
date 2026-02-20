'use client';

import { servicesDetail } from '@/lib/servicesDetailsData';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ServiceHero from '@/components/service-details/service-hero';
import ServiceBenefits from '@/components/service-details/service-benefits';
import ServiceProcess from '@/components/service-details/service-process';
import ServicePortfolio from '@/components/service-details/service-portfolio';
import TrainingPortfolio from '@/components/service-details/training-portfolio';
import CTA from '@/components/service-details/cta-section';

interface ServicePageProps {
  slug: string;
}

export default function ServicePageClient({ slug }: ServicePageProps) {
  const service = servicesDetail.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden bg-[#0B0E14]">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:text-[#E11D2E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <ServiceHero service={service} />

      {/* Benefits Section */}
      <ServiceBenefits benefits={service.benefits} />

      {/* Process Section */}
      <ServiceProcess process={service.process} />

      {/* Portfolio Section */}
      {service.slug === 'training-webinars' ? (
        <TrainingPortfolio service={service} />
      ) : (
        <ServicePortfolio portfolio={service?.portfolio ?? []} />
      )}

      {/* CTA Section */}
      <CTA title={service.title} />
    </div>
  );
}
