import React, { useState } from "react";
import { Handshake, ShipWheelIcon } from "lucide-react";
import {Link} from "react-router"
import useSignUp from './../hooks/useSignUp.js';
import { useTheme } from "../store/useTheme.js";


function SignUpPage() {
  const { theme } = useTheme();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const {signUpMutation, isPending, error} = useSignUp();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation(signUpData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme={theme}
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* signup form - left side */}

        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <Handshake className={"size-9 text-primary"} />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              chatR
            </span>
          </div>

          {/* error */}
          {error && (
          <div className="alert alert-error mb-4">
            <span>{error.response.data.message}</span>
          </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Create a account</h2>
                <p>Join chatR and start your language learning adventure</p>
              </div>

              <div className="space-y-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    value={signUpData.fullName || ""}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="input input-bordered w-full"
                    value={signUpData.email || ""}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    className="input input-bordered w-full"
                    value={signUpData.password || ""}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    required
                  />
                  <p className="text-xs opacity-70 mt-1">Password must be at least 6 characters long</p>
                </div>
              </div>
              <button className="btn btn-primary mt-4 w-full " type="submit">
                {isPending ? <>
                  <span className="loading loading-spinner loading-xs" />
                  Signing up...
                </> : "Create Account"}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                  SignIn
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Signup form - right side  */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* illustration  */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/signupIMG.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partner worlwide
              </h2>
              <p className="opacity-70">
                    Practice conversation, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
