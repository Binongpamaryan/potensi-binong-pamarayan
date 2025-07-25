import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PotensiCardProps = {
  id: string;
  title: string;
  category: string;
  mainImage?: string | null;
};

export default function PotensiCard({
  id,
  title,
  category,
  mainImage,
}: PotensiCardProps) {
  return (
    <Link href={`/potensi/${id}`}>
      <Card className={cn("hover:shadow-lg transition-shadow cursor-pointer")}>
        {mainImage && (
          <Image
            src={mainImage}
            alt={title}
            width={100}
            height={100}
            className="w-full h-40 object-cover rounded-t"
          />
        )}
        <CardContent>
          <CardTitle className="mb-1">{title}</CardTitle>
          <p className="text-xs text-muted-foreground">{category}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
