<template>
	<v-main>
		<section>
			<img
				id="home"
				src="@/assets/plz.jpg"
				alt="image"
			/>
		</section>

		<section>
			<div class="centerElementsDiv">
				<h1 class="centerElementsDiv-H1">Walk it</h1>
				<h3
					class="h3Subtitle"
					style="text-align: center"
				>
					The local point of view
				</h3>
			</div>
		</section>

		<section>
			<div
				class="container"
				style="max-width: 85%"
			>
				<section>
					<div class="kocke">
						<div class="kocka1">
							<div class="kocka1_content">
								<div
									class="container-fluid"
									style="max-width: 60%"
								>
									<h1 style="font-size: 3.5rem; color: #445462">Start exploring routes</h1>
									<p></p>
									<p style="font-size: 1.2rem; color: #445462">
										I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or
										double click me to add your own content and make changes to the font. I’m a great place for you to
										tell a story and let your users know a little more about you.
									</p>
								</div>
							</div>
						</div>
						<div class="kocka2">
							<div class="kocka2_content">
								<div class="container">
									<i
										class="fa-solid fa-route"
										style="color: #a2b29f; font-size: 390px"
									></i>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div class="kocke">
						<div class="kocka4">
							<div class="kocka4_content">
								<div class="container">
									<i
										class="fa-solid fa-tree"
										style="color: #798777; font-size: 390px"
									></i>
								</div>
							</div>
						</div>
						<div class="kocka3">
							<div class="kocka3_content">
								<div
									class="container-fluid"
									style="max-width: 60%"
								>
									<h1 style="font-size: 3.5rem; color: #445462">Find places to rest in nature</h1>
									<p></p>
									<p style="font-size: 1.2rem; color: #445462">
										I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or
										double click me to add your own content and make changes to the font. I’m a great place for you to
										tell a story and let your users know a little more about you.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div class="kocke">
						<div class="kocka1">
							<div class="kocka1_content">
								<div
									class="container-fluid"
									style="max-width: 60%"
								>
									<h1 style="font-size: 3.5rem; color: #445462">On route location tracking</h1>
									<p></p>
									<p style="font-size: 1.2rem; color: #445462">
										I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or
										double click me to add your own content and make changes to the font. I’m a great place for you to
										tell a story and let your users know a little more about you.
									</p>
								</div>
							</div>
						</div>
						<div class="kocka2">
							<div class="kocka2_content">
								<div class="container">
									<i
										class="fa-solid fa-location-arrow"
										style="color: #a2b29f; font-size: 390px"
									></i>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</section>

		<section style="margin-top: 4rem">
			<div class="container">
				<div class="pravokutnik_content">
					<div>
						<h1 style="font-size: 3.5rem; color: #445462">Express your profile</h1>
						<p style="font-size: 1.2rem; color: #445462">
							Choose from a variety of avatars and style your profile page
						</p>
					</div>
					<div
						class="container"
						style="max-width: 70%"
					>
						<div class="avatars">
							<img
								src="@/assets/woman.png"
								alt=""
							/>
							<img
								src="@/assets/man.png"
								alt=""
							/>
							<img
								src="@/assets/woman (1).png"
								alt=""
							/>
							<img
								src="@/assets/man (2).png"
								alt=""
							/>
							<img
								src="@/assets/woman (2).png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</v-main>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			mojeKoordinate: {
				latitude: null,
				longitude: null,
			},
		};
	},
	mounted() {},
	methods: {},
};
</script>

<style scoped>
main {
	font-family: 'Alegreya Sans SC', sans-serif;
	background-color: #fffefb;
}

#heroImage {
	width: 100%;
	height: 100%;
}

.centerElementsDiv {
	position: absolute;
	top: 15%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.centerElementsDiv-H1 {
	font-family: 'Borel', cursive;
	--text-opacity: 1;
	color: rgba(255, 255, 255, var(--text-opacity));
	font-size: 11rem;
	line-height: 0;
	text-shadow: 0 2px 18px rgba(0, 0, 0, 0.2);
}

.h3Subtitle {
	font-family: 'Caveat', cursive;
	--text-opacity: 1;
	color: rgba(255, 255, 255, var(--text-opacity));
	font-size: 4.5rem;
	line-height: 1;
	text-shadow: 0 2px 18px rgba(0, 0, 0, 0.2);
}

.kocke {
	display: flex;
}
.kocka1 {
	width: 50%;
	height: 600px;
}

.kocka1_content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	text-align: left;
	/* background-color: #798777; */
}

.kocka2 {
	width: 50%;
	height: 600px;
}

.kocka2_content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	text-align: center;
}

.kocka3 {
	width: 50%;
	height: 600px;
}

.kocka3_content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	text-align: left;
	/* background-color: #798777; */
}

.kocka4 {
	width: 50%;
	height: 600px;
}

.kocka4_content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	text-align: center;
}

.pravokutnik_content {
	text-align: center;
}

.avatars {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 3rem 0rem;
}

.avatars img {
	width: 200px;
	height: 200px;
}
</style>
