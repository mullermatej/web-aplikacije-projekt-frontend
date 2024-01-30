<template>
	<v-container class="mx-auto">
		<v-img
			width="100%"
			height="300"
			cover
			class="mx-auto"
			src="https://firebasestorage.googleapis.com/v0/b/walk-it-4c57e.appspot.com/o/IMG_2331.jpeg?alt=media&token=cd29005b-3f3a-4623-ae4c-55bd421b3688"
		></v-img>
		<p class="text-h4 text-center mt-4 mb-0">Route name</p>
		<p class="text-subtitle-2 text-center mt-0 mb-4">Pula, Croatia</p>
		<p class="text-h5">Description</p>
		<p class="text-subtitle-1">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi veniam nam ut dolorem nesciunt mollitia
			error quaerat blanditiis magni deserunt dicta reiciendis iusto, reprehenderit vel at praesentium expedita in
			debitis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, harum temporibus quibusdam autem
			dicta quas rem tempore aliquam voluptatem quaerat numquam, ex nobis commodi sapiente velit libero obcaecati
			voluptatum illo. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius explicabo repellat quo neque
			delectus quisquam ab quasi, iusto tempore nemo quis illum ea temporibus animi debitis. Eveniet, laboriosam?
			Esse, sint.
		</p>

		<p class="text-h5">Route tags</p>

		<v-item-group
			multiple
			class="mb-8"
		>
			<v-item class="ml-1 mr-1">
				<v-chip> Accessible for dogs </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> Runnable </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> Marathonable </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> All ages </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> Open all year </v-chip>
			</v-item>
		</v-item-group>

		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4307.869034324168!2d13.816500085851898!3d44.86046234540872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477cd2de09337b6d%3A0x72324a3a7b4e580d!2sPula!5e0!3m2!1shr!2shr!4v1706478201121!5m2!1shr!2shr"
			width="100%"
			height="400"
			style="border: 0"
			allowfullscreen="true"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</v-container>
</template>
