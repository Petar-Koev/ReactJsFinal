import SortOptions from "../enums/sortOptions";

export function sortMovies(movies, option) {
  return [...movies].sort((a, b) => {
    switch (option) {
      case SortOptions.TITLE:
        return a.name.localeCompare(b.name);
      case SortOptions.YEAR:
        return b.year - a.year;
      case SortOptions.GENRE:
        return a.genre.localeCompare(b.genre);
      default:
        return 0;
    }
  });
}

export function isInWatchlist(watchlistId, entries, movie) {
  return entries?.some(
    (entry) => entry.watchlistId === watchlistId && entry.movieId === movie._id
  );
}
