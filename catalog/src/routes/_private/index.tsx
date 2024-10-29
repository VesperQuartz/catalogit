import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGenerateTags, useGetUserTags } from "@/hooks/users";
import { createFileRoute } from "@tanstack/react-router";
import { Folder, LoaderPinwheel } from "lucide-react";
import React from "react";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { match } from "ts-pattern";
import { Link } from "@tanstack/react-router";

const tagSearchParams = z.object({
  tags: z.array(z.string()).optional(),
});

export const Route = createFileRoute("/_private/")({
  component: HomeComponent,
  validateSearch: tagSearchParams,
});

function HomeComponent() {
  const [image, setImage] = React.useState<File | undefined>();
  const tag = useGenerateTags();
  const { tags: filterTag } = Route.useSearch();
  const tags = useGetUserTags({ filterTag });
  return (
    <div className="p-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add to collection</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Note that tags given to images might not be 100% accurate
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event?.preventDefault();
              const form = new FormData();
              form.append("file", image!);
              tag.mutate({ form });
            }}
            className="flex gap-2"
          >
            <Input
              type="file"
              onChange={(event) => setImage(event.target.files?.[0])}
              accept="image/*"
            />
            <Button type="submit">
              {tag.isPending ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {match(tags.isLoading)
        .with(true, () => null)
        .with(false, () => {
          return (
            <React.Fragment>
              <div className="flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3">
                {tags.data?.map((tag) => {
                  return (
                    <div
                      key={tag}
                      className="relative flex items-center flex-col"
                    >
                      <Link to={tag}>
                        <Folder className="" color="#F8D775" size={280} />
                      </Link>
                      <span className="text-xl font-bold absolute top-[50%]">
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })
        .exhaustive()}
    </div>
  );
}
