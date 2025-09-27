// app/showcase/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import optimizedImageData, { OptimizedImageDataItem } from '../../../data/data/optimizedImageData';
import ShowcaseClient from './components/showcaseClient'

// Define valid slugs for type safety
type ValidSlug = keyof typeof optimizedImageData;

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all valid showcase categories
export async function generateStaticParams() {
  const slugs = Object.keys(optimizedImageData) as ValidSlug[];
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  
  // Check if slug is valid
  if (!optimizedImageData[slug as ValidSlug]) {
    return {
      title: 'Page Not Found',
    };
  }
  
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const imageCount = optimizedImageData[slug as ValidSlug].length;
  
  return {
    title: `${categoryName} Showcase - Interior Design Portfolio`,
    description: `Explore our ${categoryName.toLowerCase()} interior design projects. View ${imageCount} stunning ${categoryName.toLowerCase()} designs showcasing luxury and modern aesthetics.`,
    openGraph: {
      title: `${categoryName} Interior Design Showcase`,
      description: `Discover our premium ${categoryName.toLowerCase()} interior design portfolio with ${imageCount} carefully curated projects.`,
      type: 'website',
    },
  };
}

const ShowcasePage = ({ params }: PageProps) => {
  const { slug } = params;
  
  // Type-safe validation
  const isValidSlug = (slug: string): slug is ValidSlug => {
    return slug in optimizedImageData;
  };
  
  // Check if the slug exists in our data
  if (!isValidSlug(slug)) {
    notFound();
  }
  
  // Get the images for this category
  const categoryImages: OptimizedImageDataItem[] = optimizedImageData[slug];
  
  // Get category display name
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  // Category descriptions for better UX
  const categoryDescriptions: Record<ValidSlug, string> = {
    washroom: "Discover elegant and contemporary washroom designs that blend functionality with luxury aesthetics.",
    apartment: "Explore sophisticated apartment interiors featuring modern living spaces and thoughtful design elements.",
    bar: "Experience premium bar designs that create the perfect atmosphere for entertainment and relaxation.",
    bedroom: "Browse serene and luxurious bedroom designs that prioritize comfort and style.",
    dining: "View stunning dining room concepts that bring families together in beautifully designed spaces.",
    office: "Discover professional and inspiring office designs that enhance productivity and creativity.",
    spa: "Explore tranquil spa interiors designed to provide the ultimate relaxation and wellness experience.",
    villa: "Admire grand villa designs that showcase luxury living with spacious and elegant interiors."
  };
  
  // Pass all necessary props to client component
  return (
    <ShowcaseClient
      images={categoryImages}
      categoryName={categoryName}
      categorySlug={slug}
      categoryDescription={categoryDescriptions[slug]}
      totalImages={categoryImages.length}
    />
  );
};

export default ShowcasePage;