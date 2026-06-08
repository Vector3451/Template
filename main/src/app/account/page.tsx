import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Shell } from "@/components/layout/Shell";

export const metadata = {
  title: "Account — Store",
  description: "Your account",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: { product: true },
          },
        },
      },
    },
  });

  return (
    <Shell variant="narrow" className="py-8">
      <h1 className="text-3xl font-bold">Account</h1>

      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-4 rounded-lg border p-4">
          {session.user.image && (
            <img
              src={session.user.image}
              alt=""
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{user?.name ?? session.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {user?.email ?? session.user.email}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          {user && user.orders.length > 0 ? (
            <div className="mt-4 space-y-3">
              {user.orders.map((order: any) => (
                <div key={order.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Order #{order.id.slice(-8)}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    {" · "}
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    {" · "}
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No orders yet.
            </p>
          )}
        </div>
      </div>
    </Shell>
  );
}
