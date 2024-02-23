<template>
	<v-container
		justify-center
		fluid
		fill-height
	>
		<v-form
			fast-fail
			@submit.prevent
			class="py-8 px-8"
		>
			<v-row>
				<v-col>
					<p class="text-h1 text-center mx-auto">WALK <span class="accent--text">IT</span></p>
				</v-col>
			</v-row>
			<v-text-field
				v-model="username"
				label="Username"
				required
			>
			</v-text-field>
			<v-text-field
				v-model="password"
				label="Password"
				type="password"
				required
			>
			</v-text-field>

			<v-row
				class="text-center"
				justify="center"
				align="center"
			>
				<v-col>
					<v-btn
						class="white--text text-caption mt-4"
						type="submit"
						@click="login()"
						color="accent"
					>
						Log in
					</v-btn>
					<p class="text-subtitle-1 mt-2">
						Don't have an account?
						<router-link
							to="/Register"
							class="mt-2 nav-link text-decoration-underline accent--text"
							><strong>Register</strong></router-link
						>
					</p>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
import { Auth } from '@/services';

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
		};
	},
	methods: {
		async login() {
			console.log(this.username, this.password);
			let success = await Auth.login(this.username, this.password);
			console.log('Rezultat prijave ', success);

			if (success == true) {
				this.$router.push({ name: 'Home' });
			}
			this.$router.go();
		},
	},
};
</script>

<style scoped></style>
