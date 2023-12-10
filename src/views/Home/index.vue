<script setup lang="ts">
import { reactive, ref } from 'vue';
import { StreamBarcodeReader } from '@teckel/vue-barcode-reader';

interface Form {
    productName: string;
    price: string;
    description: string;
    image: string;
    category: string;
    barcode: string;
}

const decodedText = ref("");
const form: Form = reactive({
    productName: '',
    price: '',
    description: '',
    image: '',
    category: '',
    barcode: ''
})

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
</script>

<template>
    <div>
        <v-card-text v-if="!decodedText">
            Selamat datang ke Tangkap Harga, sila benarkan aplikasi ini menggunakan kamera.
            <v-divider class="my-4"></v-divider>
            <StreamBarcodeReader torch no-front-cameras @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
        </v-card-text>
        <v-container v-else-if="decodedText">
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
    </div>
</template>

<style scoped></style>