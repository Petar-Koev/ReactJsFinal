export function isDuplicateName(watchlists, name, currentId = null) {
  return watchlists.some((w) => {
    const isSameName =
      w.name.toLowerCase().trim() === name.toLowerCase().trim();
    const isDifferentWatchlist = w._id !== currentId;
    return isSameName && isDifferentWatchlist;
  });
}
