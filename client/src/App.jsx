
import { lazy, Suspense } from "react";

import "./App.css";

import MobileNotice from "./MobileNotice/MobileNotice";
import useIsMobile from "./useIsMobile/useIsMobile.jsx";

const DesktopApp = lazy(() => import("./DesktopApp/DesktopApp.jsx"));

function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNotice />;
  }

  return (
    <Suspense fallback={null}>
      <DesktopApp />
    </Suspense>
  );
}

export default App;
