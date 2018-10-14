import React from 'react'
import ReactDOM from 'react-dom'
import {MobxRouter, startRouter} from 'mobx-router'
import MainRouter from './modules/MainRouter'
import { Provider } from 'mobx-react'
import views from './views'
import { createStores } from './stores/index'

const stores = createStores()


// eslint-disable-next-line no-undef
//ReactDOM.render(<MainRouter />, document.getElementById('app-root'));
stores.qiStore.getMyTasks()
.then(() => {
  let pathname = window.location.pathname.replace(/\/qi-project-management/g,'')
  const initialRoute = `${process.env.REACT_APP_QI_MOUNT}${pathname}${window.location.search}`

  startRouter(views, stores, initialRoute, {
    strict: false,
    notfound: () => {
      window.location = `${process.env.REACT_APP_QI_MOUNT}/${window.location.search}`
    }
  })
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
