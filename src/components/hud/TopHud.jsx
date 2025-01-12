import React from "react";
import styles from "./TopHud.module.css";
import { ClockCount } from "./ClockCount";
import { FlourCount } from "./FlourCount";
import InventoryList from "./InventoryList";
import EditorDropdown from "./EditorDropdown";

const TopHud = ({ level }) => {
  return (
    <div className={styles.topHud}>
      <div className={styles.topHudLeft}>
        <FlourCount level={level} />
        <ClockCount level={level} />
        <InventoryList level={level} />
      </div>
      <div className={styles.topHudRight}>
        <EditorDropdown level={level} />
      </div>
    </div>
  );
};

export default TopHud;
