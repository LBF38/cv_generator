import { ExperienceCardProps } from "@/components/experience-card";
import { generateExperience, getRandomInt } from "./utils";

export class SectionsEntity {
    constructor(public title: string, public id: string, public experiences: Partial<ExperienceCardProps>[]) { }
};

export const fake_sections: SectionsEntity[] = [new SectionsEntity("About", "#about", [{ title: "About", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", content: "", footer: "" }]),
new SectionsEntity("Experiences", "#experiences", Array.from({ length: getRandomInt(2, 5) }, generateExperience)), new SectionsEntity("Projects", "#projects", Array.from({ length: getRandomInt(2, 5) }, generateExperience)), new SectionsEntity("Studies", "#studies", Array.from({ length: getRandomInt(2, 5) }, generateExperience)),
];
