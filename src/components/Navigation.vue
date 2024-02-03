<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div
			class="container"
			style="max-width: 98%"
		>
			<a
				class="navbar-brand"
				href="../"
				style="font-size: 2rem"
				>Walk it</a
			>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div
				class="collapse navbar-collapse"
				id="navbarNavDropdown"
			>
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<!-- ne smije biti hardcoded, nego izvući iz local storagea npr. -->
						<a
							class="nav-link px-3"
							href="/profile"
							>Profile</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link px-3"
							href="/explore"
							>Explore</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link px-3"
							href="/test"
							>Routes</a
						>
					</li>
				</ul>

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
						Sign up
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
			</div>
		</div>
	</nav>
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
	border-bottom: 1px solid #eee !important;
}
</style>
