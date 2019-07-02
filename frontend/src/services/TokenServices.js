const TokenServices = {
  getTokenByKey(key) {
    return window.localStorage.getItem(key);
  },
  setToken(key, data) {
    window.localStorage.setItem(key, data);
  },
  updateToken(key, data) {
    window.localStorage.setItem(key, data);
  },
  removeTokenByKey(key) {
    window.localStorage.removeItem(key);
  }
}

export default TokenServices;