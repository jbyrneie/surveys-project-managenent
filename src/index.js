import React from 'react'
import ReactDOM from 'react-dom'
import MainRouter from './modules/MainRouter'
import { Provider } from 'mobx-react'
import { createStores } from './stores/index'
import './css/fonts.css'
import './css/qi.css'

const stores = createStores()
console.log('Stores created.....');

// eslint-disable-next-line no-undef
//ReactDOM.render(<MainRouter />, document.getElementById('app-root'));
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
