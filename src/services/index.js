import axios from 'axios';
import $router from '@/router';

let Service = axios.create({
	baseURL: 'https://web-aplikacije-projekt-backend.onrender.com/',
	timeout: 1000,
});

Service.interceptors.request.use((request) => {
	try {
		request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
	} catch (e) {
		console.error(e);
	}
	return request;
});
Service.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401 || error.response.status === 403) {
			alert('Incorrect information');
			Auth.logout();
			$router.go();
		}
	}
);

let Korisnik = {
	async deleteCreatedPoint(username, pointObject) {
		try {
			const response = await Service.patch(`/deleteCreatedPoint/${username}`, pointObject);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteCreatedTag(username, tagObject) {
		try {
			const response = await Service.patch(`/deleteCreatedTag/${username}`, tagObject);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteCreatedWalk(username, walkId) {
		try {
			const response = await Service.delete(`/deleteCreatedWalk/${username}/${walkId}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async getCreatedPoints(userId) {
		try {
			const response = await Service.get(`/${userId}/createdPoints`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async getCreatedTags(userId) {
		try {
			const response = await Service.get(`/${userId}/createdTags`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async getCreatedWalks(userId) {
		try {
			const response = await Service.get(`/${userId}/createdWalks`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async addCreatedPoint(username, newPoint) {
		try {
			const response = await Service.patch(`/${username}/addCreatedPoint`, newPoint);
			return response;
		} catch (error) {
			console.error('Error error:', error);
			throw error;
		}
	},
	async addCreatedTag(username, newTag) {
		try {
			const response = await Service.patch(`/${username}/addCreatedTag`, newTag);
			return response;
		} catch (error) {
			console.error('Error error:', error);
			throw error;
		}
	},
	async addCreatedWalk(username, newRoute) {
		try {
			const response = await Service.patch(`/${username}/addCreatedWalk`, newRoute);
			return response;
		} catch (error) {
			console.error('Error error:', error);
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
	async getAll() {
		let response = await Service.get(`/rute`);
		let data = response.data;
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
	async deletePoint(walkId, pointObject) {
		try {
			const response = await Service.patch(`/deletePoint/${walkId}`, pointObject);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteTag(walkId, tagObject) {
		try {
			const response = await Service.patch(`/deleteTag/${walkId}`, tagObject);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteWalk(walkId) {
		try {
			const response = await Service.delete(`/deleteWalk/${walkId}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
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

let Auth = {
	async login(username, email, password) {
		let response = await Service.post('/auth', {
			username: username,
			email: email,
			password: password,
		});
		let user = response.data;
		localStorage.setItem('user', JSON.stringify(user));
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
	async changePassword(oldPassword, newPassword) {
		try {
			const response = await Service.patch('/korisnici', {
				old_password: oldPassword,
				new_password: newPassword,
			});
			return response;
		} catch (error) {
			console.error('An error occurred:', error);
			return false;
		}
	},
	logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('koordinate');
	},
	getUser() {
		if (localStorage.getItem('user') === null) {
			return false;
		} else {
			return JSON.parse(localStorage.getItem('user'));
		}
	},
	getToken() {
		let user = Auth.getUser();
		if (user && user.token) {
			return user.token;
		} else {
			return false;
		}
	},
	authenticated() {
		let user = Auth.getUser();
		if (user && user.token) {
			return true;
		}
		return false;
	},
	state: {
		get authenticated() {
			return Auth.authenticated();
		},
		get username() {
			let user = Auth.getUser();
			if (user) {
				return user.username;
			}
		},
	},
};

export { Auth, Rute, Korisnik, Profile };
