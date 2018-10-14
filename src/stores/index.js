import AppStore from './appStore';
import QiStore from './qiStore';

const qiStore = new QiStore()
const appStore = new AppStore(QiStore)

export function createStores() {
  return {
    qiStore,
    appStore
  }
}
