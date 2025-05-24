import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface CategoryMenuProps {
  triggerLabel: string;
  basePath: string;
  allItemsPath?: string;
  categories: Record<string, string>;
  isActive: () => string;
  isExactRouteActive: (url: string) => string;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  triggerLabel,
  basePath,
  allItemsPath = basePath,
  categories,
  isActive,
  isExactRouteActive,
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className={isActive()}>
      {triggerLabel}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="w-[300px]">
        <li>
          <NavigationMenuLink
            href={allItemsPath}
            className={isExactRouteActive(allItemsPath)}
          >
            all
          </NavigationMenuLink>
        </li>
        {Object.entries(categories).map(([_, value]) => {
          const categoryPath = `${basePath}/category/${value.toLowerCase()}`;
          return (
            <li key={value}>
              <NavigationMenuLink
                href={categoryPath}
                className={isExactRouteActive(categoryPath)}
              >
                <div className="font-medium">{value}</div>
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

export default CategoryMenu;
