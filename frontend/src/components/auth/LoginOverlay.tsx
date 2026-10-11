import { InfinityIcon } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function LoginOverlay() {
  const { loginAccount } = useAuthContext();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/20 px-5 backdrop-blur-[2px]">
      {/* Login Card */}
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-[#D4A72C] px-6 pb-7 pt-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <InfinityIcon color="white" />
          </div>

          <h1 className="text-xl font-bold text-white">
            Welcome Back ♥
          </h1>

          <p className="mt-1 text-sm text-white/80">
            Sign in to your memories
          </p>
        </div>

        <form className="space-y-4 px-6 py-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (!username || !password) {
              toast.error("All fields are required.");
              return;
            }
            loginAccount({ username, password });
          }}
        >
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-semibold text-[#4A4025]"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              className="
                w-full rounded-xl border border-[#E8DDAF]
                bg-[#FFFDF6] px-4 py-3
                text-sm text-[#4A4025]
                outline-none
                transition
                placeholder:text-[#B9AD82]
                focus:border-[#D4A72C]
                focus:ring-2 focus:ring-[#D4A72C]/15
              "
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[#4A4025]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              className="
                w-full rounded-xl border border-[#E8DDAF]
                bg-[#FFFDF6] px-4 py-3
                text-sm text-[#4A4025]
                outline-none
                transition
                placeholder:text-[#B9AD82]
                focus:border-[#D4A72C]
                focus:ring-2 focus:ring-[#D4A72C]/15
              "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="
              mt-2 w-full rounded-xl
              bg-[#D4A72C] px-4 py-3
              text-sm font-bold text-white
              shadow-sm
              transition
              hover:bg-[#C49A25]
              active:scale-[0.98]
            "
          >
            Login
          </button>

          <p className="text-center text-xs text-[#9A8B5C]">
            Our little space, just for us ♥
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginOverlay