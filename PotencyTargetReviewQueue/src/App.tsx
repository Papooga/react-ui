
import './App.css'
import {Routes, Route} from "react-router-dom";
import CannabisSampleReviewerPage from "./pages/cannabis-sample-viewer/CannabisSampleReviewerPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/cannabis-sample-reviewer" element={<CannabisSampleReviewerPage />} />
        </Routes>
    </>
  )
}

export default App
