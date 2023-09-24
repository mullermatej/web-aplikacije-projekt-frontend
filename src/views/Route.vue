<template>
    <v-main>
        <v-container class="custom-container">
            <header>
                <h1>{{ route.name }}</h1>
                <div
                    style="
                        margin-bottom: 65px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.2rem;
                    "
                >
                    <i class="fas fa-location" style="color: #798777"></i>
                    <h3 style="margin: 1px 0 0 0">
                        {{ route.location }} &nbsp;
                    </h3>
                </div>
            </header>
            <v-card justify="center" align="center">
                <div class="card-content">
                    <!-- <div class="gornji-buttoni">
                        <div class="dodaj-omiljene">
                            <i
                                class="fa-solid fa-heart"
                                @click="toggleHeartColor"
                                :class="{ 'favorite-icon-red': isHeartRed }"
                            ></i>
                        </div>
                    </div> -->
                </div>
                <div class="cardDescription">
                    <h4 style="margin: 0 0 0 0">Description</h4>
                </div>

                <div class="opisSlike">
                    <p>
                        {{ route.description }}
                        <!-- <span v-if="!showMore" id="dots">...</span
                        ><span v-if="showMore" id="more">
                            necessitatibus voluptas ex quo facilis, quod totam
                            vitae provident velit ipsum, neque molestias dolorum
                            obcaecati consequatur tempore esse odio consectetur
                            impedit.</span
                        > -->
                    </p>
                    <!-- <button @click="toggleShowMore" id="readMoreDugme">
                        {{ showMore ? 'Manje' : 'Pročitaj više' }}
                    </button> -->
                </div>
                <section
                    style="
                        display: flex;
                        justify-content: space-around;
                        margin-top: 1rem;
                    "
                >
                    <!-- Display route distance -->
                    <div class="icon-with-text">
                        <p>
                            <i
                                class="fa-solid fa-shoe-prints"
                                style="color: #000000"
                            ></i
                            >&nbsp; {{ route.distance }}km
                        </p>
                    </div>

                    <!-- Display route duration -->
                    <div class="icon-with-text">
                        <p>
                            <i
                                class="fa-regular fa-clock"
                                style="color: #000000"
                            ></i>
                            &nbsp;
                            {{ route.duration }}min
                        </p>
                    </div>

                    <!-- Display route difficulty -->
                    <div class="icon-with-text">
                        <p>
                            <i
                                class="fa-solid fa-triangle-exclamation"
                                style="color: #000000"
                            ></i>
                            &nbsp;
                            {{ route.difficulty }}
                        </p>
                    </div>
                </section>
                <!-- <div class="prognoza">
                    <h4>Prognoza</h4>
                </div> -->
                <!-- <hr /> -->
                <div class="misc">
                    <span @click="toggleFavourite">
                        <!-- <transition name="heart-color-fade"> -->
                        <i
                            class="fa-solid fa-heart"
                            v-if="!isFavourite"
                            style="color: white; cursor: pointer"
                        ></i
                        ><i
                            class="fa-solid fa-heart"
                            v-else
                            style="color: #dc1c13; cursor: pointer"
                        ></i>
                        <!-- </transition> -->
                    </span>
                    <p
                        @click="toggleVisit"
                        style="margin: 0; color: white; font-weight: 700"
                    >
                        {{ route.visited }} visited
                        <i
                            class="fa-regular fa-square ml-2"
                            v-if="!hasVisited"
                            style="cursor: pointer"
                        ></i>
                        <i
                            class="fa-regular fa-square-check ml-2"
                            v-else
                            style="cursor: pointer"
                        ></i>
                    </p>
                </div>
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
import { Rute } from '@/services';

export default {
    name: 'Ruta',
    data() {
        return {
            route: {}, // Store the route data
            showMore: false, // Initialize to false to hide the content
            hasVisited: false,
            isFavourite: false,
        };
    },
    methods: {
        async fetchData() {
            try {
                // Use the route_id parameter from the URL to fetch the corresponding route data
                const routeId = this.$route.params.route_id;
                console.log('routeId: ', routeId);
                // Make an API request to fetch route data based on routeId
                const response = await Rute.getRouteById(routeId);
                this.route = response;
            } catch (error) {
                console.error('Podaci o ruti error: ' + error);
            }
        },
        toggleShowMore() {
            this.showMore = !this.showMore;
        },
        toggleVisit() {
            this.hasVisited = !this.hasVisited;
        },
        toggleFavourite() {
            this.isFavourite = !this.isFavourite;
        },
    },
    created() {
        // Fetch route data when the component is created
        this.fetchData();
    },
};
</script>

<style>
main {
    font-family: 'Alegreya Sans SC', sans-serif;
    background-color: #fffefb;
}

header {
    text-align: center;
}

header h1 {
    margin: 65px 0px 0px 0px;
    font-size: 4.5rem;
    color: #798777;
    font-weight: 800;
}

header h3 {
    color: #798777;

    font-size: 1rem;
}
.card-content {
    position: relative;
    text-align: center;
}

.card-content h1 {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: white;
    font-size: 40px;
    user-select: none;
}

.dodaj-omiljene i {
    position: absolute;
    top: 94%;
    left: 3%;
    transform: translate(-50%, -50%);
    z-index: 1;
    user-select: none;
    font-size: 30px;
}

.card-content {
    background-image: linear-gradient(
            to bottom,
            rgba(245, 246, 252, 0),
            rgba(0, 0, 0, 0.16)
        ),
        url('@/assets/pulaRuta1.jpeg');
    width: 100%;
    height: 400px;
    background-size: cover;
    color: white;
    padding: 20px;
}

.custom-container {
    max-width: 824px; /* Adjust the value to your desired maximum width */
    margin: 0 auto; /* Center the container horizontally */
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    /* padding-bottom: 550px; */
}

.cardDescription {
    text-align: left;
    margin: 20px 0px 20px 20px; /* top right bottom left */
    display: flex;
    justify-content: space-between;
}
.prognoza {
    text-align: left;
    margin: 15px 0px 10px 20px; /* top right bottom left */
    display: flex;
    justify-content: space-between;
}

.ikonaPotvrda {
    width: auto;
    height: 20px;
    margin: 0 20px 0 7px;
}

.opisSlike {
    margin: 15px 20px 20px 20px;
    text-align: left;
}

#readMoreDugme {
    background-color: transparent;
    border: none;
    color: #202122;
    text-decoration: underline;
    cursor: pointer;
    font-size: 16px;
}

.icon-with-text {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.misc {
    background-color: #bdd2b6;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
    font-size: 1.5rem;
}
</style>
