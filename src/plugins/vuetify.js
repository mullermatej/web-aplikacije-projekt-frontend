import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#929A9D',
				secondary: '#007DFE',
				accent: '#7BB1FF',
			},
		},
	},
});
