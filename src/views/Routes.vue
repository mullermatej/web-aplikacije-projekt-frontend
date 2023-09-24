<template>
    <v-main>
        <header>
            <h1>Route library</h1>

            <h3 style="letter-spacing: 3px; margin: -15px 0 40px 0">
                Easily choose a route and start walking
            </h3>

            <div
                class="d-flex justify-content-center"
                style="margin: 0 0 65px 0"
            >
                <div class="input-group mb-3" style="max-width: 500px">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search routes"
                        aria-label="Search routes"
                        aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append" style="cursor: pointer">
                        <span class="input-group-text" id="basic-addon2"
                            ><i
                                class="fas fa-search"
                                style="color: #798777; font-size: 1.5rem"
                            ></i
                        ></span>
                    </div>
                </div>
            </div>
        </header>
        <section class="cards">
            <div v-for="route in routes" :key="route.id">
                <router-link
                    :to="'/routes/' + route.id"
                    style="text-decoration: none"
                >
                    <!-- Your route card component here -->
                    <route-card :route="route"></route-card>
                </router-link>
            </div>
        </section>

        <router-view></router-view>
    </v-main>
</template>

<script>
import { Rute } from '@/services';
import routeCard from '../components/routeCard.vue';

export default {
    data() {
        return {
            routes: [], // Store the list of routes
        };
    },
    created() {
        this.fetchRute();
    },
    name: 'Rute',
    methods: {
        async fetchRute() {
            try {
                // Make an API request to fetch the list of routes from your backend
                const response = await Rute.getAll(); // Adjust the API endpoint as needed

                // Update the routes data property with the fetched route data
                console.log('U rute.vue sam: ', response);
                this.routes = response;
            } catch (error) {
                console.error(error);
            }
        },
    },
    components: { routeCard },
};
</script>

<style scoped>
main {
    font-family: 'Alegreya Sans SC', sans-serif;
    background-color: #fffefb;
}

header {
    text-align: center;
    margin: 65px 0 0 0;
}

header h1 {
    font-size: 4.5rem;
    color: #798777;
    font-weight: 700;
}

header h3 {
    font-size: 1.5rem;
    color: #a2b29f;
}

.form-control:focus {
    border-color: none;
    box-shadow: none;
    border: 1px solid #dee2e6ff;
}

.cards {
    margin: 0 auto;
    max-width: 70%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
    grid-auto-rows: auto;
    gap: 60px;
    row-gap: 100px;
}
</style>
