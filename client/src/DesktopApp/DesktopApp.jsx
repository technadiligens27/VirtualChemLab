
import { useContext } from "react";
import { useProgress } from "@react-three/drei";
import UI from "../UI/UI.jsx"

import { InteractionContext } from "../Contexts/InteractionContext/InteractionContext";
import FillBeakerBox from "../Experience/Interactions/FillBeakerBox/FillBeakerBox";
import PowderBox from "../UI/PowderBox/PowderBox";
import MainExperience from "../Experience/MainExperience/MainExperience";
import Loader01 from "../UI/Loader01/Loader01";

function DesktopApp() {
  const {
    isFillBeakerBoxOpen,
    showPowderBox,
  } = useContext(InteractionContext);

  const { active, progress } = useProgress();

  const isLoading = active || progress < 100;

  return (
    <>
      {isLoading && <Loader01 />}

      <div className={ isLoading ? "experience-loading" : "experience-loaded"}>
        <MainExperience />
      </div>

      {!isLoading && (
        <>
          <UI/>

          {isFillBeakerBoxOpen && (
            <FillBeakerBox />
          )}

          {showPowderBox && (
            <PowderBox />
          )}
        </>
      )}
    </>
  );
}

export default DesktopApp;
