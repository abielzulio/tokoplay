import { Product } from "../../types/tokoplay"
import { cn } from "../../utils/cn"

function ProductCard({
  product,
  isLoading,
}: {
  product: Product
  isLoading: boolean
}) {
  return (
    <a href={product.url} target="_blank" rel="noopener nofollow">
      <div className="h-fit flex flex-col border-[1px] border-white/10 rounded-md bg-gray">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-[200px] object-cover transition rounded-t-md",
              {
                "blur-md": isLoading,
                "blur-none": !isLoading,
              }
            )}
          />
        </div>
        <div className="flex flex-col p-[10px] gap-[5px]">
          <p className="font-medium text-[14px]">{product.name}</p>
          <p className="opacity-50 text-[14px]">
            Rp{product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </a>
  )
}

export default ProductCard
