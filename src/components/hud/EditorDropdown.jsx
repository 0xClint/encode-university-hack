import {
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_WATER,
} from "@/helpers/consts";
import React, { useState } from "react";
import { editorData } from "../../helpers/editorData";
import MemoizedEditorSprite from "../object-graphics/EditorSprite";
import { useGame } from "../../contexts/gameProvider";

const EditorDropdown = ({ level }) => {
  const [activeSprite, setActiveSprite] = useState(null);
  const [activeTrait, setActiveTrait] = useState(null);
  const { levelCompleted } = useGame();

  const handleOnSelect = (value, trait) => {
    setActiveSprite(value);
    setActiveTrait(trait);
    level.setEditModePlacementType(value, trait);
  };

  if (!level.editorMode) {
    return null;
  }

  return (
    <div className="absolute card-container right-2 flex flex-col gap-1 p-2 pb-3">
      <span className=" text-[#694933] text-[15px] text-center">Editor</span>
      <div className=" flex justify-center w-[80px]  max-h-[400px] flex-wrap gap-1.5">
        {editorData.map(({ id, trait, frameCoord, levelCap, value }) => {
          const isOpen = levelCap <= levelCompleted;
          if (levelCap <= levelCompleted + 3)
            return (
              <div
                key={id}
                onClick={() => {
                  if (isOpen) handleOnSelect(value, trait);
                }}
                className={`p-[4px] border border-black rounded-sm  ${
                  !isOpen && "opacity-30"
                }  ${
                  activeSprite == value &&
                  (trait == null ? true : trait == activeTrait)
                    ? " border-red-950 border-2"
                    : "border-black"
                }`}
              >
                {/* {!isOpen && (
                  <span className="absolute h-3 w-3 text-[9px] text-black">LockIcon</span>
                )} */}
                <MemoizedEditorSprite frameCoord={frameCoord} className="" />
              </div>
            );
        })}
        {/* <button
        onClick={() => {
          level.copyPlacementsToClipboard();
        }}
      >
        Copy
      </button> */}
      </div>
    </div>
  );
};

export default EditorDropdown;
