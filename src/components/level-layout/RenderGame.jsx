import { THEME_BACKGROUNDS } from "@/helpers/consts";
import styles from "./RenderLevel.module.css";
import LevelBackgroundTilesLayer from "./LevelBackgroundTilesLayer";
import LevelPlacementsLayer from "./LevelPlacementsLayer";
import { useEffect, useState } from "react";
import { LevelState } from "@/classes/Levelstate";
import TopHud from "@/components/hud/TopHud";
import { DeathMessage } from "../hud/DeathMessage";
import LevelCompleteMessage from "../hud/LevelCompleteMessage";
import EditorDropdown from "../hud/EditorDropdown";
import { useLocation } from "react-router-dom";
import landTemplate from "../../Levels/landTemplate";


export default function RenderGame({ gameData }) {
  const [level, setLevel] = useState(null);
  const location = useLocation();
  const check = location.pathname.includes("/levels");

  useEffect(() => {
    //Create and subscribe to state change
    const levelState = new LevelState("DemoName", gameData, (newState) => {
      setLevel(newState);
    });

    //Get initial state
    setLevel(levelState.getState());

    // Route setting
    if (check) {
      levelState.getState().setEditorMode(false);
    } else {
      levelState.getState().turnOffClock();
    }
    setLevel(levelState.getState());

    //Destroy method when this component unmounts or cleanup
    return () => {
      levelState.destroy();
    };
  }, []);

  if (!level) return null;

  const cameraTranslate = `translate3d(${level.cameraTransformX}, ${level.cameraTransformY},0)`;

  return (
    <div
      className={styles.fullScreenContainer}
      style={{ background: THEME_BACKGROUNDS[level.theme] }}
    >
      <div className={styles.gameScreen}>
        <div style={{ transform: cameraTranslate }}>
          <LevelBackgroundTilesLayer level={level} />
          <LevelPlacementsLayer level={level} />
        </div>
        {level.isCompleted && <LevelCompleteMessage />}
        {level.deathOutcome && <DeathMessage level={level} />}
      </div>
      <TopHud level={level} isLevelMode={check} />
      <EditorDropdown level={level} />
    </div>
  );
}
