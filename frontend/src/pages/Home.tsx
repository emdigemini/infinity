import OverviewCard from "../components/OverviewCard";
import { useAlbumContext } from "../context/AlbumContext";
import {
  Images,
  Heart
} from "lucide-react";

const Home = () => {
  const { albums } = useAlbumContext();

  return (
    <div className="
      flex h-auto
      flex-col items-center
      gap-4 pb-12
    ">

      {albums?.length > 0 ? (

        <>
          {/* Header */}
          <div className="
            flex w-full
            items-center gap-3
            rounded-2xl
            border border-[#E8D9A5]
            bg-[#FFFDF5]
            px-4 py-3
            shadow-sm
          ">

            <div className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-xl
              bg-[#F9F1D0]
              text-[#D4A72C]
            ">
              <Images
                size={19}
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">

              <div className="
                flex items-center
                gap-1.5
              ">

                <h1 className="
                  text-sm
                  font-bold
                  text-[#2B2618]
                ">
                  Our Memories
                </h1>

                <Heart
                  size={12}
                  fill="currentColor"
                  className="text-[#D4A72C]"
                />

              </div>

              <p className="
                mt-0.5
                text-[11px]
                text-[#8B7A45]
              ">
                A little collection of moments together.
              </p>

            </div>

          </div>

          {/* Albums */}
          {albums.map((item) => (
            <OverviewCard
              key={item._id}
              name={item.name}
              mediaCount={item.mediaCount}
              albumId={item._id}
              media={item.media}
            />
          ))}

        </>

      ) : (

        /* Empty State */
        <div className="
          w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-[#E8D9A5]
          bg-[#FFFDF5]
          shadow-sm
        ">

          {/* Mustard Accent */}
          <div className="
            h-2 w-full
            bg-[#D4A72C]
          " />

          <div className="
            flex flex-col
            items-center
            px-6 py-12
            text-center
          ">

            {/* Icon */}
            <div className="
              mb-5
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-[#F9F1D0]
              text-[#D4A72C]
            ">

              <Images
                className="h-8 w-8"
                strokeWidth={1.75}
              />

            </div>

            {/* Heading */}
            <div className="
              flex items-center
              gap-1.5
            ">

              <h3 className="
                text-lg
                font-bold
                text-[#2B2618]
              ">
                No memories yet
              </h3>

              <Heart
                size={14}
                fill="currentColor"
                className="text-[#D4A72C]"
              />

            </div>

            {/* Description */}
            <p className="
              mt-2 max-w-xs
              text-sm leading-6
              text-[#8B7A45]
            ">
              Your little moments together will
              appear here once you create an album.
            </p>

            {/* Decorative Hearts */}
            <div className="
              mt-6 flex
              items-center gap-2
              text-[#D4A72C]
            ">

              <Heart
                size={11}
                fill="currentColor"
              />

              <div className="
                h-px w-10
                bg-[#E8D9A5]
              " />

              <Heart
                size={15}
                fill="currentColor"
              />

              <div className="
                h-px w-10
                bg-[#E8D9A5]
              " />

              <Heart
                size={11}
                fill="currentColor"
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Home;