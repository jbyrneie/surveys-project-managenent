import AppStore from './appStore';
import QiStore from './qiStore';
import {RouterStore} from 'mobx-router';

const qiStore = new QiStore()
const appStore = new AppStore(QiStore)

export function createStores() {
  return {
    router: new RouterStore(),
    qiStore,
    appStore
  }
}
