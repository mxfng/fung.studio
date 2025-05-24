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

const NavMenu: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="/">
            <NavigationMenuTrigger>works</NavigationMenuTrigger>
          </a>
          <NavigationMenuContent>
            <ul className="w-[300px]">
              {Object.values(Category).map((category) => (
                <li key={category}>
                  <a
                    href={`/works/${category.toLowerCase()}`}
                    className="block p-3 hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="font-medium">{category}</div>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/writing">writing</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">about</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>contact</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[300px]">
              <li>
                <a
                  href="mailto:max@studiomakai.net"
                  className="block p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="font-medium">Email</div>
                  <p className="text-sm text-muted-foreground">
                    max@studiomakai.net
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/maxfung/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="font-medium">LinkedIn</div>
                  <p className="text-sm text-muted-foreground">in/maxfung</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/fungkadelic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="font-medium">Instagram</div>
                  <p className="text-sm text-muted-foreground">@fungkadelic</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.github.com/mxfng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="font-medium">GitHub</div>
                  <p className="text-sm text-muted-foreground">mxfng</p>
                </a>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
