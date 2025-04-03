import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {

  return (
    <div className='min-h-screen bg-gray-300 lc-bg'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
