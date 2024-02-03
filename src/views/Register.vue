<template>
	<v-container class="mx-auto">
		<v-row class="mt-5">
			<v-col align="center">
				<v-img
					style="cursor: pointer"
					:src="imageUrl"
					height="200px"
					width="200px"
					@click="showAvatarsModal = true"
				>
				</v-img>
			</v-col>
		</v-row>
		<v-row>
			<v-col align="center">
				<p>Choose your avatar</p>
			</v-col>
			<div
				class="avatars-custom-modal-main"
				:class="{ 'avatars-modal-open': showAvatarsModal }"
			>
				<div class="avatars-custom-modal-inner">
					<div class="avatars-custom-modal-wrap">
						<div class="avatars-pop-up-content-wrap">
							<div class="zatvori-ikona">
								<span style="cursor: pointer">
									<i
										class="fa-regular fa-circle-xmark"
										@click="closeAvatarsModal"
									></i>
								</span>
							</div>
							<div
								class="naslov-flex"
								align="center"
							>
								<h1 style="font-weight: 300; color: #445462; font-size: 2rem; margin: 0 0 20px 0">
									select your avatar
								</h1>
							</div>

							<v-row>
								<v-col
									v-for="avatar in avatars"
									:key="avatar.id"
									align="center"
									justify="center"
								>
									<img
										:src="avatar.imageUrl"
										alt="avatar"
										height="100px"
										width="100px"
										style="cursor: pointer"
										@click="handleAvatar(avatar.imageUrl)"
									/>
								</v-col>
							</v-row>
						</div>
					</div>
				</div>
				<div
					class="avatars-bg-overlay"
					@click="closeAvatarsModal"
				></div>
			</div>
		</v-row>

		<v-row
			justify="center"
			align="center"
		>
			<v-col
				xl="3"
				lg="4"
				md="5"
				sm="6"
			>
				<form @submit.prevent="register">
					<input
						v-model="username"
						type="text"
						class="form-control"
						placeholder="username"
					/>
					<p
						class="form-text text-muted ml-1"
						style="font-size: 12px"
					>
						Required
					</p>

					<input
						v-model="email"
						type="email"
						class="form-control"
						placeholder="email"
					/>
					<p
						class="form-text text-muted ml-1"
						style="font-size: 12px"
					>
						Required
					</p>

					<input
						v-model="password"
						type="password"
						class="form-control"
						placeholder="password"
					/>
					<p
						class="form-text text-muted ml-1"
						style="font-size: 12px"
					>
						Required
					</p>

					<v-col align="center">
						<v-btn
							class="mb-2 white--text"
							type="submit"
							color="#A2B29F"
						>
							Sign up
						</v-btn>
					</v-col>
					<p
						class="text-center"
						style="font-weight: 400"
					>
						Already have an account?
						<a
							href="/Login"
							style="color: #798777"
						>
							<strong>Sign in</strong></a
						>
					</p>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { Auth, Korisnik, Profile } from '@/services';

export default {
	name: 'Register',

	data() {
		return {
			username: '',
			email: '',
			password: '',
			avatars: [],
			showAvatarsModal: false,
			imageUrl:
				'https://firebasestorage.googleapis.com/v0/b/walk-it-4c57e.appspot.com/o/adminUploads%2FuserAvatars%2Fman%20(4).png?alt=media&token=67546634-3c33-4300-9a7a-9b8afeb0f43b',
		};
	},
	created() {
		this.getAvatars();
	},
	methods: {
		async register() {
			let success = await Auth.register(this.username, this.email, this.password, this.imageUrl);
			if (success == true) {
				this.$router.push({ name: 'Login' }); // Mozemo koristit this.$router.push("/home") jer smo u vuejs komponenti
			}
		},
		async getAvatars() {
			try {
				const response = await Profile.getAvatars();
				this.avatars = response;
			} catch (error) {
				console.error(error);
			}
		},
		handleAvatar(imageUrl) {
			this.imageUrl = imageUrl;
			this.closeAvatarsModal();
		},
		closeAvatarsModal() {
			this.showAvatarsModal = false;
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

.avatars-custom-modal-main {
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

.avatars-modal-open {
	z-index: 99999;
	opacity: 1;
	overflow: hidden;
}
.avatars-custom-modal-inner {
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
.avatars-custom-modal-wrap {
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
.avatars-modal-open .avatars-custom-modal-inner {
	-webkit-transform: translate(0, 0);
	-ms-transform: translate(0, 0);
	transform: translate(0, 0);
	position: relative;
	z-index: 999;
}
.avatars-modal-open .avatars-bg-overlay {
	background: rgba(0, 0, 0, 0.6);
	z-index: 99;
}
.avatars-bg-overlay {
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
	.avatars-custom-modal-main:before {
		content: '';
		display: inline-block;
		height: auto;
		vertical-align: middle;
		margin-right: -0px;
		height: 100%;
	}
}
@media screen and (max-width: 799px) {
	.avatars-custom-modal-inner {
		margin-top: 45px;
	}
}
</style>
