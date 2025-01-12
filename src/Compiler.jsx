import { useEffect, useState } from "react";
import { SPRITE_SHEET_SRC } from "./helpers/consts";
import RenderGame from "./components/level-layout/RenderGame";
import { useRecoilState } from "recoil";
import { spriteSheetImageAtom } from "./atoms/spriteSheetImageAtom";
import soundsManager from "./classes/Sounds";

soundsManager.init();

export default function Compiler({ gameData }) {
  const [spriteSheetImage, setSpriteSheetImage] =
    useRecoilState(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [setSpriteSheetImage]);

  if (!spriteSheetImage) return null;
  return <RenderGame gameData={gameData} />;
}
