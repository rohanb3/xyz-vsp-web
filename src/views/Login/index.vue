<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 blue darken-4">
          <v-toolbar-title class="white--text">
            <h4>{{ $t("Welcome Back") }}</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your username"
                  v-model="userName"
                  :rules="userNameRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn
                    @click="submit"
                    :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                  >{{ $t("Login") }}</v-btn>
                  <a href>{{ $t("Forgot Password") }}</a>
                </v-layout>
              </v-form>
              <v-snackbar v-model="snackbar" :timeout="5000">
                {{ $t("User wasn't found") }}.
                <v-btn dark flat @click="snackbar = false">{{ $t("Close") }}</v-btn>
              </v-snackbar>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script src="./Login.js"/>
<style scoped lang="scss" src="./Login.scss"/>
