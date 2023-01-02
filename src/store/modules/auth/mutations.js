export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.name = payload.name;
    state.gender = payload.gender;
    state.first = payload.first;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setError(state, error) {
    state.error = error;
  },
};
