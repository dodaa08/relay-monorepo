import { Suspense } from "react";
import { prisma } from "@repo/db/client";
import { connection } from "next/server";

async function Users() {
  await connection();
  const users = await prisma.user.findMany();
  return <div>{JSON.stringify(users)}</div>;
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Users />
    </Suspense>
  );
}