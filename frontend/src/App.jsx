import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Layout from './layouts/Layout'

function App() {
 

  return (
    <BrowserRouter >
    <Routes>
        <Route path='/' element={<Layout><p>Home page</p> </Layout>} />
    </Routes>
      
    </BrowserRouter >
  )
}

export default App
