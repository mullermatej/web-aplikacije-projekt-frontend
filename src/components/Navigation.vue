<template>
	<v-container class="mx-auto">
		<v-row>
			<v-col>
				<v-btn
					class="text-h5 text-decoration-none"
					plain
					:to="{ name: 'Home' }"
				>
					Walk it
				</v-btn>
			</v-col>

			<v-col class="d-flex justify-space-around">
				<v-btn
					plain
					class="text-decoration-none rounded-pill"
					:to="{ name: 'Profile' }"
					>Profile</v-btn
				>
				<v-btn
					plain
					class="text-decoration-none rounded-pill"
					:to="{ name: 'Explore' }"
					>Explore</v-btn
				>
				<v-btn
					plain
					class="text-decoration-none rounded-pill"
					:to="{ name: 'Test' }"
					>Routes</v-btn
				>
			</v-col>
			<v-col align="right">
				<section class="buttons">
					<button
						v-if="!auth.authenticated"
						type="button"
						id="loginButton"
						class="btn btn-md mr-2"
						onclick="window.location.href = 'Login'"
					>
						Log in
					</button>
					<button
						v-if="!auth.authenticated"
						type="button"
						id="signupButton"
						class="btn btn-md mr-2"
						onclick="window.location.href = 'Register'"
					>
						Register
					</button>
					<button
						v-if="auth.authenticated"
						@click="logout"
						type="button"
						id="logoutButton"
						class="btn btn-md my-2 my-sm-0 mr-2"
					>
						Logout
					</button>
				</section>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { globalData } from '../../global.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from '@/services';

export default {
	name: 'Navigation',
	data() {
		return {
			username: '',
			mojeKoordinate: globalData.mojeKoordinate,
			auth: Auth.state, // Ovo je reactive, pa se automatski updatea - ako stavim ... spread operator, ne radi
		};
	},
	methods: {
		logout() {
			Auth.logout(); // Metoda nije asikrona, ne treba await jer samo brise token iz local storagea :)
			this.$router.go(); // Refresha stranicu, before each se opet poziva i redirecta na login
		},
		goHome() {
			this.$router.push('/');
			console.log(window.location.href);
		},
	},
};
</script>
<style scoped>
#loginButton {
	background-color: #a2b29f;
	color: #fff;
}

#signupButton {
	background-color: #798777;
	color: #fff;
}

#logoutButton {
	background-color: #a2b29f;
	color: #fff;
}

#navbarNavDropdown {
	font-size: 1.1rem;
}

.navbar-light {
	background-color: #fffefb !important;
	border-width: 0 !important;
	/* border-bottom: 1px solid #eee !important; */
}
</style>
