import {
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_WATER,
} from "@/helpers/consts";
import React from "react";

const EditorDropdown = ({ level }) => {
  if (!level.enableEditing) {
    return null;
  }

  return (
    <div className="flex gap-1">
      <select
        value={level.editModePlacementType}
        onChange={(event) => {
          level.setEditModePlacementType(event.target.value);
        }}
        className="bg-transparent text-white border-2 border-white rounded-md py-2 px-4"
      >
        <option value={PLACEMENT_TYPE_WALL} className="text-black">
          Wall
        </option>
        <option value={PLACEMENT_TYPE_FIRE} className="text-black">
          Fire
        </option>
        <option value={PLACEMENT_TYPE_WATER} className="text-black">
          Water
        </option>
        <option value={PLACEMENT_TYPE_SWITCH} className="text-black">
          Purple Switch
        </option>
        <option value={PLACEMENT_TYPE_SWITCH_DOOR} className="text-black">
          Door
        </option>
      </select>
      <button
        className="bg-transparent text-white border-2 border-white rounded-md py-2 px-4"
        onClick={() => {
          level.copyPlacementsToClipboard();
        }}
      >
        Export
      </button>
    </div>
  );
};

export default EditorDropdown;
