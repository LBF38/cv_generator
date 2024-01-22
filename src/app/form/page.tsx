"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { insertExperienceSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(2).max(250),
    age: z.number().positive(),
})

export default function Home() {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            // title: "",
            // description: "",
            // company: "",
            // location: "",
            // type: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof schema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormDescription>
                                What is your name?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input placeholder="age" type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormDescription>
                                What is your age?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" > Submit</Button>
            </form >
        </Form>
    )

    // return (
    //     <Form {...form} >
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //             <FormField
    //                 control={form.control}
    //                 name="title"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>Titre</FormLabel>
    //                         <FormControl>
    //                             <Input placeholder="experience title" {...field} />
    //                         </FormControl>
    //                         <FormDescription>
    //                             The title of the experience.
    //                         </FormDescription>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="description"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>Description</FormLabel>
    //                         <FormControl>
    //                             <Textarea placeholder="description" className="resize-none"
    //                                 {...field} value={field.value || ""} />
    //                         </FormControl>
    //                         <FormDescription>
    //                             The description of the experience.
    //                         </FormDescription>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="company"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>Company</FormLabel>
    //                         <FormControl>
    //                             <Input placeholder="company" {...field} />
    //                         </FormControl>
    //                         <FormDescription>
    //                             What is the company name?
    //                         </FormDescription>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="location"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>Location</FormLabel>
    //                         <FormControl>
    //                             <Input placeholder="location" {...field} />
    //                         </FormControl>
    //                         <FormDescription>
    //                             Where is the company located?
    //                         </FormDescription>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <Button type="submit" > Submit</Button>
    //         </form >
    //     </Form >
    // )
}
