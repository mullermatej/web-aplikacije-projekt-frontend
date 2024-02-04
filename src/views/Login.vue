<template>
	<v-container class="mx-auto">
		<div>
			<h1 class="naslov">Walk it</h1>
			<h1
				class="text-center my-8"
				style="font-family: 'Alegreya Sans SC', sans-serif; font-weight: 700; color: #a2b29f"
			>
				Log in
			</h1>
			<form @submit.prevent="login">
				<div class="form-group">
					<v-row
						justify="center"
						align="center"
					>
						<v-col lg="6">
							<input
								v-model="username"
								type="text"
								class="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="username"
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
				</div>
				<div class="form-group">
					<v-row
						justify="center"
						align="center"
					>
						<v-col lg="6">
							<input
								v-model="password"
								type="password"
								class="form-control"
								id="exampleInputPassword1"
								placeholder="password"
								required
							/>
							<p
								class="form-text text-muted ml-1"
								style="font-size: 12px"
							>
								Required
							</p>
						</v-col>
					</v-row>
				</div>
				<div class="col-md-12 text-center">
					<v-btn
						class="mb-2 white--text"
						type="submit"
						color="#A2B29F"
					>
						Log in
					</v-btn>
					<p style="font-weight: 400">
						Don't have an account?
						<a
							href="/Register"
							style="color: #798777"
						>
							<strong>Register</strong></a
						>
					</p>
				</div>
			</form>
		</div>
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

<style scoped>
main {
	background-color: #fffefb;
	font-family: 'Alegreya Sans SC', sans-serif;
	font-weight: 700;
}
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	height: 1000px;
}
.naslov {
	font-family: 'Borel', cursive;
	font-size: 11rem;
	line-height: 0;
	color: #bdd2b6;
}
@media (max-width: 1315px) {
	.naslov {
		font-size: 6rem;
	}
}
</style>
