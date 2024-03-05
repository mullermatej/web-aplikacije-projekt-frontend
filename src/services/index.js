import axios from 'axios';
import $router from '@/router';
// baseURL: 'http://localhost:3000/',
// baseURL: 'https://web-aplikacije-projekt-backend.onrender.com',
let Service = axios.create({
	baseURL: 'https://web-aplikacije-projekt-backend.onrender.com',
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
	async deleteCreatedPoint(username, pointName) {
		try {
			const response = await Service.delete(`/users/${username}/pointsOfInterest/${pointName}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteCreatedTag(username, tagValue) {
		try {
			const response = await Service.delete(`/users/${username}/tags/${tagValue}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteCreatedWalk(username, walkId) {
		try {
			const response = await Service.delete(`/users/${username}/walks/${walkId}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async getCreatedPoints(userId) {
		try {
			const response = await Service.get(`/users/${userId}/pointsOfInterest`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async getCreatedTags(userId) {
		try {
			const response = await Service.get(`/users/${userId}/tags`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async getCreatedWalks(userId) {
		try {
			const response = await Service.get(`/users/${userId}/walks`);
			return response.data;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw error;
		}
	},
	async addCreatedPoint(username, newPoint) {
		try {
			const response = await Service.post(`/users/${username}/pointsOfInterest`, newPoint);
			return response;
		} catch (error) {
			console.error('Error error:', error);
			throw error;
		}
	},
	async addCreatedTag(username, newTag) {
		try {
			const response = await Service.post(`/users/${username}/tags`, newTag);
			return response;
		} catch (error) {
			console.error('Error error:', error);
			throw error;
		}
	},
	async addCreatedWalk(username, newWalk) {
		try {
			const response = await Service.post(`/users/${username}/walks/`, newWalk);
			return response;
		} catch (error) {
			console.error('Error error:', error);
			throw error;
		}
	},
	async getUser(username) {
		try {
			const response = await Service.get(`/users/${username}`);
			return response.data;
		} catch (error) {
			console.error('Error getting user by ID:', error);
			throw error;
		}
	},
	async getFavourites(username) {
		try {
			const response = await Service.get(`/users/${username}/favourites`);
			return response.data;
		} catch (err) {
			console.error('Error fetching user by ID:', err);
			throw err;
		}
	},
	async updateUserInfo(username, newUsername) {
		try {
			const response = await Service.patch(`/users/${username}`, { newUsername });
			return response.data;
		} catch (error) {
			console.error('Error updating user info: ', error);
			throw error;
		}
	},
	async updateUserImage(username, imageUrl) {
		try {
			const response = await Service.patch(`/users/${username}/images`, { imageUrl });
			return response.data;
		} catch (error) {
			console.error('Error while trying to change user image: ', error);
			throw error;
		}
	},
	async addFavourite(username, walkId) {
		try {
			await Service.post(`/users/${username}/favourites/${walkId}`);
		} catch (err) {
			console.error('Error while adding route to favourites', err);
			throw err;
		}
	},
	async removeFavourite(username, walkId) {
		try {
			await Service.delete(`/users/${username}/favourites/${walkId}`);
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
		let response = await Service.get(`/walks`);
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
	async deletePoint(walkId, pointName) {
		try {
			const response = await Service.delete(`/walks/${walkId}/pointsOfInterest/${pointName}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteTag(walkId, tagValue) {
		try {
			const response = await Service.delete(`/walks/${walkId}/tags/${tagValue}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async deleteWalk(walkId) {
		try {
			const response = await Service.delete(`/walks/${walkId}`);
			return response;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async addPointOfInterest(walkId, newPointOfInterest) {
		try {
			const response = await Service.post(`/walks/${walkId}/pointsOfInterest`, newPointOfInterest);
			return response.data;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async getPointsOfInterest(walkId) {
		try {
			const response = await Service.get(`/walks/${walkId}/pointsOfInterest`);
			return response.data;
		} catch (error) {
			console.error('Error fetching points of interest:', error);
			throw error;
		}
	},
	async getRouteById(walkId) {
		try {
			const response = await Service.get(`/walks/${walkId}`);
			return response.data;
		} catch (error) {
			console.error('Error fetching route by ID:', error);
			throw error;
		}
	},
	async addRoute(walk) {
		try {
			const response = await Service.post(`/walks`, walk);
			return response;
		} catch (error) {
			console.error('Error while adding walk:', error);
			throw error;
		}
	},
	async addTag(walkId, tagName) {
		try {
			const response = await Service.post(`/walks/${walkId}/tags`, { tagName });
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
	async login(username, password) {
		let response = await Service.post('/auth', {
			username: username,
			password: password,
		});
		let user = response.data;
		localStorage.setItem('user', JSON.stringify(user));
		return true;
	},
	async register(username, email, password, imageUrl) {
		await Service.post('/users', {
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
	async changePassword(username, oldPassword, newPassword) {
		try {
			const response = await Service.patch(`/users/${username}/passwords`, {
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
