import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    movies: null,
    genres: null,
})

export const mutations = {
    addMovies(state, movies) {
        state.movies = movies
    },
    addGenres(state, genres) {
        state.genres = genres
    },
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('getData')
    },
    async getData({ commit }) {
        const requests = [
            await this.$axios.$get('https://kinobd.ru/api/films?page=1'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=2'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=3'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=4'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=5'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=6'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=7'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=8'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=9'),
            await this.$axios.$get('https://kinobd.ru/api/films?page=10'),
        ]

        let dataMovies = []
        const dataGenres = await this.$axios.$get(
            'https://my-json-server.typicode.com/tema2387/api-for-cinema-project/genres'
        )

        for (let i = 0; i < requests.length; i++) {
            dataMovies = dataMovies.concat(requests[i].data)
        }

        commit('addGenres', dataGenres)
        commit('addMovies', dataMovies)
    },
}
