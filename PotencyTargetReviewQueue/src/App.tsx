import './App.css'
import {Routes, Route} from "react-router-dom";
import PotencyTargetReviewQueue from "./pages/cannabis-sample-viewer/PotencyTargetReviewQueue.tsx";
import Clients from "./pages/clients/Clients.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<PotencyTargetReviewQueue />} />
            <Route path="/cannabis-sample-reviewer" element={<PotencyTargetReviewQueue />} />
            <Route path="/clients" element={<Clients />} />
        </Routes>
    </>
  )
}

export default App
