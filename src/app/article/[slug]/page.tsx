import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/strapi";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getCollection<any>(
    "articles",
    `filters[slug][$eq]=${slug}&populate=*`
  );
  
  const article = articles[0];
  if (!article) {
    return { title: "Not Found" };
  }

  const seo = article.seo || {
    metaTitle: article.title,
    metaDescription: article.excerpt,
    shareImage: article.featured_image,
  };

  return buildMetadata(seo, {
    title: article.title,
    description: article.excerpt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  
  let articles: any[] = [];
  try {
    articles = await getCollection<any>(
      "articles",
      `filters[slug][$eq]=${slug}&populate=*`
    );
  } catch {
    articles = [];
  }

  const article = articles[0];
  
  if (!article) {
    notFound();
  }

  return <ArticleDetail data={article} />;
}
