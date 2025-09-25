import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoadingOverlay from "./components/LoadingOverlay"
import MainComponentLayout from "./layouts/MainComponentLayout"
import ChatPage from "./pages/ChatPage"


function App() {

  return (
    <BrowserRouter>
      {/* Layout envuelve todas las rutas */}
      <Routes>
        <Route element={<MainComponentLayout />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
      </Routes>
      <LoadingOverlay />
    </BrowserRouter>
  )
}

export default App
