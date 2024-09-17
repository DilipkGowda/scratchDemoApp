// src/context/useSpritesContext.ts
import { useContext } from "react";
import { SpritesContext, SpritesContextType } from "./SpritesContext";

const useSpritesContext = (): SpritesContextType => {
  const context = useContext(SpritesContext);
  if (!context) {
    throw new Error("useSpritesContext must be used within a SpritesProvider");
  }
  return context;
};

export default useSpritesContext;
