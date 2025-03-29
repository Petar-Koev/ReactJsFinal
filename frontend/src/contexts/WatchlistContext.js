import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [userWatchlists, setUserWatchlists] = useState([]);
  const [entries, setEntries] = useState([]);

  // Fetch user watchlists
  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/watchlists/mine")
      .then((res) => setUserWatchlists(res.data))
      .catch((err) => console.error("Watchlists fetch error", err));
  }, [isAuthenticated, user]);

  const refreshEntries = async () => {
    try {
      const res = await api.get("/watchlists/user-entries");
      setEntries(res.data);
    } catch (err) {
      console.error("Entries fetch error", err);
    }
  };

  // Fetch entries
  useEffect(() => {
    if (isAuthenticated) {
      refreshEntries();
    }
  }, [isAuthenticated, user]);

  const addEntry = async (watchlistId, movieId) => {
    const res = await api.post(`/watchlists/${watchlistId}/entries`, {
      movieId,
    });
    setEntries((prev) => [...prev, res.data]);
  };

  const removeEntry = async (entryId) => {
    await api.delete(`/watchlists/entries/${entryId}`);
    setEntries((prev) => prev.filter((e) => e._id !== entryId));
  };

  return (
    <WatchlistContext.Provider
      value={{
        userWatchlists,
        setUserWatchlists,
        entries,
        setEntries,
        addEntry,
        removeEntry,
        refreshEntries,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistContext;
