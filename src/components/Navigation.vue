<template>
	<v-container class="mx-auto">
		<v-row>
			<v-col>
				<router-link
					:to="{ name: 'Explore' }"
					class="text-decoration-none"
				>
					<p class="text-h5 font-weight-light text-uppercase">Walk it</p>
				</router-link>
			</v-col>

			<v-col
				v-if="device == 'lg'"
				class="d-flex justify-space-around"
			>
				<v-btn
					plain
					class="text-decoration-none text-caption rounded-pill"
					:to="{ name: 'Profile' }"
					>Profile</v-btn
				>
				<v-btn
					plain
					class="text-decoration-none text-caption rounded-pill"
					:to="{ name: 'Explore' }"
					>Explore</v-btn
				>
				<v-btn
					plain
					class="text-decoration-none text-caption rounded-pill"
					:to="{ name: 'Test' }"
					>Walks</v-btn
				>
			</v-col>
			<v-col align="right">
				<section class="buttons">
					<v-btn
						v-if="!auth.authenticated"
						color="secondary"
						class="text-caption mr-4"
						onclick="window.location.href = 'Login'"
					>
						Log in
					</v-btn>
					<v-btn
						v-if="!auth.authenticated"
						class="text-caption"
						color="primary"
						onclick="window.location.href = 'Register'"
					>
						Register
					</v-btn>
					<v-btn
						v-if="auth.authenticated"
						@click="logout"
						class="text-caption"
						color="secondary"
					>
						Log out
					</v-btn>
				</section>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from '@/services';

export default {
	name: 'Navigation',
	data() {
		return {
			username: '',
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
	computed: {
		device() {
			return this.$vuetify.breakpoint.name;
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
