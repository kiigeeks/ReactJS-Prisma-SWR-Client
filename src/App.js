import MainLayouts from './layouts/main.layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Category from './components/Category';
import Pets from './components/Pets';

function App() {
  return (
    <>
      <Router>
        <MainLayouts>
          <Routes>
            <Route path='/' exact element={<Pets />} />
            <Route path='/category' element={<Category />} />
            <Route path='*' element={<h1>Not Found 404</h1>} />
          </Routes>
        </MainLayouts>
      </Router>
    </>
  )
}

export default App;
