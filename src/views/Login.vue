<template>
	<v-container
		justify-center
		fluid
		fill-height
	>
		<v-row>
			<v-col>
				<p class="text-h1 text-center mx-auto">WALK <span class="accent--text">IT</span></p>
				<form @submit.prevent="login">
					<v-row
						justify="center"
						align="center"
					>
						<v-col
							lg="4"
							md="6"
							sm="8"
						>
							<input
								v-model="username"
								type="text"
								class="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Username"
								required
							/>
							<p
								class="form-text text-muted ml-1 mb-0"
								style="font-size: 12px"
							>
								Required
							</p>
						</v-col>
					</v-row>

					<v-row
						justify="center"
						align="center"
					>
						<v-col
							lg="4"
							md="6"
							sm="8"
						>
							<input
								v-model="password"
								type="password"
								class="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
								required
							/>
							<p
								class="form-text text-muted ml-1 mb-0"
								style="font-size: 12px"
							>
								Required
							</p>
						</v-col>
					</v-row>

					<v-row
						class="text-center"
						justify="center"
					>
						<v-col>
							<v-btn
								class="white--text text-caption"
								type="submit"
								color="accent"
							>
								Log in
							</v-btn>
						</v-col>

						<p class="text-subtitle-1">
							Don't have an account?
							<a href="/Register"> <strong>Register</strong></a>
						</p>
					</v-row>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { Auth } from '@/services';

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			email: '',
			password: '',
		};
	},
	methods: {
		async login() {
			let success = await Auth.login(this.username, this.email, this.password);
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
