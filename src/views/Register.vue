<template>
    <v-main>
        <section class="container">
            <div>
                <h1
                    class="text-center mb-13"
                    style="
                        margin-top: 80px;
                        font-family: 'Alegreya Sans SC', sans-serif;
                        font-weight: 700;
                        color: #a2b29f;
                    "
                >
                    Sign up
                </h1>
                <div id="avatar-image">
                    <a href=""><img src="@/assets/man (1).png" alt="" /></a>
                </div>
                <div id="avatar-undertext">
                    <p class="my-5">Choose your avatar</p>
                </div>

                <form @submit.prevent="register">
                    <div class="form-group">
                        <input
                            v-model="firstName"
                            type="text"
                            class="form-control"
                            id="exampleInputFirstName1"
                            placeholder="Enter your first name"
                        />
                        <p
                            class="form-text text-muted ml-1"
                            style="font-size: 12px"
                        >
                            Required
                        </p>
                    </div>
                    <div class="form-group">
                        <input
                            v-model="lastName"
                            type="text"
                            class="form-control"
                            id="exampleInputLastName1"
                            placeholder="Enter your last name"
                        />
                        <p
                            class="form-text text-muted ml-1"
                            style="font-size: 12px"
                        >
                            Required
                        </p>
                    </div>
                    <div class="form-group">
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <p
                            class="form-text text-muted ml-1"
                            style="font-size: 12px"
                        >
                            Required
                        </p>
                    </div>
                    <div class="form-group">
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                        <p
                            class="form-text text-muted ml-1"
                            style="font-size: 12px"
                        >
                            Required
                        </p>
                    </div>
                    <div class="col-md-12 text-center">
                        <button type="submit" class="btn my-2">Sign up</button>
                        <p style="font-weight: 400">
                            Already have an account?
                            <a href="/Login" style="color: #798777">
                                <strong>Sign in</strong></a
                            >
                        </p>
                        <p style="font-weight: 400">
                            By continuing, you agree to Walk It
                            <strong>Terms of Use</strong> and confirm that you
                            have read its <strong>Privacy Policy.</strong>
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
    name: 'Register',

    data() {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        };
    },

    methods: {
        async register() {
            let success = await Auth.register(
                this.email,
                this.password,
                this.firstName,
                this.lastName
            );
            console.log('Rezultat registracije ', success);

            if (success == true) {
                this.$router.push({ name: 'Login' }); // Mozemo koristit this.$router.push("/home") jer smo u vuejs komponenti
            }
        },
    },
};
</script>

<style scoped>
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
    height: 100%;
    width: 50%;
}

#avatar-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

#avatar-image img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

#avatar-undertext {
    /* background-color: #a2b29f; */
    text-align: center;
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

.form-group {
    margin: 20px 0px 20px 0px;
}
</style>
