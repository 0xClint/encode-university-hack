import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";
import Levels from "@/Levels/LevelsMap";
import { useRecoilState } from "recoil";
import Sprite from "@/components/object-graphics/Sprite";
import styles from "./PopupMessage.module.css";
import LevelFailed from "../object-graphics/LevelFailed";
import {
  DEATH_TYPE_CLOCK,
  PLACEMENT_TYPE_CIABATTA,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_WATER,
} from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";
import { useKeyPress } from "@/hooks/useKeyPress";

const showDeathType = (deathType) => {
  switch (deathType) {
    case PLACEMENT_TYPE_FIRE:
      return <Sprite frameCoord={TILES.FIRE1} />;
    case PLACEMENT_TYPE_WATER:
      return <Sprite frameCoord={TILES.WATER1} />;
    case DEATH_TYPE_CLOCK:
      return <Sprite frameCoord={TILES.CLOCK} />;
    case PLACEMENT_TYPE_GROUND_ENEMY:
      return (
        <div
          style={{
            paddingBottom: 12,
          }}
        >
          <Sprite frameCoord={TILES.ENEMY_RIGHT} size={32} />
        </div>
      );
    case PLACEMENT_TYPE_ROAMING_ENEMY:
      return (
        <div
          style={{
            paddingBottom: 12,
          }}
        >
          <Sprite frameCoord={TILES.ENEMY_ROAMING} size={32} />
        </div>
      );
    case PLACEMENT_TYPE_FLYING_ENEMY:
      return (
        <div
          style={{
            paddingBottom: 12,
          }}
        >
          <Sprite frameCoord={TILES.ENEMY_FLYING_RIGHT} size={32} />
        </div>
      );
    case PLACEMENT_TYPE_CIABATTA:
      return (
        <div
          style={{
            paddingBottom: 4,
          }}
        >
          <Sprite frameCoord={TILES.CIABATTA_RIGHT} size={48} />
        </div>
      );
    default:
      return null;
  }
};

export const DeathMessage = ({ level }) => {
  const handleRestartLevel = () => {
    level.restart();
  };

  useKeyPress("Enter", () => {
    handleRestartLevel();
  });

  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <button onClick={handleRestartLevel} className={styles.quietButton}>
          <LevelFailed />
          <div className={styles.deathTypeContainer}>
            {showDeathType(level.deathOutcome)}
          </div>
        </button>
      </div>
    </div>
  );
};
