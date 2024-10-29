import { ImageGalleryDashboard } from "@/components/image-gallery-dashboard";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context }) => {
    console.log("context", context);
  },
  component: () => (
    <ImageGalleryDashboard>
      <Outlet />
    </ImageGalleryDashboard>
  ),
});
