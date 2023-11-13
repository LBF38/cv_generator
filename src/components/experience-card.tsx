import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export type ExperienceCardProps = {
    title: string;
    description: string;
    content: string;
    footer: string;
}

export default function ExperienceCard({
    title = "Experience Title",
    description = "Experience Description",
    content = "Experience Content",
    footer = "Experience Footer",
}: Partial<ExperienceCardProps>) {
    return <Card className="m-5">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{content}</p>
        </CardContent>
        <CardFooter>
            <p>{footer}</p>
        </CardFooter>
    </Card>
}
