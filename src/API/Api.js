export const allProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getProductsByCategory = (category) => {
  return fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((res) => {
      return res
    })
};

export const addToCart = (id) => {
  return fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
      /* other product data */
    }),
  }).then((res) => res.json());
};
