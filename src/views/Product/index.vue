<script setup lang="ts">
import { reactive, onMounted } from 'vue'

interface Form {
    productName: string;
    price: string;
    description: string;
    image: string;
    category: string;
    barcode: string;
}

onMounted(() => {
    init()
})

const getAllProduct: Form[] = reactive([]);

const init = () => {
    if (localStorage.getItem('productsTangkapHarga')) {
        const products = JSON.parse(localStorage.getItem('productsTangkapHarga')!)
        getAllProduct.push(...products)
    }
}
</script>

<template>
    <v-container>
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
</template>

<style scoped></style>