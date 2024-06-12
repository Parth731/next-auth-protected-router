import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  console.log(session);

  if (session?.token) redirect("/dashboard");

  return <>{props.children}</>;
}
