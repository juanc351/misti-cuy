import {
  ChartColumn,
  Dna,
  House,
  Leaf,
  Rabbit,
  ShieldPlus,
  Sprout,
  Tags,
} from "lucide-react";

export function getCategoryIcon(
  icon: string,
  size = 46
) {
  switch (icon) {
    case "leaf":
      return <Leaf size={size} />;

    case "dna":
      return <Dna size={size} />;

    case "building":
      return <House size={size} />;

    case "heart":
      return <Rabbit size={size} />;

    case "shield":
      return <ShieldPlus size={size} />;

    case "sprout":
      return <Sprout size={size} />;

    case "clipboard":
      return <ChartColumn size={size} />;

    case "chart-line":
      return <Tags size={size} />;

    default:
      return <Leaf size={size} />;
  }
}