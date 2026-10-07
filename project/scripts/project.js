const destinations = [
    {
        name: "Abuja",
        type: "City",
        location: "Federal Capital Territory",
        description: "Nigeria's capital is known for modern landmarks, beautiful hills, parks, and a relaxed city atmosphere.",
        image: "images/abuja.webp"
    },
    {
        name: "Lagos",
        type: "City",
        location: "Lagos State",
        description: "A lively coastal city known for entertainment, beaches, business, nightlife, and a creative atmosphere.",
        image: "images/lagos.webp"
    },
    {
        name: "Calabar",
        type: "Culture",
        location: "Cross River State",
        description: "A historic city known for cultural festivals, hospitality, greenery, and nearby natural attractions.",
        image: "images/calabar.webp"
    }
];

function getElement(selector) {
    return document.querySelector(selector);
}

function updateFooter() {
    const year = getElement("#current-year");
    const modified = getElement("#last-modified");

    if (year) {
        year.textContent = `${new Date().getFullYear()}`;
    }

    if (modified) {
        modified.textContent = `Last modified: ${document.lastModified}`;
    }
}

function setupMenu() {
    const menuButton = getElement(".menu-button");
    const navigation = getElement(".site-nav");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", `${isOpen}`);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

function getFavorites() {
    return JSON.parse(
        localStorage.getItem("discoverNigeriaFavorites")
    ) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem(
        "discoverNigeriaFavorites",
        JSON.stringify(favorites)
    );
}

function renderDestinationCards(list, target, showFavorites = true) {
    if (!target) {
        return;
    }

    const favorites = getFavorites();

    target.innerHTML = list.map((place) => {
        const isFavorite = favorites.includes(place.name);

        const button = showFavorites
            ? `
                <button
                    class="favorite-button ${isFavorite ? "active-favorite" : ""}"
                    data-name="${place.name}"
                    type="button"
                >
                    ${isFavorite ? "Saved ✓" : "Save Place"}
                </button>
            `
            : "";

        return `
            <article class="destination-card">
                <div class="destination-image">
                    <img
                        src="${place.image}"
                        alt="${place.name} destination"
                        width="800"
                        height="600"
                        loading="lazy"
                    >
                    <span class="destination-type">${place.type}</span>
                </div>

                <div class="destination-content">
                    <p class="destination-location">${place.location}</p>
                    <h3>${place.name}</h3>
                    <p>${place.description}</p>
                    ${button}
                </div>
            </article>
        `;
    }).join("");

    if (showFavorites) {
        target
            .querySelectorAll(".favorite-button")
            .forEach((button) => {
                button.addEventListener("click", () => {
                    toggleFavorite(button.dataset.name);
                });
            });
    }
}

function toggleFavorite(name) {
    const favorites = getFavorites();
    const alreadySaved = favorites.includes(name);

    const updatedFavorites = alreadySaved
        ? favorites.filter((item) => item !== name)
        : [...favorites, name];

    saveFavorites(updatedFavorites);

    const list = getElement("#destination-list");

    if (list) {
        const activeFilter = document.querySelector(".active-filter");
        const filter = activeFilter?.dataset.filter || "All";

        const filtered = filter === "All"
            ? destinations
            : destinations.filter((place) => place.type === filter);

        renderDestinationCards(filtered, list);
    }

    const message = getElement("#favorite-message");

    if (message) {
        message.textContent = alreadySaved
            ? `${name} was removed from your saved places.`
            : `${name} was saved to your browser.`;
    }
}

function setupDestinationPage() {
    const destinationList = getElement("#destination-list");
    const featuredList = getElement("#featured-destinations");

    if (featuredList) {
        renderFeaturedDestinations(destinations, featuredList);
    }

    if (!destinationList) {
        return;
    }

    renderDestinationCards(destinations, destinationList);

    document
        .querySelectorAll(".filter-button")
        .forEach((button) => {
            button.addEventListener("click", () => {
                document
                    .querySelectorAll(".filter-button")
                    .forEach((item) => {
                        item.classList.remove("active-filter");
                    });

                button.classList.add("active-filter");

                const filter = button.dataset.filter;

                const filtered = filter === "All"
                    ? destinations
                    : destinations.filter(
                        (place) => place.type === filter
                    );

                renderDestinationCards(filtered, destinationList);
            });
        });
}

function renderFeaturedDestinations(list, target) {
    target.innerHTML = list.map((place, index) => `
        <article class="featured-destination ${index === 0 ? "featured-large" : ""}">
            <img
                src="${place.image}"
                alt="${place.name} destination"
                width="800"
                height="600"
                loading="lazy"
            >

            <div class="featured-overlay">
                <span>${place.type}</span>
                <h3>${place.name}</h3>
                <p>${place.location}</p>
            </div>
        </article>
    `).join("");
}

function saveTravelPlan(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const plan = {
        name: formData.get("name"),
        email: formData.get("email"),
        destination: formData.get("destination"),
        interest: formData.get("interest"),
        message: formData.get("message")
    };

    localStorage.setItem(
        "discoverNigeriaTravelPlan",
        JSON.stringify(plan)
    );

    const message = getElement("#form-message");

    if (message) {
        message.textContent = `Thanks, ${plan.name}! Your ${plan.interest.toLowerCase()} plan for ${plan.destination} has been saved.`;
    }

    displaySavedPlan();
    form.reset();
}

function displaySavedPlan() {
    const output = getElement("#saved-plan-content");

    if (!output) {
        return;
    }

    const savedPlan = JSON.parse(
        localStorage.getItem("discoverNigeriaTravelPlan")
    );

    if (!savedPlan) {
        output.innerHTML = `<p>No travel plan has been saved yet.</p>`;
        return;
    }

    output.innerHTML = `
        <div class="saved-plan-item">
            <strong>Name</strong>
            <span>${savedPlan.name}</span>
        </div>

        <div class="saved-plan-item">
            <strong>Destination</strong>
            <span>${savedPlan.destination}</span>
        </div>

        <div class="saved-plan-item">
            <strong>Interest</strong>
            <span>${savedPlan.interest}</span>
        </div>

        <div class="saved-plan-item">
            <strong>Travel Idea</strong>
            <span>${savedPlan.message || "No extra details were added."}</span>
        </div>
    `;
}

function setupTravelForm() {
    const form = getElement("#travel-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", saveTravelPlan);
    displaySavedPlan();
}

document.addEventListener("DOMContentLoaded", () => {
    updateFooter();
    setupMenu();
    setupDestinationPage();
    setupTravelForm();
});