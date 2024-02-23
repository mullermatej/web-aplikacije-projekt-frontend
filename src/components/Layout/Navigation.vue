<template>
	<v-container class="mx-auto mt-3">
		<v-row>
			<v-col>
				<router-link
					:to="{ name: 'Home' }"
					class="text-decoration-none black--text"
				>
					<p class="text-h5 font-weight-light text-uppercase">Walk <span class="accent--text">it</span></p>
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
					:to="{ name: 'Walks' }"
					>Walks</v-btn
				>
				<v-btn
					plain
					class="text-decoration-none text-caption rounded-pill"
					:to="{ name: 'Uploads' }"
					>Uploads</v-btn
				>
			</v-col>
			<v-col
				v-if="device == 'lg'"
				align="right"
			>
				<v-btn
					v-if="auth.authenticated"
					@click="logout"
					class="text-caption"
					color="primary"
				>
					Log out
				</v-btn>
			</v-col>
			<v-col
				v-if="device != 'lg'"
				align="right"
			>
				<div>
					<v-menu :open="menuOpen">
						<template v-slot:activator="{ on }">
							<v-btn
								plain
								class="text-body"
								color="primary"
								dark
								v-on="on"
							>
								<i
									class="fa-solid fa-bars"
									style="color: black"
								></i>
							</v-btn>
						</template>

						<v-list>
							<v-list-item>
								<v-list-item-title
									align="center"
									justify="center"
								>
									<v-btn
										plain
										class="text-decoration-none text-caption rounded-pill"
										:to="{ name: 'Profile' }"
										>Profile</v-btn
									>
								</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title
									align="center"
									justify="center"
									><v-btn
										plain
										class="text-decoration-none text-caption rounded-pill"
										:to="{ name: 'Explore' }"
										>Explore</v-btn
									></v-list-item-title
								>
							</v-list-item>
							<v-list-item>
								<v-list-item-title
									align="center"
									justify="center"
									><v-btn
										plain
										class="text-decoration-none text-caption rounded-pill"
										:to="{ name: 'Walks' }"
										>Walks</v-btn
									></v-list-item-title
								>
							</v-list-item>
							<v-list-item>
								<v-btn
									v-if="auth.authenticated"
									@click="logout"
									class="text-caption"
									color="primary"
								>
									Log out
								</v-btn>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { Auth } from '@/services';

export default {
	name: 'Navigation',
	data() {
		return {
			username: '',
			auth: Auth.state,
			drawer: null,
			menuOpen: false,
		};
	},
	methods: {
		logout() {
			Auth.logout();
			this.$router.go();
		},
		toggleMenu() {
			this.menuOpen = !this.menuOpen;
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
<style scoped></style>
