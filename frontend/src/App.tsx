import AppLayout from "./components/AppLayout"
import Gallery from "./pages/Gallery"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Notes from "./pages/Notes"
// import Music from "./pages/Music"
import Media from "./pages/Media"
import SpotifyCallback from "./components/music/SpotifyCallback"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<Media />} />
          {/* <Route path="/music" element={<Music />} /> */}
          <Route path="/notes" element={<Notes />} />
          <Route path="/auth-token" element={<SpotifyCallback />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
