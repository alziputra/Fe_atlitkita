import { useContext } from "react";
import ScoreContext from "../context/ScoreContext";

export const useScore = () => {
  return useContext(ScoreContext);
};
