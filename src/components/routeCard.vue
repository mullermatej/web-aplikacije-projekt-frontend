<template>
    <div class="card">
        <img class="card__image" src="@/assets/pulaRuta1.jpeg" alt="" />
        <div class="card__content">
            <!-- Display route name -->
            <h3>{{ route.name }}</h3>

            <!-- Display route description -->
            <p>{{ route.description }}</p>

            <div class="icon-container">
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
                    <i class="fa-regular fa-clock" style="color: #000000"></i>
                    &nbsp;
                    <p>{{ route.duration }}min</p>
                </div>

                <!-- Display route difficulty -->
                <div class="icon-with-text">
                    <i
                        class="fa-solid fa-triangle-exclamation"
                        style="color: #000000"
                    ></i>
                    &nbsp;
                    <p>{{ route.difficulty }}</p>
                </div>
            </div>
        </div>
        <div class="card__info">
            <i
                class="fa-solid fa-heart"
                style="font-size: 1.3rem"
                @click="toggleHeartColor"
                :class="{ 'favorite-icon-red': isHeartRed }"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    props: ['route'],
    data() {
        return {
            isHeartRed: false,
        };
    },
    methods: {
        toggleHeartColor() {
            this.isHeartRed = !this.isHeartRed;
        },
    },
};
</script>

<style>
.card {
    --bs-card-border-width: 0; /* Remove any border */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Initial shadow */
    transition: box-shadow 0.3s ease, cursor 0.3s ease; /* Add a transition for a smoother effect */
    /* ... other card styles ... */

    /* Set cursor to pointer on hover */
    cursor: pointer;
}

.card:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4); /* Increased shadow on hover */
}

.card__image {
    width: 100%;
    object-fit: cover;
    display: block;
}

.card__content {
    font-size: 0.9em;
    padding: 15px;
    background: #fafafa;
}

.card__content > p:first-of-type {
    margin-top: 0;
}

.card__content > p:last-of-type {
    margin-bottom: 0;
}

.card__info {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background: #bdd2b6;
    font-size: 0.8em;
}

.card__info i {
    font-size: 0.9em;
    margin-right: 8px;
}

.card__link {
    color: #64968c;
    text-decoration: none;
}

.card__link:hover {
    text-decoration: underline;
}

.icon-container {
    margin: 10px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}
.icon-container p {
    margin: 0 0 0 0;
}

.icon-with-text {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.icon-with-text svg {
    margin-right: 5px;
}

.favorite-icon-red {
    color: #dc1c13;
}
</style>
