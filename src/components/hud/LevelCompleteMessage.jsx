import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";
import Levels from "@/Levels/LevelsMap";
import { useRecoilState } from "recoil";
import styles from "@/components/hud/PopupMessage.module.css";
import LevelCompleted from "../object-graphics/LevelCompleted";
import { useKeyPress } from "@/hooks/useKeyPress";

export default function LevelCompleteMessage() {
  const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);

  const handleGoToNextLevel = () => {
    const levelsArray = Object.keys(Levels);
    const currentIndex = levelsArray.findIndex((id) => {
      return id === currentId;
    });
    const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
    setCurrentId(nextLevelId);
  };

  useKeyPress("Enter", () => {
    handleGoToNextLevel();
  });
  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <button className={styles.quietButton} onClick={handleGoToNextLevel}>
          <LevelCompleted />
        </button>
      </div>
    </div>
  );
}
