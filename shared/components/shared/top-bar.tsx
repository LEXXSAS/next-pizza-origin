import { cn } from "@/shared/lib/utils";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({categories, className}) => {
  return (
    <div id='top-bar' className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center container mx-auto justify-between flex-wrap flex-row">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
