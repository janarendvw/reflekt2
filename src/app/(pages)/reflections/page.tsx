import prisma from "@/lib/client";
import React from "react";

type Props = {};

async function page({}: Props) {
  const reflections = await prisma.reflection.findMany();
  
  return (
    <div>
      {reflections.map((reflection) => {
        return <div key={reflection.id}>{reflection.content}</div>;
      })}
    </div>
  );
}

export default page;
