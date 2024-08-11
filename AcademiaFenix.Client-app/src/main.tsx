import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css'; //import calendar before style
import './app/layout/styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';

import { StoreContext, store } from './app/stores/store.ts'

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />

    </StoreContext.Provider>

  
)