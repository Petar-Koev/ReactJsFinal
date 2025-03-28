import { useContext } from "react";
import WatchlistContext from "../contexts/WatchlistContext";

export default function useWatchlist() {
  return useContext(WatchlistContext);
}
