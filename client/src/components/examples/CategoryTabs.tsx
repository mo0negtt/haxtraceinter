import { useState } from "react";
import CategoryTabs from "../CategoryTabs";

const categories = [
  { id: "all", label: "Todos" },
  { id: "editor", label: "Editor" },
  { id: "emphasis", label: "Énfasis" },
];

export default function CategoryTabsExample() {
  const [active, setActive] = useState("all");
  
  return (
    <div className="p-8">
      <CategoryTabs
        categories={categories}
        activeCategory={active}
        onCategoryChange={setActive}
      />
    </div>
  );
}
