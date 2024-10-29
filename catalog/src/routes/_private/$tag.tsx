import { useGetImageByTags } from "@/hooks/users";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { createFileRoute } from "@tanstack/react-router";
import { LoaderPinwheelIcon } from "lucide-react";
import { match } from "ts-pattern";
import { Gallery } from "react-grid-gallery";
import React from "react";

const TagView = () => {
  const { tag } = Route.useParams();
  const [index, setIndex] = React.useState(-1);
  const images = useGetImageByTags({ tag });
  const handleClick = (index: number) => setIndex(index);
  return (
    <div>
      <div>
        {match(images.isLoading)
          .with(true, () => <LoaderPinwheelIcon className="animate-spin" />)
          .with(false, () => {
            return (
              <div>
                {images.data && (
                  <>
                    <Gallery
                      onClick={handleClick}
                      images={images.data?.map((image) => ({
                        src: image.key,
                        width: 700,
                        height: 700,
                      }))}
                    />
                    <Lightbox
                      slides={images.data?.map((image) => ({
                        src: image.key,
                        width: 700,
                        height: 700,
                      }))}
                      open={index >= 0}
                      index={index}
                      close={() => setIndex(-1)}
                    />
                  </>
                )}
              </div>
            );
          })
          .exhaustive()}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_private/$tag")({
  component: () => <TagView />,
});
