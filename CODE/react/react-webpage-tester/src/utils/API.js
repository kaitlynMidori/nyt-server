import axios from "axios";

export default {
  // Gets random categories
  getCategories: function(offset) {
    return axios.get("https://jservice.io/api/categories?count=6&offset=" + offset)
  },
  getQuestions: function(id) {
    return axios.get("https://jservice.io/api/category?id=" + id)
  },
  getRandomQuestion: function() {
    return axios.get("https://jservice.io/api/random")
  },
  savePlayersScores: function(playerData) {
    return axios.post("/api/players-scores/", playerData)
  },
  getPlayersScores: function() {
    return axios.get("/api/players-scores/")
  }, 
  signUpUser: function(userData) {
    return axios.post("/signup", userData)
  }, 
  loginUser: function(userData) {
    return axios.post("/login", userData)
  }
};
