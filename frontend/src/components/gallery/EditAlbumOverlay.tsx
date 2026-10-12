import { useState } from "react";
import { ImagePlus, X, Heart, Upload, Trash2 } from "lucide-react";
import type { EditAlbumType } from "../..";
import { useAlbumContext } from "../../context/AlbumContext";
import IsLoading from "../IsLoading";

const EditAlbumOverlay = ({ selectedAlbum, onClose, onSave }: { selectedAlbum: EditAlbumType; onClose: () => void; onSave: (album: EditAlbumType) => void }) => {
  const { isLoading } = useAlbumContext();
  const [name, setName] = useState<string>(selectedAlbum.name);
  const [description, setDescription] = useState<string>(selectedAlbum.description);
  const [cover, setCover] = useState<File | string | null>((typeof selectedAlbum.cover === 'string' ? selectedAlbum.cover : null));
  const [preview, setPreview] = useState<string | null>((typeof selectedAlbum.cover === 'string' ? selectedAlbum.cover : null));
  const [removeCover, setRemoveCover] = useState(false);

  if (!selectedAlbum) return;

  const handleCoverChange = (file?: File) => {
    if (!file) return;
    setCover(file);
    setPreview(URL.createObjectURL(file));
    setRemoveCover(false);
  };

  return (
    <>
      {isLoading && <IsLoading loadingMessage="Updating album" />}
      <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/20 p-3 backdrop-blur-[1px]">
        <div className="w-full max-w-sm rounded-[26px] border border-[#E8D9A5] bg-[#FFFDF6] p-6 shadow-xl">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FAF0C9] text-[#D4A72C]">
              <ImagePlus size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-[#2B2618]">
                Edit Album
              </h2>
              <p className="text-xs text-[#8B7A45]">
                Make your memories feel just right.
              </p>
            </div>

            <button
              type="button"
              className="rounded-full border border-[#E8D9A5] p-2 text-[#8B7A45] hover:bg-[#FAF0C9]"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cover Photo */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#2B2618]">
                Cover Photo
              </label>
              <span className="text-xs text-[#B49B5B]">Optional</span>
            </div>

            <div className="rounded-2xl border border-[#E8D9A5] bg-[#FFF9E8] p-3">
              {preview && !removeCover? (
                <img
                  src={preview}
                  alt="New album cover preview"
                  className="h-36 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-[#E8D9A5] bg-[#FFFDF6]">
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF0C9] text-[#D4A72C]">
                    <ImagePlus size={22} />
                  </div>
                  <p className="text-sm font-medium text-[#2B2618]">
                    {removeCover ? "Cover will be removed" : "No cover selected"}
                  </p>
                  <p className="mt-1 text-xs text-[#B49B5B]">
                    Choose a photo for your album
                  </p>
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D4A72C] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#C39720]">
                  <Upload size={15} />
                  {(preview && !removeCover) || selectedAlbum.cover ? "Replace" : "Add Cover"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCoverChange(e.target.files?.[0])}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setCover(null);
                    setPreview(null);
                    setRemoveCover(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#E8D9A5] px-3 py-2.5 text-xs font-semibold text-[#9B5145] hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Album Name */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#2B2618]">
                Album Name
              </label>
              <span className="text-xs text-[#B49B5B]">Required</span>
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Our Little Moments"
              className="w-full rounded-xl border border-[#E8D9A5] bg-white px-4 py-3 text-sm text-[#2B2618] outline-none placeholder:text-[#B49B5B] focus:border-[#D4A72C] focus:ring-2 focus:ring-[#D4A72C]/15"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#2B2618]">
                Description
              </label>
              <span className="text-xs text-[#B49B5B]">Optional</span>
            </div>

            <textarea
              rows={3}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell a little something about this album..."
              className="w-full resize-none rounded-xl border border-[#E8D9A5] bg-white px-4 py-3 text-sm text-[#2B2618] outline-none placeholder:text-[#B49B5B] focus:border-[#D4A72C] focus:ring-2 focus:ring-[#D4A72C]/15"
            />
          </div>

          {/* Footer Message */}
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-[#FAF0C9] px-4 py-3">
            <Heart size={17} className="shrink-0 fill-[#D4A72C] text-[#D4A72C]" />
            <p className="text-xs leading-5 text-[#8B7A45]">
              Every little detail makes this album special.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-xl border border-[#E8D9A5] bg-white px-4 py-3 text-sm font-semibold text-[#8B7A45] hover:bg-[#FAF0C9]"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="flex-1 rounded-xl bg-[#D4A72C] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#C39720]"
              onClick={() => onSave({ _id: selectedAlbum._id, name, description, cover: cover! }) }
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAlbumOverlay;