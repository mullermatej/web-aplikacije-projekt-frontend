<template>
    <v-main>
        <header
            class="container"
            style="margin-top: 40px; padding-bottom: 20px"
        >
            <img src="@/assets/woman (5).png" alt="" />

            <div class="user-info">
                <h1 id="naslov-korisnikovog-profila">
                    {{ firstName }} {{ lastName }}

                    <button
                        type="button"
                        id="follow-button"
                        class="btn btn-outline btn-sm ml-4"
                        @click="toggleFollowButton"
                    >
                        <span v-if="!isFollowing">Follow</span>
                        <span v-else>Following</span>

                        <i
                            class="fa-regular fa-circle-check ml-2"
                            style="color: #445462"
                            v-if="isFollowing"
                        ></i>
                    </button>
                </h1>
                <p style="font-weight: 400; text-align: left">
                    FOLLOWERS: <strong>1</strong>
                </p>
            </div>
        </header>
        <div class="mojprofil-podnaslov">
            <span style="text-decoration: underline; cursor: pointer"
                >Favourites</span
            >
            /
            <span style="cursor: pointer">Custom routes</span>
        </div>
    </v-main>
</template>

<script>
import { Auth, Korisnik } from '@/services';
import Vue from 'vue';
import VueModal from 'vue-js-modal';
import Route from '../views/Route.vue';
import routeCard from './routeCard.vue';

Vue.use(VueModal);

export default {
    name: 'publicProfileCard',
    data() {
        return {
            firstName: '',
            lastName: '',
            userEmail: '',
            showModal: false,
            isFollowing: false,
        };
    },
    created() {
        this.fetchUser();
    },
    mounted() {
        // let data1 = window.localStorage.getItem('user');
        // let parsedData = JSON.parse(data1);
        // console.log(parsedData.firstName);
        // Assign values to the component's data properties
        // this.firstName = parsedData.firstName;
        // this.lastName = parsedData.lastName;
        // this.userEmail = parsedData.username;
    },
    methods: {
        openModel() {
            this.showModal = true;
        },
        closeModel() {
            this.showModal = false;
        },
        async changePassword() {
            let success = await Auth.changePassword(
                this.oldPassword,
                this.newPassword
            );
            console.log('Rezultat promjene lozinke ', success);
            if (success) {
                this.$router.push({ name: 'Home' });
                alert('Password changed successfully!');
            } else {
                alert('Wrong password or an error occurred.');
            }
        },
        fetchUser() {
            const user_id = this.$route.params.user_id;
            Korisnik.getUser(user_id)
                .then((response) => {
                    // console.log('U mojprofil.vue sam: ', response);
                    this.firstName = response.firstName;
                    this.lastName = response.lastName;
                    this.userEmail = response.username;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        toggleFollowButton() {
            this.isFollowing = !this.isFollowing;
        },
    },
    components: { Route, routeCard },
};
</script>
<style scoped>
main {
    font-family: 'Alegreya Sans SC', sans-serif;
    background-color: #fffefb;
}

header {
    max-width: 80%;
    /* background-color: #64dfdf; */
    display: flex;
    /* border-bottom: 1px solid #eee; */
}

#naslov-korisnikovog-profila {
    font-size: 2.5rem;
    font-weight: 300;
    margin-top: 30px;
    color: #445462;
}

header img {
    width: 150px;
    height: 150px;
}

.user-info {
    margin: 0 0 0 30px;
    color: #445462;
}

#follow-button {
    background-color: white;
    color: #445462;
    border: 2px solid #445462;
    border-radius: 5px;
    font-weight: 700;
    font-size: 15px;
    padding: 5px 10px;
}

#follow-button:focus {
    box-shadow: none;
}

#follow-button:hover {
    background-color: #ededed;
    color: #445462;

    border-radius: 5px;
    font-weight: 700;
    font-size: 15px;
    padding: 5px 10px;
}

.mojprofil-podnaslov {
    font-weight: 700;
    font-size: 1.2rem;
    margin: 40px 0 40px 0px;
    color: #445462;
    text-align: center;
}

.naslov-flex {
    text-align: center;
}

.zatvori-ikona {
    text-align: right;
    margin: 0 0 0 0;
    font-size: 1.5rem;
    color: #798777;
}

.avatar-part {
    text-align: center;
}

.titles-text {
    font-size: 1.5rem;
    margin: 8px 0 8px 0;
}

.personal-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#avatar-button {
    background-color: #798777;
    color: #fff;
}

.form-password-change {
    margin: -20px 0 0 0;
}
.change-password {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.password-submit-center {
    text-align: center;
}

#passwordHelpBlock {
    font-size: 12px;
    color: #798777;
    margin: 4px 0 0 0;
    padding: 0 0 0 0;
}

#change-password-popup {
    background-color: #798777;
    color: #fff;
}

#user-info-popup-save {
    background-color: #798777;
    color: #fff;
}

/* body {
    font: normal 14px/100% 'Andale Mono', AndaleMono, monospace;
    width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100vh;
} */

.custom-model-main {
    text-align: center;
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; /* z-index: 1050; */
    -webkit-overflow-scrolling: touch;
    outline: 0;
    opacity: 0;
    -webkit-transition: opacity 0.15s linear, z-index 0.15;
    -o-transition: opacity 0.15s linear, z-index 0.15;
    transition: opacity 0.15s linear, z-index 0.15;
    z-index: -1;
    overflow-x: hidden;
    overflow-y: auto;
}

.model-open {
    z-index: 99999;
    opacity: 1;
    overflow: hidden;
}
.custom-model-inner {
    -webkit-transform: translate(0, -25%);
    -ms-transform: translate(0, -25%);
    transform: translate(0, -25%);
    -webkit-transition: -webkit-transform 0.3s ease-out;
    -o-transition: -o-transform 0.3s ease-out;
    transition: -webkit-transform 0.3s ease-out;
    -o-transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    display: inline-block;
    vertical-align: middle;
    width: 600px;
    margin: 30px auto;
    max-width: 97%;
}
.custom-model-wrap {
    display: block;
    width: 100%;
    position: relative;
    background-color: #fff;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    background-clip: padding-box;
    outline: 0;
    text-align: left;
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
}
.model-open .custom-model-inner {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
    position: relative;
    z-index: 999;
}
.model-open .bg-overlay {
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
}
.bg-overlay {
    background: rgba(0, 0, 0, 0);
    height: 100vh;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    -webkit-transition: background 0.15s linear;
    -o-transition: background 0.15s linear;
    transition: background 0.15s linear;
}

@media screen and (min-width: 800px) {
    .custom-model-main:before {
        content: '';
        display: inline-block;
        height: auto;
        vertical-align: middle;
        margin-right: -0px;
        height: 100%;
    }
}
@media screen and (max-width: 799px) {
    .custom-model-inner {
        margin-top: 45px;
    }
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

/* .cards * {
    box-sizing: border-box;
} */

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
    justify-content: space-between;
    align-items: center;
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
