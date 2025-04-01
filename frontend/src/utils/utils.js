export function isDuplicateName(watchlists, name) {
  return watchlists.some(
    (w) => w.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
}
