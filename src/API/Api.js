export const ApiPage = () => {
    return fetch('https://dummyjson.com/products').then(res => res.json())   
}