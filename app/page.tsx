import HomeContent from "@/components/home-content";
import { sanity } from "@/lib/sanity";
import { servicesDetail } from "@/lib/servicesDetailsData";

export const revalidate = 3600;

const fallbackServices = servicesDetail.map((service) => ({
  title: service.title,
  description: service.description,
  color: service.color,
  icon: service.icon?.name || "Shield",
}));

export default async function Home() {
  const [servicesResult, articlesResult] = await Promise.allSettled([
    sanity.fetchServices(),
    sanity.fetchArticles(9),
  ]);

  const services =
    servicesResult.status === "fulfilled" && servicesResult.value.length > 0
      ? servicesResult.value
      : fallbackServices;
  const articles =
    articlesResult.status === "fulfilled" ? articlesResult.value : [];

  return <HomeContent services={services} articles={articles} />;
}
