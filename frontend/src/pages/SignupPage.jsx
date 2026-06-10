import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "../store/authUser";

import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

function SignupPage() {
  const { state: emailStarted } = useLocation();
  const { signup, isSigningUp } = useAuthStore();

  const [email, setEmail] = useState(emailStarted || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const credentials = {
      email,
      username,
      password,
    };

    signup(credentials);
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
            Create an account
          </h1>

          <form className="space-y-4" onSubmit={handleSignup}>
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
                autoFocus={!emailStarted}
              />
            </div>

            {/*Username*/}
            <div>
              <Label htmlFor="username" from="signup">
                Username
              </Label>
              <Input
                type="text"
                placeholder="johndoe"
                from="signup"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus={emailStarted}
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
              {!isSigningUp ? "Sign up" : "Creating account..."}
            </Button>
          </form>

          <div className="text-center text-gray-400">
            Already a have an account? {""}
            <Link to={"/sign-in"} className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
