import { AuthPageComponent } from "@/components/auth-page";
import { createFileRoute } from "@tanstack/react-router";

const Auth = () => {
  return (
    <main>
      <div>
        <AuthPageComponent />
      </div>
    </main>
  );
};

export const Route = createFileRoute("/_auth/auth")({
  component: () => Auth(),
});
