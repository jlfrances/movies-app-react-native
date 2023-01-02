import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=553060d547730d2ca9504328f96b350b';

export const getPopularMovies = async () => {
  const url = `${apiUrl}/movie/popular?${apiKey}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const url = `${apiUrl}/movie/upcoming?${apiKey}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const getPopularTV = async () => {
  const url = `${apiUrl}/tv/popular?${apiKey}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const url = `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`;
  const response = await axios.get(url);
  return response.data.results;
};

export const getDocumentaries = async () => {
  const url = `${apiUrl}/discover/movie?${apiKey}&with_genres=99`;
  const response = await axios.get(url);
  return response.data.results;
};

export const getMovie = async (id) => {
  const url = `${apiUrl}/movie/${id}?${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const search = async (query, type) => {
  const url = `${apiUrl}/search/${type}?${apiKey}&query=${query}`;
  const response = await axios.get(url);
  return response.data.results;
};