import prisma from "@/lib/client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {};

async function page({}: Props) {
  const reflections = await prisma.reflection.findMany();
  
  return (
    <div>
      <DataTable columns={columns} data={reflections} />
    </div>
  );
}

export default page;
