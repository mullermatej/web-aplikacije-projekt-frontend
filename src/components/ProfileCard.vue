<template>
	<v-container class="mx-auto">
		<header
			class="container"
			style="margin-top: 40px; padding-bottom: 20px"
		>
			<img
				:src="imageUrl"
				alt="profileImage"
				width="150px"
				height="150px"
			/>

			<div class="user-info">
				<h1 id="naslov-korisnikovog-profila">
					{{ username }}
					<button
						type="button"
						id="follow-button"
						class="btn btn-outline btn-sm ml-4"
						@click="openModel"
					>
						<span>edit</span>
						<i class="fa-solid fa-pen-to-square ml-1"></i>
					</button>
				</h1>
				<!-- <span @click="openFollowersModal">
					<p style="font-weight: 400; text-align: left">
						<span style="cursor: pointer">FOLLOWERS: <strong>3</strong> </span>
					</p>
				</span> -->
			</div>

			<!-- Edit profile modal -->
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
										@click="closeModel"
									></i>
								</span>
							</div>
							<div class="naslov-flex">
								<h1 style="font-weight: 300; color: #445462; font-size: 2.5rem; margin: 0 0 0 0">
									{{ username }}'s preferences
								</h1>
							</div>
							<div class="titles-text">avatar</div>
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
									<!-- <button
										id="avatar-button"
										type="button"
										class="btn btn-md my-3 mr-2"
										style="font-family: 'Alegreya Sans SC', sans-serif"
										@click="openAvatarsModal"
									>
										change avatar
									</button> -->
									<v-btn
										class="mt-3 text-white"
										color="#798776"
										@click="openAvatarsModal"
									>
										change avatar
									</v-btn>
								</div>
							</div>
							<div class="titles-text">info</div>
							<div class="personal-info">
								<form>
									<div>
										<input
											v-model="changedUsername"
											type="text"
											class="form-control"
											:placeholder="username"
											style="width: 300px"
										/>
										<p
											class="form-text text-muted ml-1"
											style="font-size: 12px"
										>
											not required
										</p>
									</div>

									<div>
										<input
											v-model="changedEmail"
											type="text"
											class="form-control"
											:placeholder="userEmail"
										/>
										<p
											class="form-text text-muted ml-1"
											style="font-size: 12px"
										>
											not required
										</p>
									</div>
									<div class="password-submit-center">
										<!-- <button
											id="user-info-popup-save"
											type="button"
											class="btn"
											@click="handleSaveButton(changedUsername, changedEmail)"
										>
											spremi
										</button> -->
										<v-btn
											class="text-white"
											color="#798776"
											@click="handleSaveButton(changedUsername, changedEmail)"
										>
											save info
										</v-btn>
									</div>
								</form>
							</div>
							<div class="titles-text">change password</div>
							<div class="change-password">
								<form @submit.prevent="changePassword">
									<div class="form-password-change">
										<label for="exampleInputOldPassword1"></label>
										<input
											v-model="oldPassword"
											type="password"
											class="form-control"
											id="exampleInputOldPassword1"
											placeholder="old password"
											style="width: 300px"
										/>
										<p
											id="passwordHelpBlock"
											class="form-text text-muted ml-1"
										>
											required
										</p>
									</div>
									<div class="form-password-change">
										<label for="exampleInputNewPassword1"></label>
										<input
											v-model="newPassword"
											type="password"
											class="form-control"
											id="exampleInputNewPassword1"
											placeholder="new password"
											style="width: 300px"
										/>
										<p
											id="passwordHelpBlock"
											class="form-text text-muted ml-1"
										>
											required
										</p>
									</div>
									<div class="password-submit-center">
										<!-- <button
											id="change-password-popup"
											type="submit"
											class="btn"
										>
											change
										</button> -->
										<v-btn
											class="text-white"
											type="submit"
											color="#798776"
										>
											change
										</v-btn>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div
					class="bg-overlay"
					@click="closeModel"
				></div>
			</div>

			<!-- AvatarsModal -->
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
							<div class="naslov-flex">
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
					@click="closeAvatarsModal"
				></div>
			</div>
		</header>
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
			showFollowersModal: false,
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
		handleSaveButton: function (changedUsername, changedEmail) {
			if (changedUsername == '' && changedEmail == '') return false;

			let userUpdates = {
				email: changedEmail.trim() !== '' ? changedEmail.trim() : this.userEmail,
				username: changedUsername.trim() !== '' ? changedUsername.trim() : this.username,
			};

			Korisnik.updateUserInfo(Auth.state.username, userUpdates)
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
			let success = await Auth.changePassword(this.oldPassword, this.newPassword);
			console.log('Rezultat promjene lozinke ', success);
			if (success) {
				this.$router.push({ name: 'Home' });
				alert('Password changed successfully!');
			} else {
				alert('Wrong password or an error occurred.');
			}
		},
		async handleAvatar(imageUrl) {
			this.imageUrl = imageUrl;

			let userUpdates = {
				imageUrl: imageUrl,
			};

			// updateaj korisnika sa patch, zamijeni mu imageUrl sa ovim
			let success = await Korisnik.updateUserImage(this.username, userUpdates);
			if (success) {
				console.log('User image changed successfully');
			} else {
				console.log('Error while changing user image');
			}

			this.showAvatarsModal = false;
		},
		openModel() {
			this.showModal = true;
		},
		openAvatarsModal() {
			this.showAvatarsModal = true;
		},
		closeModel() {
			this.showModal = false;
		},
		closeAvatarsModal() {
			this.showAvatarsModal = false;
		},
	},
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
	font-weight: 300;
	margin-top: 30px;
	color: #445462;
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
.avatar-images {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 0 0 0;
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
/* Edit Profile Modal kraj */
/* Avatars Modal */
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
.avatar-selection img {
	width: 100px;
	height: 100px;
	margin: 20px 10px 10px 10px;
}
/* Avatars Modal kraj */
</style>
