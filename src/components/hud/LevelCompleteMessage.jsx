import styles from "@/components/hud/PopupMessage.module.css";
import LevelCompleted from "../object-graphics/LevelCompleted";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../../contexts/gameProvider";

export default function LevelCompleteMessage() {
  const { id } = useParams();
  const { handleLevelCompleted } = useGame();

  const router = useNavigate();

  const handleGoToNextLevel = () => {
    // console.log("hello");
    localStorage.setItem("level-completed", Number(id) + 1);

    router(`/levels/${Number(id) + 1}`);
    window.location.reload();
  };

  useKeyPress("Enter", () => {
    handleGoToNextLevel();
  });
  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <div className={styles.quietButton}>
          <LevelCompleted
            nextLevel={id}
            handleGoToNextLevel={handleGoToNextLevel}
          />
        </div>
      </div>
    </div>
  );
}
