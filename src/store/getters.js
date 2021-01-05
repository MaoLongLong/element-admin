const getters = {
  token: (state) => state.user.token,
  uid: (state) => state.user.uid,
  name: (state) => state.user.name,
  avatar: (state) => state.user.avatar,
};

export default getters;
