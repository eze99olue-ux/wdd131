const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },

    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },

    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },

    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },

    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },

    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },

    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Added temple 1
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/64de5983126b11eca393eeeeac1e50dfc2db6c7e/full/800%2C/0/default"
    },

    // Added temple 2
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/882909eb6a835276e4dd9519b93cad9da6e223a3/full/800%2C/0/default"
    },

    // Added temple 3
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/a910f8aadaf86c6609bca56d4440029ca0085f73/full/800%2C/0/default"
    }
];

const templeGrid = document.querySelector("#temple-grid");

function displayTemples(templeList) {
    templeGrid.innerHTML = "";

    templeList.forEach((temple) => {

        const card = document.createElement("figure");

        const image = document.createElement("img");

        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.width = 400;
        image.height = 250;
        image.loading = "lazy";

        const caption = document.createElement("figcaption");

        const name = document.createElement("h2");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.textContent = `Location: ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.textContent = `Dedicated: ${temple.dedicated}`;

        const area = document.createElement("p");
        area.textContent =
            `Area: ${temple.area.toLocaleString()} sq ft`;

        caption.appendChild(name);
        caption.appendChild(location);
        caption.appendChild(dedicated);
        caption.appendChild(area);

        card.appendChild(image);
        card.appendChild(caption);

        templeGrid.appendChild(card);
    });
}


// HOME FILTER
document.querySelector("#home").addEventListener("click", (event) => {

    event.preventDefault();

    displayTemples(temples);
});


// OLD FILTER
document.querySelector("#old").addEventListener("click", (event) => {

    event.preventDefault();

    const oldTemples = temples.filter((temple) => {

        const year = Number(temple.dedicated.split(",")[0]);

        return year < 1900;
    });

    displayTemples(oldTemples);
});


// NEW FILTER
document.querySelector("#new").addEventListener("click", (event) => {

    event.preventDefault();

    const newTemples = temples.filter((temple) => {

        const year = Number(temple.dedicated.split(",")[0]);

        return year > 2000;
    });

    displayTemples(newTemples);
});


// LARGE FILTER
document.querySelector("#large").addEventListener("click", (event) => {

    event.preventDefault();

    const largeTemples = temples.filter((temple) => {

        return temple.area > 90000;
    });

    displayTemples(largeTemples);
});


// SMALL FILTER
document.querySelector("#small").addEventListener("click", (event) => {

    event.preventDefault();

    const smallTemples = temples.filter((temple) => {

        return temple.area < 10000;
    });

    displayTemples(smallTemples);
});


// MOBILE MENU
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// FOOTER YEAR
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


// LAST MODIFIED
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// DISPLAY ALL TEMPLES WHEN PAGE LOADS
displayTemples(temples);