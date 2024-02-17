import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#798777',
				secondary: '#A2B29F',
				accent: '#BDD2B6',
			},
		},
	},
});
