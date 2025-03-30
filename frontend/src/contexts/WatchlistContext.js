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

  // Fetch entries
  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/watchlists/user-entries")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("Entries fetch error", err));
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

  const toggleWatched = async (entryId, currentStatus) => {
    try {
      const res = await api.patch(`/watchlists/entries/${entryId}`, {
        watched: !currentStatus,
      });
      const updatedEntry = res.data;

      setEntries((prev) =>
        prev.map((e) => (e._id === entryId ? updatedEntry : e))
      );
    } catch (err) {
      console.error("Failed to toggle watched", err);
    }
  };

  const createWatchlist = async (data) => {
    const res = await api.post("/watchlists", data);
    setUserWatchlists((prev) => [...prev, res.data]);
    return res.data;
  };

  const updateWatchlist = async (id, data) => {
    const res = await api.put(`/watchlists/${id}`, data);
    setUserWatchlists((prev) => prev.map((w) => (w._id === id ? res.data : w)));
    return res.data;
  };

  const deleteWatchlist = async (id) => {
    try {
      await api.delete(`/watchlists/${id}`);
      setUserWatchlists((prev) => prev.filter((w) => w._id !== id));
      setEntries((prev) => prev.filter((e) => e.watchlistId !== id));
    } catch (err) {
      console.error("Failed to delete watchlist", err);
    }
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
        deleteWatchlist,
        createWatchlist,
        updateWatchlist,
        toggleWatched,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistContext;
