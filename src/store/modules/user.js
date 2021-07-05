//code partially taken from https://bezkoder.com/jwt-vue-vuex-authentication/
/* eslint-disable no-unused-vars */
import UserService from "@/services/UserService.js";

export const namespaced = true;

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const state = initialState;

export const mutations = {
  SET_LOGIN_SUCCESS(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  SET_LOGIN_FAILURE(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  SET_LOGOUT(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  SET_REGISTER_SUCCESS(state) {
    state.status.loggedIn = false;
  },
  SET_REGISTER_FAILURE(state) {
    state.status.loggedIn = false;
  },
};

export const actions = {
  login({ commit }, user) {
    return UserService.login(user).then(
      (user) => {
        commit("SET_LOGIN_SUCCESS", user);
        return Promise.resolve(user);
      },
      (error) => {
        commit("SET_LOGIN_FAILURE");
        return Promise.reject(error);
      }
    );
  },
  logout({ commit }) {
    UserService.logout();
    commit("SET_LOGOUT");
  },
  register({ commit }, user) {
    return UserService.register(user).then(
      (response) => {
        commit("SET_REGISTER_SUCCESS");
        return Promise.resolve(response.data);
      },
      (error) => {
        commit("SET_REGISTER_FAILURE");
        return Promise.reject(error);
      }
    );
  },
};
