import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll everything that could possibly be the container
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    // If your root div is the scroll container
    document.getElementById("root")?.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
