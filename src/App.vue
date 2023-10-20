<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'

interface Form {
  productName: string;
  price: string;
  description: string;
  image: string;
  category: string;
  barcode: string;
}

const drawer = ref(false)
const decodedText = ref("");
const form: Form = reactive({
  productName: '',
  price: '',
  description: '',
  image: '',
  category: '',
  barcode: ''
})
const getAllProduct = getAllProducts()
const screenPage = ref(0)


function onDecode(text: string) {
  decodedText.value = text
  form.barcode = text
}
function onLoaded() {
  console.log("loaded");
}
function submitProduct() {
  // check local storage
  if (localStorage.getItem('productsTangkapHarga')) {
    const products = JSON.parse(localStorage.getItem('productsTangkapHarga')!)
    products.push(form)
    localStorage.setItem('productsTangkapHarga', JSON.stringify(products))
  } else {
    const products = []
    products.push(form)
    localStorage.setItem('productsTangkapHarga', JSON.stringify(products))
  }

  form.productName = ''
  form.price = ''
  form.description = ''
  form.image = ''
  form.category = ''
  form.barcode = ''

  decodedText.value = ''
}
function getAllProducts() {
  return JSON.parse(localStorage.getItem('productsTangkapHarga')!)
}
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
          <v-list-item
            prepend-icon="fas fa-tachometer-alt"
            title="Dashboard"
            value="dashboard"
            @click="screenPage = 0"></v-list-item>
          <v-list-item
            prepend-icon="fas fa-images"
            title="All Product"
            value="all-product"
            @click="screenPage = 1"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="h-100" style="min-height: 100vh;">
        <v-card-text v-if="!decodedText && screenPage === 0">
          Selamat datang ke Tangkap Harga, sila benarkan aplikasi ini menggunakan kamera.
          <v-divider class="my-4"></v-divider>
          <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
        </v-card-text>
        <v-container v-else-if="decodedText && screenPage === 0">
          <p>Sila isi borang dibawah dengan jujur. Terima Kasih</p>
          <v-card variant="outlined" style="margin-top: 20px;">
            <v-card-title>Details Produk</v-card-title>
            <v-card-text>
              <v-text-field label="Barcode Number" v-model="form.barcode" variant="outlined" readonly></v-text-field>
              <v-text-field label="Nama Produk" v-model="form.productName" variant="outlined"></v-text-field>
              <v-text-field label="Harga" v-model="form.price" variant="outlined"></v-text-field>
              <v-text-field label="Penerangan Produk" v-model="form.description" variant="outlined"></v-text-field>
              <v-text-field label="Kategori" v-model="form.category" variant="outlined"></v-text-field>

              <v-btn block color="primary" @click="submitProduct">Simpan</v-btn>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container v-if="screenPage === 1">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nama Produk
                </th>
                <th class="text-left">
                  Harga (RM)
                </th>
                <th>
                  Kategori
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getAllProduct" :key="item.productName">
                <td>{{ item.productName }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.category }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
