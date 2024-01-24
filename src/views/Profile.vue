<template>
	<v-main>
		<ProfileCard />
		<div class="cards">
			<div class="card">
				<img
					class="card__image"
					src="@/assets/pulaRuta1.jpeg"
					alt=""
				/>
				<div class="card__content">
					<h3>Galebove stijene</h3>
					<p>
						Experience this 40.9-km loop trail near Pula - Pola, Istra. Generally considered a moderately
						challenging route. This is a popular trail for road biking and bike touring, but you can still
						enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful
						to visit anytime.
					</p>
					<div class="icon-container">
						<div class="icon-with-text">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
								/>
							</svg>
							<p>10km</p>
						</div>
						<div class="icon-with-text">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p>30min</p>
						</div>
						<div class="icon-with-text">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
							</svg>
							<p>easy</p>
						</div>
					</div>
				</div>
				<div class="card__info">
					<i
						class="fa-solid fa-heart"
						style="font-size: 1.3rem; color: #dc1c13"
					></i>
				</div>
			</div>
			<div class="card">
				<img
					class="card__image"
					src="@/assets/pulaRuta1.jpeg"
					alt=""
				/>
				<div class="card__content">
					<h3>Galebove stijene</h3>
					<p>
						Experience this 40.9-km loop trail near Pula - Pola, Istra. Generally considered a moderately
						challenging route. This is a popular trail for road biking and bike touring, but you can still
						enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful
						to visit anytime.
					</p>
					<div class="icon-container">
						<div class="icon-with-text">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
								/>
							</svg>
							<p>10km</p>
						</div>
						<div class="icon-with-text">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p>30min</p>
						</div>
						<div class="icon-with-text">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
							</svg>
							<p>easy</p>
						</div>
					</div>
				</div>
				<div class="card__info">
					<i
						class="fa-solid fa-heart"
						style="font-size: 1.3rem; color: #dc1c13"
					></i>
				</div>
			</div>
		</div>
	</v-main>
</template>

<script>
import Vue from 'vue';
import VueModal from 'vue-js-modal';
import Route from './Route.vue';
import routeCard from '../components/routeCard.vue';
import ProfileCard from '../components/ProfileCard.vue';

Vue.use(VueModal);

export default {
	data() {
		return {
			firstName: '',
			lastName: '',
			userEmail: '',
			showModal: false,
			oldPassword: '',
			newPassword: '',
		};
	},
	created() {},
	methods: {
		openModel() {
			this.showModal = true;
		},
		closeModel() {
			this.showModal = false;
		},
	},
	components: { Route, routeCard, ProfileCard },
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
	font-weight: 700;
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
