import "./styles.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";

import HomePage from "./pages/Home/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import FullPageSpinner from "./components/FullPageSpinner";
import WatchPage from "./pages/WatchPage";
import NotFoundPage from "./components/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import ArtistsPage from "./pages/ArtistsPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { user, isCheckingAuth } = useAuthStore();
  const authCheck = useAuthStore((state) => state.authCheck);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-in"
          element={!user ? <SigninPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:type/:id"
          element={user ? <WatchPage /> : <Navigate to={"/sign-in"} />}
        />

        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/sign-in"} />}
        />

        <Route
          path="/artist/:id"
          element={user ? <ArtistsPage /> : <Navigate to={"/sign-in"} />}
        />

        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/sign-in"} />}
        />

        <Route
          path="*"
          element={
            user ? <Navigate to="/404" replace /> : <Navigate to={"/sign-in"} />
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
