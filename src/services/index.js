import axios from 'axios';
import $router from '@/router';

// Kreiranje instance axios-a za komunikaciju sa backend-om
let Service = axios.create({
	baseURL: 'http://localhost:3000', // Za lakse mijenjanje kad se publisha
	timeout: 1000, // Cekaj 1 sekundu na odgovor od backenda
});

// prije svakog poslanog requesta na backend izvrši:
Service.interceptors.request.use((request) => {
	try {
		request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
	} catch (e) {
		console.error(e);
	}
	return request;
});
// Isto se poziva i nakon svakog requesta, ali samo ako je doslo do greske
Service.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401 || error.response.status === 403) {
			alert('Uneseni podaci nisu ispravni!');
			// 401 Unauthorized, 403 Forbidden (nema prava)
			Auth.logout(); // Brisanje tokena iz local storage-a
			$router.go(); // Refreshanje stranice
		}
	}
);

// Zadnje sam dodao service2, vjerojatno rijesit korjen problema, da se ne spremaju podaci u test bazu nego u walk_it od starta

let Korisnik = {
	async getCreatedWalks(userId) {
		try {
			const response = await Service.get(`/${userId}/createdWalks`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async getUser(username) {
		try {
			const response = await Service.get(`/${username}`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async getFavourites(username) {
		try {
			const response = await Service.get(`/favourites/${username}`);
			return response.data;
		} catch (err) {
			console.error('Error fetching user by ID:', err);
			throw err;
		}
	},
	async updateUserInfo(username, updates) {
		try {
			const response = await Service.patch(`/korisnici/${username}`, updates);
			return response.data;
		} catch (error) {
			console.error('Error updating user info: ', error);
			throw error;
		}
	},
	async updateUserImage(username, updates) {
		try {
			const response = await Service.patch(`/updateImage/${username}`, updates);
			return response.data;
		} catch (error) {
			console.error('Error while trying to change user image: ', error);
			throw error;
		}
	},
	async addFavourite(username, updates) {
		try {
			const response = await Service.patch(`/favourite/${username}`, updates);
		} catch (err) {
			console.error('Error while adding route to favourites', err);
			throw err;
		}
	},
	async removeFavourite(username, updates) {
		try {
			const response = await Service.patch(`/removeFavourite/${username}`, updates);
		} catch (err) {
			console.error('Error while removing route from favourites', err);
			throw err;
		}
	},
};

let Profile = {
	async getAvatars() {
		let response = await Service.get('/avatars');
		let data = response.data;

		let avatars = data.map((doc) => {
			return {
				id: doc._id,
				name: doc.name,
				imageUrl: doc.imageUrl,
			};
		});
		return avatars;
	},
};

let Rute = {
	// Fetch all routes from the database
	async getAll() {
		let response = await Service.get(`/rute`);
		let data = response.data;

		// Remapiranje podataka iz baze u oblik koji zelim
		let routes = data.map((doc) => {
			return {
				id: doc._id,
				name: doc.name,
				description: doc.description,
				distance: doc.distance,
				duration: doc.duration,
				difficulty: doc.difficulty,
				location: doc.location,
				visited: doc.visited,
				imageUrl: doc.imageUrl,
				startingPosition: doc.startingPosition,
				coordinates: doc.coordinates,
			};
		});
		return routes;
	},
	async addPointOfInterest(routeId, newPointOfInterest) {
		try {
			const response = await Service.patch(`/pointsOfInterest/${routeId}`, newPointOfInterest);
			return response.data;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async getPointsOfInterest(routeId) {
		try {
			const response = await Service.get(`/pointsOfInterest/${routeId}`);
			return response.data;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async getRouteById(routeId) {
		try {
			const response = await Service.get(`/rute/${routeId}`);
			return response.data;
		} catch (error) {
			console.error('Error fetching route by ID:', error);
			throw error;
		}
	},
	async addRoute(route) {
		try {
			const response = await Service.post(`/addRoute`, route);
			return response;
		} catch (error) {
			console.error('Error while adding route:', error);
			throw error;
		}
	},
	async addTag(routeId, updates) {
		try {
			const response = await Service.patch(`/rute/${routeId}/addTag`, updates);
			return response;
		} catch (error) {
			console.error('Error while adding new tag:', error);
			throw error;
		}
	},
	async getImage() {
		try {
			const response = await Service.get(`/image`);
			console.log('Povratna info slikama 3.10.23: ', response.data);

			return response.data;
		} catch (error) {
			console.error('Error fetching route by ID 3.10.23:', error);
			throw error;
		}
	},
};

// Definiranje metoda za komunikaciju sa backend-om, za sad samo login
let Auth = {
	async login(username, email, password) {
		let response = await Service.post('/auth', {
			username: username,
			email: email,
			password: password,
		});

		let user = response.data;

		localStorage.setItem('user', JSON.stringify(user));
		// localStorage.setItem('userEmail', user.username);

		return true;
	},

	async register(username, email, password, imageUrl) {
		let response = await Service.post('/korisnici', {
			username: username,
			email: email,
			password: password,
			imageUrl: imageUrl,
			favourites: [],
			createdWalks: [],
			createdTags: [],
			createdPoints: [],
		});

		return true;
	},

	// Potrebno je bilo staviti return response da funkcionira tocna i kriva izmjena lozinke
	async changePassword(oldPassword, newPassword) {
		try {
			const response = await Service.patch('/korisnici', {
				old_password: oldPassword,
				new_password: newPassword,
			});
			return response; // Return the actual response status from the backend
		} catch (error) {
			console.error('An error occurred:', error);
			return false; // Return false when there's an error
		}
	},
	logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('koordinate');
	},
	// Dohvati usera iz local storage-a
	getUser() {
		if (localStorage.getItem('user') === null) {
			return false;
		} else {
			return JSON.parse(localStorage.getItem('user'));
		}
	},
	// Dohvati token iz local storage-a
	getToken() {
		let user = Auth.getUser();
		if (user && user.token) {
			return user.token;
		} else {
			return false;
		}
	},
	// Pomocna metoda za provjeru da li je user ulogiran
	authenticated() {
		let user = Auth.getUser();
		if (user && user.token) {
			// Ako user postoji i ima token (strozija provjera) onda vrati true
			return true;
		}
		return false;
	},
	// Pomocna metoda za dohvacanje userovog emaila
	state: {
		// get pretvara atribut  u funkciju ali se on i dalje moze citat sa ... kao atribut, insane
		get authenticated() {
			return Auth.authenticated();
		},
		// Upute za koristenje:
		// 1. auth: Auth.state je ubacen u app.vue, vj treba i u ostale komponente
		// 2. pozvati {{ auth.userEmail }} u template-u i to dohvaca korisnikov email
		get username() {
			let user = Auth.getUser();
			if (user) {
				return user.username;
			}
		},
	},
};

export { Auth, Rute, Korisnik, Profile };
