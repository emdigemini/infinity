import { X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMusicContext } from "../../context/MusicContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDendenAccount: () => void;
  onLoginAccount: () => Promise<void>;
}

const SpotifyAccountModal = ({
  isOpen,
  onClose,
  onDendenAccount,
  onLoginAccount,
}: Props ) => {
  const { spotifyAccount } = useMusicContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-999
            flex items-center justify-center
            bg-black/40 px-4
            backdrop-blur-sm
          "
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative w-full max-w-sm
              rounded-3xl bg-white
              p-6 shadow-2xl
            "
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="
                absolute right-4 top-4
                flex h-8 w-8 items-center justify-center
                rounded-full
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-700
              "
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl text-white
                "
              >
                <img src="/spotify.png" alt="" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-[#171717]">
                Choose Spotify Account
              </h2>

              <p className="mt-1 max-w-67.5 text-sm leading-5 text-[#8B7A45]">
                Choose which Spotify account you want to use with Infinity.
              </p>
            </div>

            {/* Accounts */}
            <div className="mt-6 space-y-3">
              {/* Denden */}
              {spotifyAccount
                ? (
                  <button
                    onClick={onDendenAccount}
                    className="
                      group flex w-full items-center gap-3
                      rounded-2xl border border-[#E9DFC2]
                      bg-[#FFFDF6]
                      p-3
                      text-left
                      transition
                      hover:border-[#D4A72C]
                      hover:bg-[#FFF9E8]
                      active:scale-[0.98]
                    "
                  >
                    <div
                      className="
                        flex h-11 w-11 shrink-0 items-center
                        justify-center rounded-xl text-white overflow-hidden
                      "
                    >
                      <img src={spotifyAccount.imageUrl} alt="" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#171717]">
                        Continue with <b>{spotifyAccount.name}</b>'s account
                      </p>

                      <p className="mt-0.5 text-xs text-[#8B7A45]">
                        Use the connected Spotify account
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="
                        shrink-0 text-[#D4A72C]
                        transition-transform
                        group-hover:translate-x-0.5
                      "
                    />
                  </button>
                ) : (
                  <button
                    onClick={onLoginAccount}
                    className="
                      group flex w-full items-center gap-3
                      rounded-2xl border border-[#E9DFC2]
                      bg-white
                      p-3
                      text-left
                      transition
                      hover:border-[#D4A72C]
                      hover:bg-[#FFF9E8]
                      active:scale-[0.98]
                    "
                  >
                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl
                      "
                    >
                      <img src="/spotify.png" alt="" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#171717]">
                        Login with my account
                      </p>

                      <p className="mt-0.5 text-xs text-[#8B7A45]">
                        Connect a different Spotify account
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="
                        shrink-0 text-[#D4A72C]
                        transition-transform
                        group-hover:translate-x-0.5
                      "
                    />
                  </button>
                )}
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpotifyAccountModal;