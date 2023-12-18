import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateExperience() {
  return {
    title: `Experience ${Math.random().toString(36).substring(7)}`,
    description: `Description ${Math.random().toString(36).substring(7)}`,
    content: `Content ${Math.random().toString(36).substring(7)}`,
    footer: `${getRandomInt(2000, 2022)} - ${getRandomInt(2000, 2022)}`
  };
}
