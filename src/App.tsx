import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './public/router/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App