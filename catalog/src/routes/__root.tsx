import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { UserPayload } from "@/services/schema";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  auth: (UserPayload & { id: string }) | undefined;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
