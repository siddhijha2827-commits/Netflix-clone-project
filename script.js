
// ------------------------------------
// Netflix-Inspired Website
// ------------------------------------

const SAMPLE_VIDEO =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const movies = [
    {
        id: 1,
        title: "Stranger Things",
        year: 2022,
        type: "Series",
        rating: "Sci-Fi",
        category: "trending",
        description:
            "A group of friends encounter mysterious events and supernatural secrets in their small town.",
        poster:
            "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        videoId: "b9EkMc79ZSU"
    },
    {
        id: 2,
        title: "Wednesday",
        year: 2022,
        type: "Series",
        rating: "Mystery",
        category: "trending",
        description:
            "Wednesday Addams investigates mysterious events at Nevermore Academy.",
        poster:
            "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        videoId: "Di310WS8zLk"
    },
    {
        id: 3,
        title: "Inception",
        year: 2010,
        type: "Movie",
        rating: "Sci-Fi",
        category: "movies",
        description:
            "A skilled thief enters people's dreams to steal secrets and faces an extraordinary mission.",
        poster:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        videoId: "YoHD9XEInc0"
    },
    {
        id: 4,
        title: "Interstellar",
        year: 2014,
        type: "Movie",
        rating: "Adventure",
        category: "movies",
        description:
            "Explorers travel beyond Earth in search of a future for humanity.",
        poster:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        videoId: "zSWdZVtXT7E"
    },
    {
        id: 5,
        title: "The Witcher",
        year: 2019,
        type: "Series",
        rating: "Fantasy",
        category: "series",
        description:
            "A monster hunter navigates a world filled with magic, danger, and destiny.",
        poster:
            "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
        videoId: "ndl1W4ltcmg"
    },
    {
        id: 6,
        title: "Avatar",
        year: 2009,
        type: "Movie",
        rating: "Fantasy",
        category: "movies",
        description:
            "A former Marine discovers the extraordinary world of Pandora and its people.",
        poster:
            "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        videoId: "5PSNL1qE6VY"
    },
    {
        id: 7,
        title: "Enola Holmes",
        year: 2020,
        type: "Movie",
        rating: "Mystery",
        category: "movies",
        description:
            "A clever young detective sets out to solve a mystery and find her missing mother.",
        poster:
            "https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg"
    },
    {
        id: 8,
        title: "The Adam Project",
        year: 2022,
        type: "Movie",
        rating: "Adventure",
        category: "trending",
        description:
            "A time-travelling pilot meets his younger self and embarks on an unexpected adventure.",
        poster:
            "https://image.tmdb.org/t/p/w500/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg"
    },
    {
        id: 9,
        title: "Money Heist",
        year: 2021,
        type: "Series",
        rating: "Thriller",
        category: "series",
        description:
            "A mysterious mastermind leads a group through an elaborate heist.",
        poster:
            "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"
    },
    {
        id: 10,
        title: "Dark",
        year: 2020,
        type: "Series",
        rating: "Mystery",
        category: "series",
        description:
            "A disappearance uncovers secrets connecting several families across time.",
        poster:
            "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg"
    },
    {
        id: 11,
        title: "Beyond the Unknown",
        year: 2025,
        type: "Movie",
        rating: "Sci-Fi",
        category: "trending",
        description:
            "An original demonstration title for this streaming website. Explore a mysterious world beyond the known universe.",
        poster:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=85",
        externalUrl: "https://www.primevideo.com/"
    }
];

// ------------------------------------
// DOM Elements
// ------------------------------------

const trendingGrid = document.getElementById("trendingGrid");
const moviesGrid = document.getElementById("moviesGrid");
const seriesGrid = document.getElementById("seriesGrid");
const myListGrid = document.getElementById("myListGrid");

const emptyListMessage =
    document.getElementById("emptyListMessage");

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchSection = document.getElementById("searchSection");
const searchGrid = document.getElementById("searchGrid");
const searchCount = document.getElementById("searchCount");
const noResultsMessage =
    document.getElementById("noResultsMessage");

const movieDialog = document.getElementById("movieDialog");
const closeDialog = document.getElementById("closeDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogYear = document.getElementById("dialogYear");
const dialogType = document.getElementById("dialogType");
const dialogRating = document.getElementById("dialogRating");
const dialogDescription =
    document.getElementById("dialogDescription");

const listButton = document.getElementById("listButton");
const externalTrailer = document.getElementById("externalTrailer");
const videoNote = document.getElementById("videoNote");

const trailerFrame = document.getElementById("trailerFrame");
const popupSampleVideo =
    document.getElementById("popupSampleVideo");

let selectedMovie = null;
let youtubePlayer = null;
let playbackVersion = 0;

// ------------------------------------
// My List: Save and Load
// ------------------------------------

function getSavedList() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("netflixMyList") || "[]"
        );

        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

