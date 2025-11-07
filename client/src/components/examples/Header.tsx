import Header from "../Header";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header onSearch={(q) => console.log("Search:", q)} />
    </ThemeProvider>
  );
}
