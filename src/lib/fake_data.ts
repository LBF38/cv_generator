import { ExperienceCardProps } from "@/components/experience-card";
import { generateExperience, getRandomInt } from "./utils";

export const sections: { title: string, id: string, experiences: Partial<ExperienceCardProps>[] }[] = [
    {
        title: "Experiences",
        id: "#experiences",
        experiences: Array.from({ length: getRandomInt(2, 5) }, generateExperience)
    },
    {
        title: "Projects",
        id: "#projects",
        experiences: Array.from({ length: getRandomInt(2, 5) }, generateExperience)
    },
    {
        title: "Studies",
        id: "#studies",
        experiences: Array.from({ length: getRandomInt(2, 5) }, generateExperience)
    }
];
