import { GalleryCard } from "@/components/site/gallery-card";
import { getItems } from "@/lib/registry";

export default function Home() {
  const items = getItems();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Component Registry</h1>
        <p className="mt-2 text-muted-foreground">
          A personal collection of UI animations, scroll effects, Lottie
          integrations, and 3D components — ready to preview, copy, or
          install via the shadcn CLI.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <GalleryCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
