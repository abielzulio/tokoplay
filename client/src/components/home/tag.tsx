import { Check, X } from "lucide-react"
import { forwardRef, useState } from "react"
import { cn } from "../../utils/cn"

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ isSelected, children, ...props }, ref) => {
    const [isHovering, setHovering] = useState(false)
    return (
      <button
        type="button"
        className={cn(
          " flex items-center gap-[10px] py-[5px] text-[12px]  border-[1px] border-white/20  transition rounded-full",
          {
            "bg-white/100 text-black hover:bg-white/90 border-r-black/20 px-[10px]":
              isSelected,
            " bg-white/[0.05] hover:opacity-90 text-white hover:border-white/90 px-[15px]":
              !isSelected,
          }
        )}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        ref={ref}
        {...props}
      >
        {isSelected ? isHovering ? <X size={16} /> : <Check size={16} /> : null}
        <span>{children}</span>
        {typeof children === "string" &&
        children.length > 0 &&
        children === "Live" ? (
          <span className="w-[8px] h-[8px] -ml-[1px] rounded-full bg-red-500 animate-pulse animate" />
        ) : null}
      </button>
    )
  }
)

export default Tag
