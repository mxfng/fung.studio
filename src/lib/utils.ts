import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Category } from "@/content/categories";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const normalizePath = (url: string): string => url.replace(/\/+$/, "");

const getCategoryPath = (category: Category, basePath: string): string => {
	return `${basePath}/category/${category.toLowerCase()}`;
};

export { cn, capitalize, normalizePath, getCategoryPath };