let myList = getSavedList();

function saveMyList() {
    try {
        localStorage.setItem(
            "netflixMyList",
            JSON.stringify(myList)
        );
    } catch {
        alert("Your browser could not save My List.");
    }
}

function isInMyList(id) {
    return myList.includes(id);
}

function toggleMyList(id) {
    if (isInMyList(id)) {
        myList = myList.filter(movieId => movieId !== id);
    } else {
        myList.push(id);
    }

    saveMyList();
    renderMyList();
    renderAllCards();

    if (selectedMovie && selectedMovie.id === id) {
        updateListButton();
    }
}

function updateListButton() {
    if (!selectedMovie) return;

    listButton.textContent = isInMyList(selectedMovie.id)
        ? "✓ Added to My List"
        : "+ My List";
}

// ------------------------------------
// Create Movie Cards
// ------------------------------------

function createMovieCard(movie) {
    const card = document.createElement("article");
    card.className = "movie-card";

    const poster = document.createElement("img");
    poster.className = "poster";
    poster.src = movie.poster;
    poster.alt = movie.title + " poster";
    poster.loading = "lazy";

    poster.onerror = () => {
        poster.onerror = null;
        poster.src =
            "https://placehold.co/400x600/181818/ffffff?text=" +
            encodeURIComponent(movie.title);
    };

    const info = document.createElement("div");
    info.className = "card-info";

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const meta = document.createElement("div");
    meta.className = "card-meta";

    const year = document.createElement("span");
    year.textContent = movie.year;

    const type = document.createElement("span");
    type.textContent = movie.type;

    meta.append(year, type);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.textContent = "View Details";
    detailsButton.addEventListener("click", () => {
        openMovie(movie);
    });

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "add-button";
    addButton.textContent = isInMyList(movie.id) ? "✓ Saved" : "+ My List";

    addButton.addEventListener("click", () => {
        toggleMyList(movie.id);
    });

    actions.append(detailsButton, addButton);
    info.append(title, meta, actions);
    card.append(poster, info);

    return card;
}

// ------------------------------------
// Render Sections
// ------------------------------------

function renderGrid(container, items) {
    container.replaceChildren();

    items.forEach(movie => {
        container.appendChild(createMovieCard(movie));
    });
}

function renderAllCards() {
    renderGrid(
        trendingGrid,
        movies.filter(movie => movie.category === "trending")
    );

    renderGrid(
        moviesGrid,
        movies.filter(movie => movie.category === "movies")
    );

    renderGrid(
        seriesGrid,
        movies.filter(movie => movie.category === "series")
    );
}

function renderMyList() {
    const savedMovies = movies.filter(movie =>
        isInMyList(movie.id)
    );

    renderGrid(myListGrid, savedMovies);

    emptyListMessage.hidden = savedMovies.length !== 0;
}

// ------------------------------------
// Search
// ------------------------------------

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        searchSection.hidden = true;
        return;
    }

    const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.type.toLowerCase().includes(query) ||
        movie.rating.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    );

    searchSection.hidden = false;
    searchCount.textContent =
        `${results.length} title${results.length === 1 ? "" : "s"} found`;

    renderGrid(searchGrid, results);
    noResultsMessage.hidden = results.length !== 0;

    searchSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        searchSection.hidden = true;
        return;
    }

    const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.type.toLowerCase().includes(query) ||
        movie.rating.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    );

    searchSection.hidden = false;
    searchCount.textContent =
        `${results.length} title${results.length === 1 ? "" : "s"} found`;

    renderGrid(searchGrid, results);
    noResultsMessage.hidden = results.length !== 0;
});

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchSection.hidden = true;
    searchGrid.replaceChildren();
    searchCount.textContent = "";
    searchInput.focus();
});

// ------------------------------------
// YouTube IFrame API
// ------------------------------------

let youtubeAPIReady = false;
let youtubeAPIRequested = false;
let youtubeAPIError = false;
let youtubeReadyCallbacks = [];

function loadYouTubeAPI() {
    return new Promise((resolve, reject) => {
        if (window.YT && window.YT.Player) {
            youtubeAPIReady = true;
            resolve();
            return;
        }

        if (youtubeAPIError) {
            reject(new Error("YouTube API could not be loaded"));
            return;
        }

        youtubeReadyCallbacks.push({ resolve, reject });

        if (youtubeAPIRequested) return;

        youtubeAPIRequested = true;

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;

        script.onerror = () => {
            youtubeAPIError = true;

            youtubeReadyCallbacks.forEach(callback => {
                callback.reject(
                    new Error("YouTube API could not be loaded")
                );
            });

            youtubeReadyCallbacks = [];
        };

        document.head.appendChild(script);
    });
}

