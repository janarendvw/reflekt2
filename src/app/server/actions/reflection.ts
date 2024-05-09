"use server"

import prisma from "@/lib/client"
import { Reflection } from "@prisma/client"
import { redirect } from "next/navigation"

export const createReflection = async (input: Partial<Reflection>) => {
    await prisma.reflection.create({
        data: {
            title: input.title ?? 'Untitled Reflection',
            content: input.content,
            reflectionType: input.reflectionType ?? "DEFAULT",
            author: {
                connect: {
                    id: input.authorId
                }
            }
            
        }
    }).then(() => {
        redirect('/reflections')
    })
}