import axios from 'axios';

import API from '../config';
import { parseList } from './action-utils';
import { GET_CATALOG, GET_RECOMMENDATON } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    catalog: [],
    recommendation: null,
  },
  mutations: {
    [GET_CATALOG](state, catalog) {
      state.catalog = catalog;
    },
    [GET_RECOMMENDATON](state, recommendation) {
      state.recommendation = recommendation;
    },
  },
  actions: {
    async getCatalogAction({ commit }) {
      try {
        const response = await axios.get(`${API}/catalog`);
        const catalog = parseList(response);
        commit(GET_CATALOG, catalog);
        return catalog;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async getCatalogRecommendation({ commit }) {
      try {
        const response = await axios.get(`${API}/recommendation`);
        console.log(response.data);
        commit(GET_RECOMMENDATON, response.data);
        return response.data;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    catalog: (state) => state.catalog,
    recommendation: (state) => state.recommendation,
  },
};