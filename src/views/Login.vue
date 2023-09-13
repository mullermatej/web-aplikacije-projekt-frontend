<template>
    <v-main>
        <section class="container">
            <div>
                <h1 class="naslov">Walk it</h1>
                <h1
                    class="text-center mb-13"
                    style="
                        margin-top: 80px;
                        font-family: 'Alegreya Sans SC', sans-serif;
                        font-weight: 700;
                        color: #a2b29f;
                    "
                >
                    Log in
                </h1>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email (test@gmail.com)"
                        />
                        <p
                            class="form-text text-muted ml-1"
                            style="font-size: 12px"
                        >
                            Required
                        </p>
                    </div>
                    <div class="form-group my-3">
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password (1234)"
                        />
                        <p
                            class="form-text text-muted ml-1"
                            style="font-size: 12px"
                        >
                            Required
                        </p>
                    </div>
                    <div class="col-md-12 text-center">
                        <button type="submit" class="btn my-4">Log in</button>
                        <p style="font-weight: 400">
                            Don't have an account?
                            <a href="/Register" style="color: #798777">
                                <strong>Sign up</strong></a
                            >
                        </p>
                    </div>
                </form>
            </div>
        </section>
    </v-main>
</template>

<script>
import { Auth } from '@/services';

export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        };
    },

    methods: {
        async login() {
            let success = await Auth.login(
                this.email,
                this.password,
                this.firstName,
                this.lastName
            );
            console.log('Rezultat prijave ', success);

            if (success == true) {
                this.$router.push({ name: 'FirstTimePage' }); // Mozemo koristit this.$router.push("/home") jer smo u vuejs komponenti
            }
        },
        prebaci() {
            this.$router.push({ name: 'ChangePassword' });
        },
    },
};
</script>

<style scoped>
#changePassword:hover {
    cursor: pointer;
}

main {
    background-color: #fffefb;
    font-family: 'Alegreya Sans SC', sans-serif;
    font-weight: 700;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 1100px;
    width: 50%;
}

.naslov {
    font-family: 'Borel', cursive;
    font-size: 11rem;
    line-height: 0;
    color: #bdd2b6;
}

.btn {
    background-color: #798777;
    color: #fff;
    width: 350px;
}

@media (max-width: 1315px) {
    .naslov {
        font-size: 6rem;
    }
    .container {
        height: 900px;
    }
}
</style>
