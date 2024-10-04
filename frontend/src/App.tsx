import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';

function App() {

  return (
      <BrowserRouter>
          <div className='mx-auto max-w-[900px] lg:max-w-[1920px] align-middle'> 
            <div className='flex justify-center'> 
               <div className='w-full'>
                <Router/>
               </div> 
            </div>
        </div>
      </BrowserRouter> 
  
  )
}

export default App
