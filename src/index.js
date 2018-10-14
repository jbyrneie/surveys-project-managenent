import React from 'react'
import ReactDOM from 'react-dom'
import {MobxRouter, startRouter} from 'mobx-router'
import MainRouter from './modules/MainRouter'
import { Provider } from 'mobx-react'
import { createStores } from './stores/index'

const stores = createStores()


// eslint-disable-next-line no-undef
//ReactDOM.render(<MainRouter />, document.getElementById('app-root'));
stores.qiStore.getMyTasks()
.then(() => {
  ReactDOM.render(
    <Provider store={stores}>
        <div>
          <section style={{backgroundColor: '#F8F8F8'}}>
            <MainRouter/>
          </section>
        </div>
    </Provider>
    ,document.getElementById('root')
  )
})
