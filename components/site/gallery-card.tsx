import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCategoryLabel, type RegistryItem } from "@/lib/registry"

interface GalleryCardProps {
  item: RegistryItem
}

export function GalleryCard({ item }: GalleryCardProps) {
  const category = item.categories[0]

  return (
    <Link href={`/docs/${category}/${item.name}`}>
      <Card className="h-full transition-colors hover:border-foreground/30">
        <CardHeader>
          <div className="mb-2">
            <Badge variant="secondary">{getCategoryLabel(category)}</Badge>
          </div>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
