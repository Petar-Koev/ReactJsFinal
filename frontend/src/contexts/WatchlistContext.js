import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { toast } from "react-toastify";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [userWatchlists, setUserWatchlists] = useState([]);
  const [entries, setEntries] = useState([]);
  const [publicWatchlists, setPublicWatchlists] = useState([]);
  const [publicEntries, setPublicEntries] = useState([]);

  // Load public watchlists and their entries.
  useEffect(() => {
    const loadPublicWatchlists = async () => {
      try {
        const result = await api.get("/watchlists");
        const watchlists = result.data;
        setPublicWatchlists(watchlists);

        const entryPromises = watchlists.map((w) =>
          api.get(`/watchlists/${w._id}/entries`)
        );

        const allResponses = await Promise.all(entryPromises);
        const entries = allResponses.flatMap((res) => res.data);

        setPublicEntries(entries);
      } catch (err) {
        console.error("Failed to load public watchlists or entries", err);
      }
    };

    loadPublicWatchlists();
  }, []);

  // Fetch user watchlists.
  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/watchlists/mine")
      .then((res) => setUserWatchlists(res.data))
      .catch((err) => console.error("Watchlists fetch error", err));
  }, [isAuthenticated, user]);

  // Fetch user entries.
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
    toast.info("Movie added successfully!");
  };

  const removeEntry = async (entryId) => {
    await api.delete(`/watchlists/entries/${entryId}`);
    setEntries((prev) => prev.filter((e) => e._id !== entryId));
    toast.info("Movie removed successfully!");
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
    toast.success("Watchlist created successfully!");
    return res.data;
  };

  const updateWatchlist = async (id, data) => {
    const res = await api.put(`/watchlists/${id}`, data);
    setUserWatchlists((prev) => prev.map((w) => (w._id === id ? res.data : w)));
    toast.info("Watchlist updated!");
    return res.data;
  };

  const deleteWatchlist = async (id) => {
    try {
      await api.delete(`/watchlists/${id}`);
      setUserWatchlists((prev) => prev.filter((w) => w._id !== id));
      setEntries((prev) => prev.filter((e) => e.watchlistId !== id));
      toast.warn("Watchlist deleted.");
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
        publicEntries,
        publicWatchlists,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistContext;
