import SortOptions from "../enums/sortOptions";

export function sortMovies(movies, option, likedMovieIds = []) {
  return [...movies].sort((a, b) => {
    switch (option) {
      case SortOptions.TITLE:
        return a.name.localeCompare(b.name);
      case SortOptions.YEAR:
        return b.year - a.year;
      case SortOptions.FAVORITES:
        const aLiked = likedMovieIds.includes(a._id);
        const bLiked = likedMovieIds.includes(b._id);
        return aLiked === bLiked ? 0 : aLiked ? -1 : 1;
      default:
        return 0;
    }
  });
}

export function isInWatchlist(watchlistId, entries, movie) {
  return entries?.some((entry) => {
    const entryMovieId =
      typeof entry.movieId === "string" ? entry.movieId : entry.movieId?._id;

    return entry.watchlistId === watchlistId && entryMovieId === movie._id;
  });
}
