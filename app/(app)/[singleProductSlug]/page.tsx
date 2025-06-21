import { ProductType, Review } from "@/app/types";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import ProductCardAction from "./components/product-card-action";
import { ImageCarousel } from "@/components/custom/Image-carousel";
import StarRating from "@/components/custom/star-rating";
import ProductReviewForm from "./components/product-review-form";
import ProductReviewList from "./components/product-review-list";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

// Combined product type including reviews
export interface SingleProductType extends ProductType {
  reviews: Review[];
}

// Memoized product fetch
async function getProductById(
  singleProductSlug: string
): Promise<SingleProductType | null> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/${singleProductSlug}`
    );
    return res.data.product;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

// Dynamic metadata generation for SEO
export async function generateMetadata({
  params,
}: {
  params: { singleProductSlug: string };
}): Promise<Metadata> {
  const { singleProductSlug } = params;
  const product = await getProductById(singleProductSlug);

  if (!product) {
    return {
      title: "Product not found | Spare Parts Bharat",
      description: "The requested product is unavailable.",
    };
  }

  return {
    title: `${product.name} | Spare Parts Bharat`,
    description:
      product.description?.slice(0, 160) ||
      "Premium spare parts for mill & farming machinery.",
    openGraph: {
      title: `${product.name} | Spare Parts Bharat`,
      description:
        product.description?.slice(0, 200) ||
        "High-quality replacement parts for agricultural and milling machines.",
      url: `https://www.sparepartsbharat.com/${singleProductSlug}`,
      siteName: "Spare Parts Bharat",
      images: product.images?.length
        ? [
            {
              url: product.images[0],
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Spare Parts Bharat`,
      description: product.description?.slice(0, 200),
      images: product.images || [],
    },
  };
}

// PageProps for Next.js 14 using synchronous params
type PageProps = {
  params: { singleProductSlug: string };
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { singleProductSlug } = params;
  const product = await getProductById(singleProductSlug);

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        Product not found.
      </div>
    );
  }

  const processDescription = (text: string) =>
    text.replace(/\n\n/g, "\n").replace(/\n/g, "\n\n");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center">
        <div className="w-full lg:w-2xl">
          {product.images?.length ? (
            <ImageCarousel image={product.images} />
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <StarRating ratingValue={`${product.averageRating}`} />
              <span>({product.numOfReviews} reviews)</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span
              className={
                product.inventory === 0 ? "text-red-500" : "text-green-600"
              }
            >
              {product.inventory === 0 ? "Out Of Stock" : "In Stock"}
            </span>
          </div>

          <p className="text-2xl font-bold mt-4">₹ {product.price}</p>
          <Separator className="my-4" />

          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                li: ({ node, ...props }) => (
                  <li className="ml-4 list-disc" {...props} />
                ),
              }}
            >
              {processDescription(
                product.description ?? "No description available"
              )}
            </ReactMarkdown>
          </div>

          <Separator className="my-4" />
          <ProductCardAction product={product} />
        </div>
      </div>

      <ProductReviewForm productId={product._id} />
      <ProductReviewList reviews={product.reviews} />
    </div>
  );
}
