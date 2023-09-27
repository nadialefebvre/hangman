const BASE_URL = "http://localhost:8080/randomword"

export const API_URL = (category: string, language: string) =>
  `${BASE_URL}?category=${category}&language=${language}`
