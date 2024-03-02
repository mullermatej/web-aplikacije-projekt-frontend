<template>
	<v-container class="mx-auto">
		<v-row align="center">
			<v-col
				align="right"
				lg="4"
				sm="6"
			>
				<img
					:src="imageUrl"
					alt="profileImage"
					width="130px"
					height="130px"
				/>
			</v-col>
			<v-col
				justify="center"
				align="left"
				lg="4"
				sm="6"
			>
				<p class="text-h5 text-uppercase font-weight-medium">
					{{ username }}
					<span class="text-h5"
						><i
							@click="showModal = true"
							style="cursor: pointer"
							class="fa-solid fa-pen-to-square ml-2 font-weight-thin"
						></i
					></span>
				</p>
			</v-col>
		</v-row>
		<div
			class="custom-model-main"
			:class="{ 'model-open': showModal }"
		>
			<div class="custom-model-inner">
				<div class="custom-model-wrap">
					<div class="pop-up-content-wrap">
						<div class="zatvori-ikona">
							<span style="cursor: pointer">
								<i
									class="fa-regular fa-circle-xmark"
									@click="showModal = false"
								></i>
							</span>
						</div>
						<div class="naslov-flex">
							<p class="text-h5 text-uppercase font-weight-medium">{{ username }}'s preferences</p>
						</div>

						<p class="text-uppercase text-subtitle-1 font-weight-medium mb-0">avatar</p>

						<div class="avatar-part">
							<div id="avatar-image">
								<img
									:src="imageUrl"
									alt=""
									width="150px"
									height="150px"
								/>
							</div>
							<div id="avatar-undertext">
								<v-btn
									class="mt-3 text-white text-caption"
									color="primary"
									@click="showAvatarsModal = true"
								>
									view avatars
								</v-btn>
							</div>
						</div>

						<p class="text-uppercase text-subtitle-1 font-weight-medium">info</p>
						<div class="personal-info">
							<form>
								<v-text-field
									v-model="changedUsername"
									type="text"
									class="text-subtitle-1 ma-0 pa-0"
									label="New username"
									style="width: 250px"
								>
								</v-text-field>

								<v-text-field
									v-model="changedEmail"
									type="text"
									class="text-subtitle-1 ma-0 pa-0"
									:label="userEmail"
									disabled
								>
								</v-text-field>

								<v-col
									justify="center"
									align="center"
								>
									<v-btn
										class="text-white text-caption"
										color="primary"
										@click="handleSaveButton(changedUsername, changedEmail)"
									>
										save new username
									</v-btn>
								</v-col>
							</form>
						</div>
						<p class="text-uppercase text-subtitle-1 font-weight-medium mt-8">change password</p>
						<div class="change-password">
							<form @submit.prevent="changePassword">
								<v-text-field
									v-model="oldPassword"
									type="password"
									class="text-subtitle-1 ma-0 pa-0"
									label="Old password"
									style="width: 250px"
									required
								>
								</v-text-field>

								<label for="exampleInputNewPassword1"></label>
								<v-text-field
									v-model="newPassword"
									type="password"
									class="text-subtitle-1 ma-0 pa-0"
									label="New password"
									style="width: 250px"
									required
								/>
								<v-col
									align="center"
									justify="center"
								>
									<v-btn
										class="text-white text-caption"
										type="submit"
										color="primary"
									>
										change password
									</v-btn>
								</v-col>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div
				class="bg-overlay"
				@click="showModal = false"
			></div>
		</div>
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
									@click="showAvatarsModal = false"
								></i>
							</span>
						</div>
						<div class="naslov-flex">
							<p class="text-h5 text-uppercase font-weight-medium">select your avatar</p>
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
									width="100px"
									height="100px"
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
				@click="showAvatarsModal = false"
			></div>
		</div>
	</v-container>
</template>

<script>
import { Auth, Korisnik, Profile } from '@/services';

export default {
	name: 'ProfileCard',
	data() {
		return {
			username: '',
			imageUrl: '',
			changedUsername: '',
			changedEmail: '',
			userEmail: '',
			showAvatarsModal: false,
			showModal: false,
			oldPassword: '',
			newPassword: '',
			avatars: [],
		};
	},
	created() {
		this.fetchUser();
		this.getAvatars();
	},
	methods: {
		fetchUser() {
			const username = Auth.state.username;
			Korisnik.getUser(username)
				.then((response) => {
					this.username = response.username;
					this.userEmail = response.email;
					this.imageUrl = response.imageUrl;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		handleSaveButton: function (changedUsername) {
			if (changedUsername == '' || changedUsername.length < 3) return false;
			const username = changedUsername.trim() !== '' ? changedUsername.trim() : this.username;

			Korisnik.updateUserInfo(Auth.state.username, username)
				.then((response) => {
					console.log('User info updated successfully:', response);
				})
				.catch((error) => {
					console.error('Error updating user info:', error);
				});
			const newUser = {
				token: Auth.getToken(),
				username: changedUsername,
			};
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify(newUser));
			window.location.reload();
		},
		async getAvatars() {
			try {
				const response = await Profile.getAvatars();
				this.avatars = response;
			} catch (error) {
				console.error(error);
			}
		},
		async changePassword() {
			let success = await Auth.changePassword(Auth.state.username, this.oldPassword, this.newPassword);
			console.log('Rezultat promjene lozinke ', success);
			if (success) {
				this.$router.go();
				alert('Password changed!');
			} else {
				alert('Please correctly enter your current password.');
			}
		},
		async handleAvatar(imageUrl) {
			this.imageUrl = imageUrl;
			try {
				await Korisnik.updateUserImage(this.username, imageUrl);
			} catch (e) {
				console.error(e);
			}
			this.showAvatarsModal = false;
		},
	},
};
</script>
<style scoped>
.naslov-flex {
	text-align: center;
}
.zatvori-ikona {
	text-align: right;
	margin: 0 0 0 0;
	font-size: 1rem;
}
.avatar-part {
	text-align: center;
}
.personal-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.change-password {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

/* Edit Profile Modal */
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
/* Avatars Modal */
.avatars-custom-modal-main {
	text-align: center;
	overflow: hidden;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
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
