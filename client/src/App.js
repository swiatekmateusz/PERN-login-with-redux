import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Site from './components/Site'
import './sass/main.scss'

import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Site />
      </BrowserRouter>
    </Provider>
  )
}

export default App;