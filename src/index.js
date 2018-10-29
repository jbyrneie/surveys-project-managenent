import React from 'react'
import ReactDOM from 'react-dom'
import MainRouter from './modules/MainRouter'
import { Provider } from 'mobx-react'
import { createStores } from './stores/index'
import './css/fonts.css'
import './css/qi.css'

const stores = createStores()
console.log('Stores created.....', process.env.REACT_APP_MOUNT);

stores.qiStore.getMyTasks()
.then(() => {
  ReactDOM.render(
    <Provider store={stores}>
        <div>
          <section>
            <MainRouter/>
          </section>
        </div>
    </Provider>
    ,document.getElementById('root')
  )
})
