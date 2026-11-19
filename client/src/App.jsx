
import { lazy, Suspense } from "react";

import "./App.css";

import MobileNotice from "./MobileNotice/MobileNotice";
import useIsMobile from "./useIsMobile/useIsMobile.jsx";
import Loader01 from "./UI/Loader01/Loader01.jsx";

const DesktopApp = lazy(() => import("./DesktopApp/DesktopApp.jsx"));

function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNotice />;
  }

  return (
    <Suspense fallback={<Loader01/>}>
      <DesktopApp />
    </Suspense>
  );
}

export default App;
