import {
  BrandIcon,
  brandIconBadgeClassName,
  brandIconHidesLabel,
} from "@/components/brand-icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TechBadge({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  const hideLabel = brandIconHidesLabel(tag);

  return (
    <Badge
      className={cn(
        "h-6 w-fit gap-1.5 border border-border px-2 text-[11px] font-medium",
        className
      )}
      variant="outline"
    >
      <BrandIcon
        name={tag}
        className={brandIconBadgeClassName(tag)}
      />
      {!hideLabel && <span>{tag}</span>}
    </Badge>
  );
}
