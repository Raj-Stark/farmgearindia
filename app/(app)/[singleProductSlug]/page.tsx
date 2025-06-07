import { ProductType, Review } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import axios from "axios";
import ProductCardAction from "./components/product-card-action";
import { ImageCarousel } from "@/components/custom/Image-carousel";
import StarRating from "@/components/custom/star-rating";
import ProductReviewForm from "./components/product-review-form";
import ProductReviewList from "./components/product-review-list";
import { Marked } from "marked";

interface SingleProductPageProps {
  params: {
    singleProductSlug: string;
  };
}

export interface SingleProductType extends ProductType {
  reviews: Review[];
}

const marked = new Marked({
  gfm: true,
  breaks: true,
});

async function getProductById(
  singleProductSlug: string
): Promise<SingleProductType | null> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/${singleProductSlug}`
    );

    return response.data.product;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

const ProductDetailsPage = async ({ params }: SingleProductPageProps) => {
  const { singleProductSlug } = params;

  let product: SingleProductType | null = null;
  let error: string | null = null;

  try {
    product = await getProductById(singleProductSlug);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-red-600 text-center">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        Product not found.
      </div>
    );
  }

  const htmlDescription = await marked.parse(product.description);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center">
        {/* Product Image */}
        <div className="w-full lg:w-2xl">
          {product.images && product.images.length > 0 ? (
            <ImageCarousel image={product.images} />
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <StarRating ratingValue={String(product.averageRating) || ""} />
              <span>({product.numOfReviews} reviews)</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span
              className={product.inventory ? "text-green-600" : "text-red-500"}
            >
              {product.inventory === 0 ? "Out Of Stock" : "In Stock"}
            </span>
          </div>

          <p className="text-2xl font-bold mt-4">₹ {product.price}</p>

          <Separator className="my-4" />

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />

          <Separator className="my-4" />
          <ProductCardAction product={product} />
        </div>
      </div>
      <ProductReviewForm productId={product._id} />
      <ProductReviewList reviews={product.reviews} />
    </div>
  );
};

export default ProductDetailsPage;
