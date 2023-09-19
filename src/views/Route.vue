<template>
    <v-main>
        <v-container class="custom-container">
            <header>
                <h1>Galebove stijene</h1>
                <div style="margin-bottom: 65px">
                    <h3 style="display: inline">Pula, Croatia &nbsp;</h3>
                    <i class="fas fa-location" style="color: #798777"></i>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minus numquam molestias maiores, saepe dolor, deserunt
                        libero voluptates et adipisci at voluptas? Rem eius
                        perspiciatis consectetur, ipsam eos est itaque
                        repudiandae. Lorem ipsum dolor, sit amet consectetur
                        adipisicing elit. Possimus et quas fuga pariatur ab
                        natus sit corrupti deleniti, impedit saepe iusto
                        aperiam! Maiores ut inventore tempora, enim vel
                        necessitatibus incidunt! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit
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
                            style="color: #445462; cursor: pointer"
                        ></i
                        ><i
                            class="fa-solid fa-heart"
                            v-else
                            style="color: #dc1c13; cursor: pointer"
                        ></i>
                        <!-- </transition> -->
                    </span>
                    <p @click="toggleVisit">
                        0 visited
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
export default {
    name: 'Ruta',
    data() {
        return {
            showMore: false, // Initialize to false to hide the content
            hasVisited: false,
            isFavourite: false,
        };
    },
    methods: {
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
    async mounted() {
        // Upit na backend za sve rute
        // this.doc = await Rute.dohvatiRutu(this.id);
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
    margin-top: -5px;
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

.misc {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 0px 20px;
    font-size: 1.5rem;
}
</style>
