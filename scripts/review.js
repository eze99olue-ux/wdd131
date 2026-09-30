const params =
  new URLSearchParams(window.location.search);


const products = [
  {
    id: "fc-1888",
    name: "flux capacitor"
  },
  {
    id: "fc-2050",
    name: "power laces"
  },
  {
    id: "fs-1987",
    name: "time circuits"
  },
  {
    id: "ac-2000",
    name: "low voltage reactor"
  },
  {
    id: "jj-1969",
    name: "warp equalizer"
  }
];


const productId =
  params.get("product");


const product =
  products.find(
    (item) => item.id === productId
  );


document.querySelector(
  "#productResult"
).textContent =
  product
    ? product.name
    : "Not provided";


const rating =
  params.get("rating");


document.querySelector(
  "#ratingResult"
).textContent =
  rating
    ? `${rating} out of 5`
    : "Not provided";


const installDate =
  params.get("installDate");


document.querySelector(
  "#dateResult"
).textContent =
  installDate || "Not provided";


const features =
  params.getAll("features");


document.querySelector(
  "#featuresResult"
).textContent =
  features.length > 0
    ? features.join(", ")
    : "None selected";


const writtenReview =
  params.get("review");


document.querySelector(
  "#reviewResult"
).textContent =
  writtenReview || "Not provided";


const username =
  params.get("username");


document.querySelector(
  "#nameResult"
).textContent =
  username || "Not provided";



/* LOCAL STORAGE */

const storageKey =
  "w05-review-count";


let reviewCount =
  Number(
    localStorage.getItem(storageKey)
  ) || 0;


/*
  Only count a review when the page
  contains submitted form data.
*/

if (
  productId &&
  rating &&
  installDate
) {

  reviewCount += 1;

  localStorage.setItem(
    storageKey,
    reviewCount
  );

}


document.querySelector(
  "#reviewCount"
).textContent =
  reviewCount;



/* FOOTER */

document.querySelector(
  "#currentYear"
).textContent =
  new Date().getFullYear();


document.querySelector(
  "#lastModified"
).textContent =
  document.lastModified;