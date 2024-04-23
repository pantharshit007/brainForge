const BASE_URL = import.meta.env.VITE_BASE_URL;

//-------------------------- OTHER WAY --------------------------\\
// let BASE_URL;
// if (import.meta.env.MODE === "development") {
//     BASE_URL = "http://localhost:4000/api/v1";
// } else {
//     BASE_URL = import.meta.env.VITE_BASE_URL;
// }
//-------------------------- OTHER WAY --------------------------\\

// CATEGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + '/course/getAllCatogories'
}