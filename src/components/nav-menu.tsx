import React from "react";
import { Category } from "../config/categories";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ArrowUpRight } from "lucide-react";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:max@studiomakai.net",
    description: "max@studiomakai.net",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxfung/",
    description: "in/maxfung",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fungkadelic/",
    description: "@fungkadelic",
  },
  {
    label: "GitHub",
    href: "https://www.github.com/mxfng",
    description: "mxfng",
  },
] as const;

const ACTIVE_CLASS = "text-primary hover:text-primary";

interface NavMenuProps {
  currentPath: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentPath }) => {
  const routeBuckets = {
    works: ["/works"],
    writing: ["/writing"],
    about: ["/about"],
  };

  const isRouteActive = (bucket: keyof typeof routeBuckets): string => {
    return routeBuckets[bucket].some((prefix) => currentPath.startsWith(prefix))
      ? ACTIVE_CLASS
      : "";
  };

  const isExactRouteActive = (url: string): string => {
    return currentPath === url ? ACTIVE_CLASS : "";
  };

  // goofy logic to handle the home/works routes
  const isWorksRouteActive = (): string => {
    const active =
      currentPath === "/" ||
      routeBuckets.works.some((prefix) => currentPath.startsWith(prefix));
    return active ? ACTIVE_CLASS : "";
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={isWorksRouteActive()}>
            works
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[300px]">
              <li>
                <NavigationMenuLink
                  href="/"
                  className={isExactRouteActive("/")}
                >
                  all
                </NavigationMenuLink>
              </li>
              {Object.values(Category).map((category) => {
                const categoryPath = `/works/category/${category.toLowerCase()}`;
                return (
                  <li key={category}>
                    <NavigationMenuLink
                      href={categoryPath}
                      className={isExactRouteActive(categoryPath)}
                    >
                      <div className="font-medium">{category}</div>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/writing"
            className={isRouteActive("writing")}
          >
            writing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className={isRouteActive("about")}>
            about
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>contact</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[300px]">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <NavigationMenuLink
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block p-3 hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="font-medium flex items-center gap-0.5">
                      {link.label}{" "}
                      {link.href.startsWith("http") && (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
