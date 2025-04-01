import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Navbar />
      <main className=''>
        <Outlet />
      </main>
    </div>
  )
}

export default App
