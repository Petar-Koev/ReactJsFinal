import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchlistCatalog from "./pages/WatchlistCatalog/WatchlistCatalog";
import CreateWatchlist from "./pages/CreateWatchlist/CreateWatchlist";
import EditWatchlist from "./pages/EditWatchlist/EditWatchlist";
import Watchlist from "./pages/Watchlist/Watchlist";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Movies from "./pages/Movies/Movies";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/watchlists/:id" element={<Watchlist />} />
        <Route path="/create" element={<CreateWatchlist />} />
        <Route path="/watchlists/:id/edit" element={<EditWatchlist />} />
        <Route path="/watchlists" element={<WatchlistCatalog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
    </Router>
  );
}

export default App;
