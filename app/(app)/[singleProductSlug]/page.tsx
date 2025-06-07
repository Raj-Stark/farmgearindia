import { ProductType, Review } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import ProductCardAction from "./components/product-card-action";
import { ImageCarousel } from "@/components/custom/Image-carousel";

interface SingleProductPageProps {
  params: {
    singleProductSlug: string;
  };
}

export interface SingleProductType extends ProductType {
  reviews: Review[];
}

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

// Format plain text into simple HTML
function convertPlainTextToHtml(description: string): string {
  const lines = description.split(/\r?\n/);
  let html = "";
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("•")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${trimmed.replace("•", "").trim()}</li>`;
    } else {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      if (trimmed) {
        html += `<p>${trimmed}</p>`;
      }
    }
  }

  if (inList) html += "</ul>";

  return html;
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

  const htmlDescription = convertPlainTextToHtml(product.description);

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
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{product.averageRating}</span>
              <span>({product.numOfReviews} reviews)</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span
              className={product.inventory ? "text-green-600" : "text-red-500"}
            >
              {product.inventory ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-2xl font-bold mt-4">₹ {product.price}</p>

          <Separator className="my-4" />

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />

          <Separator className="my-4" />
          <ProductCardAction />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
