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

let Korisnik = {
    async dohvatiKorisnika(korisnikId) {
        try {
            const response = await Service.get(`/korisnici/${korisnikId}`);
            console.log('Tu sam', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },
};

let Rute = {
    // Fetch all routes from the database
    async getAll() {
        console.log('Fetching routes from the database...');
        let response = await Service.get(`/rute`);
        let data = response.data;
        console.log(response.data);

        // Remap the data if necessary
        let routes = data.map((doc) => {
            return {
                id: doc._id,
                name: doc.name,
                description: doc.description,
                distance: doc.distance,
                duration: doc.duration,
                difficulty: doc.difficulty,
            };
        });
        return routes;
    },
    async getRouteById(routeId) {
        console.log('Pozivam fju iz services');
        try {
            const response = await Service.get(`/rute/${routeId}`);
            console.log('Povratna info o ruti: ', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching route by ID:', error);
            throw error;
        }
    },
};

// Definiranje metoda za komunikaciju sa backend-om, za sad samo login
let Auth = {
    async login(username, password, firstName, lastName) {
        let response = await Service.post('/auth', {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    async register(username, password, firstName, lastName) {
        let response = await Service.post('/korisnici', {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });

        let user = response.data;
        // Ne zelimo spremiti usera u local storage jer se samo nakon logina spremaju podaci u local storage
        // Kada se napravi register, usera treba preusmjeriti na login stranicu

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
        return JSON.parse(localStorage.getItem('user'));
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
        get userEmail() {
            let user = Auth.getUser();
            if (user) {
                return user.username;
            }
        },
    },
};

export { Auth, Rute, Korisnik };
