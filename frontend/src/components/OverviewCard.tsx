import { Camera, Play, ImageIcon } from "lucide-react"
import type { MediaType } from "..";

type OverviewCardType = {
  name: string;
  mediaCount: number;
  albumId?: string;
  media: MediaType[] | []
}

const OverviewCard = ({ name, mediaCount, albumId, media }: OverviewCardType) => {

  return (
    <div 
      className="flex flex-col gap-4 min-h-24 h-max-71 w-full rounded-2xl border border-black/5 bg-white p-2 shadow-sm"
    >
      <div 
        className="flex items-center justify-between text-[#666] text-xs"
        onClick={() => console.log(albumId)}
      >
        <span>{name}</span>
        <span className="flex items-center gap-2"><Camera strokeWidth={1} color="black" /> {media.length} Photos </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {media.length === 0
          ? (
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                  <ImageIcon className="h-4 w-4 text-gray-400" />
                </div>

                <p className="text-xs font-medium text-gray-400">
                  No media found.
                </p>
              </div>
            )
          : media.slice(0, 9).map((m, index) => {
              const isLast = index === 8;
              const remaining = mediaCount - 8;

              return (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl"
                  onClick={() => {
                    if (isLast) {
                      console.log('albumId: ', albumId);
                      return;
                    }

                    console.log('mediaId: ', m._id);
                  }}
                >
                  {m.type === 'image'
                    ? <img
                        src={m.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    : (
                      <>
                        <video
                          className="block h-full w-full object-cover"
                          src={m.url}
                          muted
                          playsInline
                          preload="metadata"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                            <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                          </div>
                        </div>
                      </>
                    )}

                  {isLast && remaining > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-lg font-semibold text-white">
                        {remaining > 9 ? '9+ more' : `${remaining} more`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  )
}

export default OverviewCard
