import { Route, Switch } from "wouter"
import "./App.css"
import HomePage from "./pages/home.page"
import VideoPage from "./pages/video.page"

function App() {
  return (
    <Switch>
      <Route path="/video/:id" component={VideoPage} />
      <Route path="/" component={HomePage} />
      <Route component={HomePage} />
    </Switch>
  )
}

export default App
