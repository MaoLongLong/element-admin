import { getInfo, login } from '../../api/user';
import { getToken, removeToken, setToken } from '../../utils/auth';
import {
  RESET_STATE, SET_AVATAR, SET_NAME, SET_TOKEN, SET_UID,
} from '../mutation-types';

const getDefaultState = () => ({
  token: getToken(),
  uid: -1,
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
  [SET_UID]: (state, uid) => {
    state.uid = uid;
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password,
      })
        .then((resp) => {
          const { data } = resp;
          commit(SET_TOKEN, data);
          setToken(data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((resp) => {
          const { data, code } = resp;

          if (!data || code === 401) {
            reject(new Error('Verification failed, please Login again.'));
          }

          const { uid, nickname, avatar } = data;

          commit(SET_UID, uid);
          commit(SET_NAME, nickname);
          commit(SET_AVATAR, avatar);
          resolve(data);
        })
        .catch((error) => {
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
