import { login as loginApi, getInfo } from '../../api/user';
import { getToken, setToken, removeToken } from '../../utils/auth';
import {
  RESET_STATE, SET_TOKEN, SET_NAME, SET_AVATAR,
} from '../mutation-types';

const getDefaultState = () => ({
  token: getToken(),
  name: '',
  avatar: '',
});

const mutations = {
  [RESET_STATE]: (state) => {
    Object.assign(state, getDefaultState());
  },
  [SET_TOKEN]: (state, token) => {
    state.token = token;
  },
  [SET_NAME]: (state, name) => {
    state.name = name;
  },
  [SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      loginApi({ username: username.trim(), password }).then((resp) => {
        const { data } = resp;
        commit(SET_TOKEN, data);
        setToken(data);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((resp) => {
        const { data } = resp;

        if (!data) {
          reject(new Error('Verification failed, please Login again.'));
        }

        const { nickname, avatar } = data;

        commit(SET_NAME, nickname);
        commit(SET_AVATAR, avatar);
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit(RESET_STATE);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
};
