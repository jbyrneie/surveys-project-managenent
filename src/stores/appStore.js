import {extendObservable, action} from 'mobx';

class AppStore {
  constructor() {
    extendObservable(this, {
      deferredPrompt:null
    });
  }

  setDeferredPrompt = action( (deferredPrompt) => {
    this.deferredPrompt = deferredPrompt
  })

  setTitle = action(title => {
    this.title = title;
  });
}

export default AppStore;
