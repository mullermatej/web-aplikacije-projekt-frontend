<template>
	<!-- FollowersModal -->
	<div
		class="followers-custom-modal-main"
		:class="{ 'followers-modal-open': showFollowersModal }"
	>
		<div class="followers-custom-modal-inner">
			<div class="followers-custom-modal-wrap">
				<div class="followers-pop-up-content-wrap">
					<div class="zatvori-ikona">
						<span style="cursor: pointer">
							<i
								class="fa-regular fa-circle-xmark"
								@click="closeFollowersModal"
							></i>
						</span>
					</div>
					<div class="naslov-flex">
						<h1 style="font-weight: 300; color: #445462; font-size: 2rem; margin: 0 0 20px 0">
							Followers (3)
						</h1>
					</div>
					<div>
						<div class="follower">
							<h3>
								<img
									src="@/assets/woman (5).png"
									alt=""
								/>

								<span
									><a
										href="/profile/6513308bbb17c5e3afba7e2a"
										style="color: #445462"
										>Ivana Ivić</a
									></span
								>
							</h3>
							<button
								id="follow-button"
								type="button"
								class="btn btn-outline btn-sm"
							>
								Follow
							</button>
						</div>
						<div class="follower">
							<h3>
								<img
									src="@/assets/woman (7).png"
									alt=""
								/>

								<span>Ana Anić</span>
							</h3>
							<button
								id="follow-button"
								type="button"
								class="btn btn-outline btn-sm"
							>
								Follow
							</button>
						</div>
						<div class="follower">
							<h3>
								<img
									src="@/assets/man (6).png"
									alt=""
								/>

								<span>Andrija Andrić</span>
							</h3>
							<button
								id="follow-button"
								type="button"
								class="btn btn-outline btn-sm"
							>
								Following
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="followers-bg-overlay"
			@click="closeFollowersModal"
		></div>
	</div>
</template>

<script>
export default {
	name: 'FollowersCard',
	methods: {
		openFollowersModal() {
			this.showFollowersModal = true;
		},
		closeFollowersModal() {
			this.showFollowersModal = false;
		},
	},
};
</script>
