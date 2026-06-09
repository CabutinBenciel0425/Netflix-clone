import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ChevronRight } from "lucide-react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import FeatureSection from "../../components/FeatureSection";
import TVShowcase from "../../components/showcases/TVShowcase";
import DownloadShowcase from "../../components/showcases/DownloadShowcase";
import DeviceShowcase from "../../components/showcases/DeviceShowcase";
import KidsShowcase from "../../components/showcases/KidsShowcase";

function AuthScreen() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/sign-up", { state: email });
  };
  return (
    <div className="hero-bg relative">
      {/* NavBar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="Netflix logo"
          className="w-32 md:w-52 cursor-pointer"
        />
        <Link
          to={"/sign-in"}
          className="text-white bg-red-600 py-1 px-2 rounded"
        >
          Sign In
        </Link>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="mb-4 px-2">
          Ready to watch? Enter your email to create or restart your membership
        </p>

        <form
          className="flex flex-col md:flex-row gap-1 w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Email address"
              from="hero"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button from="hero" type="submit">
            Get Started
            <ChevronRight className="size-5 md:size-6 mt-0.5" />
          </Button>
        </form>
      </div>

      <Separator />

      <FeatureSection
        title="Enjoy on your TV"
        description="Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
      >
        <TVShowcase />
      </FeatureSection>

      <Separator />

      <FeatureSection
        reverse
        title="Download your shows to watch offline"
        description="Save your favorites easily and always have something to watch."
      >
        <DownloadShowcase />
      </FeatureSection>

      <Separator />

      <FeatureSection
        title="Watch everywhere"
        description="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
      >
        <DeviceShowcase />
      </FeatureSection>

      <Separator />

      <FeatureSection
        title="Create profiles for kids"
        description="Send kids on adventures with their favorite characters in a space made just for them - free with your membership."
      >
        <KidsShowcase />
      </FeatureSection>
    </div>
  );
}

export default AuthScreen;