window.onYouTubeIframeAPIReady = function () {
    youtubeAPIReady = true;

    youtubeReadyCallbacks.forEach(callback => callback.resolve());
    youtubeReadyCallbacks = [];
};

// ------------------------------------
// Stop and Play Videos
// ------------------------------------

function stopPlayback() {
    playbackVersion++;

    if (youtubePlayer) {
        try {
            youtubePlayer.destroy();
        } catch {
            // The player may already have been removed.
        }

        youtubePlayer = null;
    }

    trailerFrame.replaceChildren();
    trailerFrame.hidden = true;

    popupSampleVideo.pause();
    popupSampleVideo.removeAttribute("src");
    popupSampleVideo.load();
    popupSampleVideo.hidden = true;
}

function playSampleVideo(movie, version) {
    if (
        version !== playbackVersion ||
        !movieDialog.open ||
        selectedMovie !== movie
    ) {
        return;
    }

    if (youtubePlayer) {
        try {
            youtubePlayer.destroy();
        } catch {
            // Ignore a player that has already been destroyed.
        }

        youtubePlayer = null;
    }

    trailerFrame.replaceChildren();
    trailerFrame.hidden = true;

    popupSampleVideo.pause();
    popupSampleVideo.src = SAMPLE_VIDEO;
    popupSampleVideo.hidden = false;
    popupSampleVideo.muted = true;
    popupSampleVideo.load();

    videoNote.textContent =
        "Playing a sample demonstration clip, not the actual movie.";

    popupSampleVideo.play().catch(() => {
        videoNote.textContent =
            "Sample video is ready. Press Play in the video controls if it does not start automatically.";
    });
}

async function playTrailer(movie, version) {
    try {
        await loadYouTubeAPI();

        if (
            version !== playbackVersion ||
            !movieDialog.open ||
            selectedMovie !== movie
        ) {
            return;
        }

        popupSampleVideo.hidden = true;
        trailerFrame.hidden = false;
        trailerFrame.replaceChildren();

        youtubePlayer = new YT.Player("trailerFrame", {
            width: "100%",
            height: "100%",

            videoId: movie.videoId,

            playerVars: {
                autoplay: 1,
                mute: 1,
                playsinline: 1,
                rel: 0
            },

            events: {
                onReady: event => {
                    if (
                        version !== playbackVersion ||
                        !movieDialog.open
                    ) {
                        event.target.destroy();
                        return;
                    }

                    event.target.mute();
                    event.target.playVideo();
                },

                onError: () => {
                    playSampleVideo(movie, version);
                }
            }
        });

        videoNote.textContent =
            "Loading the YouTube trailer. If playback fails, a sample clip will be used instead.";

    } catch {
        playSampleVideo(movie, version);
    }
}

// ------------------------------------
// Open Movie Details
// ------------------------------------

function openMovie(movie) {
    selectedMovie = movie;

    stopPlayback();

    const version = playbackVersion;

    dialogTitle.textContent = movie.title;
    dialogYear.textContent = movie.year;
    dialogType.textContent = movie.type;
    dialogRating.textContent = movie.rating;
    dialogDescription.textContent = movie.description;

    updateListButton();

    if (movie.externalUrl) {
        externalTrailer.href = movie.externalUrl;
        externalTrailer.textContent = "Open Prime Video";
    } else if (movie.videoId) {
        externalTrailer.href =
            "https://www.youtube.com/watch?v=" + movie.videoId;
        externalTrailer.textContent = "Watch on YouTube";
    } else {
        externalTrailer.href =
            "https://www.youtube.com/results?search_query=" +
            encodeURIComponent(movie.title + " official trailer");

        externalTrailer.textContent = "Find Official Trailer";
    }

    if (!movieDialog.open) {
        movieDialog.showModal();
    }

    if (movie.videoId) {
        playTrailer(movie, version);
    } else {
        playSampleVideo(movie, version);
    }
}

// ------------------------------------
// Popup Controls
// ------------------------------------

function closeMovieDialog() {
    if (movieDialog.open) {
        movieDialog.close();
    }

    stopPlayback();
    selectedMovie = null;
}

closeDialog.addEventListener("click", closeMovieDialog);

movieDialog.addEventListener("close", () => {
    stopPlayback();
    selectedMovie = null;
});

listButton.addEventListener("click", () => {
    if (selectedMovie) {
        toggleMyList(selectedMovie.id);
    }
});

// ------------------------------------
// Hero Buttons
// ------------------------------------

document.getElementById("exploreButton").addEventListener("click", () => {
    document.getElementById("trending").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("heroInfoButton").addEventListener("click", () => {
    openMovie(movies[0]);
});

// ------------------------------------
// Initialize Website
// ------------------------------------

renderAllCards();
renderMyList();
