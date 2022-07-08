export const state = () => ({
  weather: [],
  weatherAreLoaded: false,
});

export const mutations = {
  ADD_WEATHER(state, payload) {
    state.weather = payload;
    state.weatherAreLoaded = true;
  },
};

export const actions = {
  fetchWeather({ commit }, page) {
    let offset;
    if (page === 1) {
      offset = 0;
    } else offset = (page - 1) * 6 - 1;
    fetch(`https://graboviy.pythonanywhere.com/api-auth/records/?limit=100`)
      .then(function (response) {
        return response.json();
      })
      .then((weather) => commit("ADD_WEATHER", weather))
      .catch((error) => {
        console.log(error);
      });
  },
  updateWeather({ commit }) {
    fetch("https://graboviy.pythonanywhere.com/api-auth/records/", {})
      .then((response) => response.json())
      .then((weather) => commit("ADD_WEATHER", weather))
      .catch((error) => {
        console.log(error);
      });
  },

  sortWeather({ commit }, sort) {
    let sortedItems = this.weather.results;
    if (sort === "Сортировка по чему-то") {
      sortedItems = sortedItems.sort((a, b) => {
        if (a > b) {
          return 1;
        } else return -1;
      });
    }

    commit("ADD_WEATHER", sortedItems);
  },
};

export const getters = {
  weather(state) {
    return state.weather;
  },
};
