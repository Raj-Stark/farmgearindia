import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("token");

  if (hasCookie) {
    redirect("/");
  } else {
    redirect("/login");
  }

  return <>{children}</>;
}
