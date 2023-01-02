export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
  name(state) {
    return state.name;
  },
  gender(state) {
    return state.gender;
  },
  first(state) {
    return state.first;
  },
  error(state) {
    return state.error;
  },
};
