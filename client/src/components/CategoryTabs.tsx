import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <section className="py-8 border-b" id="tools">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              onClick={() => onCategoryChange(category.id)}
              className="rounded-full px-6"
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
