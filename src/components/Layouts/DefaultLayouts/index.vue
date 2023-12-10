<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = ref(false)
</script>

<template>
    <v-card>
        <v-layout>
            <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

            <v-app-bar color="primary" prominent>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>Tangkap Harga</v-toolbar-title>

                <v-spacer></v-spacer>
            </v-app-bar>

            <v-navigation-drawer v-model="drawer" location="bottom" temporary>
                <v-list>
                    <v-list-item @click="router.push({ name: 'Home' })" prepend-icon="fas fa-tachometer-alt" title="Dashboard" value="dashboard"></v-list-item>
                    <v-list-item @click="router.push({ name: 'Product' })" prepend-icon="fas fa-images" title="All Product" value="all-product"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main class="h-100" style="min-height: 100vh;">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped>
</style>