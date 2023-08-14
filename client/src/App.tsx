import { Route } from "wouter"
import "./App.css"
import HomePage from "./pages/home.page"

function App() {
  return <Route path="/" component={HomePage} />
}

export default App
