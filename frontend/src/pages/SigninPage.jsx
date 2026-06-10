import { Link } from "react-router-dom";
import { useState } from "react";

import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { useAuthStore } from "../store/authUser";

function SigninPage() {
  const { signin, isSigningIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    signin(credentials);
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign in to your account
          </h1>

          <form className="space-y-4" onSubmit={handleSignin}>
            {/*Email*/}
            <div>
              <Label htmlFor="email" from="signup">
                Email
              </Label>
              <Input
                type="email"
                placeholder="johndoe@example.com"
                from="signup"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/*Password*/}
            <div>
              <Label htmlFor="password" from="signup">
                Password
              </Label>
              <Input
                type="password"
                placeholder="******"
                from="signup"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button from="signup" type="submit">
              {!isSigningIn ? "Sign in" : "Loading..."}
            </Button>
          </form>

          <div className="text-center text-gray-400">
            Don't have an account yet? {""}
            <Link to={"/sign-up"} className="text-red-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
