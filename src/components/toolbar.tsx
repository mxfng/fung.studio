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
import "@/styles/fonts.css";
import PaddingX from "./padding-x";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block p-3 hover:bg-accent hover:text-accent-foreground"
          {...props}
        >
          <div className="font-medium">{title}</div>
          {children && (
            <p className="text-sm text-muted-foreground">{children}</p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Toolbar: React.FC = () => {
  return (
    <nav className="border-b">
      <PaddingX>
        <div className="flex items-center justify-between sm:h-16">
          <div className="flex flex-col items-start w-full sm:flex-row sm:items-center sm:gap-8 sm:justify-between">
            <a href="/" className="text-5xl font-['boxy-regular']">
              MF
            </a>
            <div className="flex gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <a href="/">
                      <NavigationMenuTrigger>works</NavigationMenuTrigger>
                    </a>
                    <NavigationMenuContent>
                      <ul className="w-[300px]">
                        {Object.values(Category).map((category) => (
                          <ListItem
                            key={category}
                            href={`/works/${category.toLowerCase()}`}
                            title={category}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/writings">
                      writings
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/about">about</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>contact</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[300px]">
                        <ListItem
                          href="mailto:max@studiomakai.net"
                          title="Email"
                        >
                          max@studiomakai.net
                        </ListItem>
                        <ListItem
                          href="https://www.linkedin.com/in/maxfung/"
                          title="LinkedIn"
                        >
                          in/maxfung
                        </ListItem>
                        <ListItem
                          href="https://www.instagram.com/fungkadelic/"
                          title="Instagram"
                        >
                          @fungkadelic
                        </ListItem>
                        <ListItem
                          href="https://www.github.com/mxfng"
                          title="GitHub"
                        >
                          mxfng
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </PaddingX>
    </nav>
  );
};

export default Toolbar;
