import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { useAuth } from "./hooks/users";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const user = useAuth();
  console.log(user.isPending, "usert");
  return (
    <>
      {user.isLoading ? (
        "...Loading"
      ) : (
        <RouterProvider router={router} context={{ auth: user?.data }} />
      )}
    </>
  );
};

export default App;
