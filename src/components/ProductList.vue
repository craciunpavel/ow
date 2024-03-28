<template>
  <div class="container">
    <div>
      <router-link :to="{ name: 'ProductCreate' }" class="btn btn-success btn-sm"
      >Add new product</router-link
    >
    </div>

    <ul v-if="products && products.length > 0" class="d-flex p-0 flex-wrap">
      <li v-for="product in products" :key="product.id" class="card col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
      
        <img 
          :alt="product.name"
          :src="product.imageUrl"
          class="card-img-top"
        />

        <div class="card-body">
          <h4>{{ product.name }}</h4>
          <p v-if="product.description">{{ product.description }}</p>
          <p v-if="product.price" class="price">Price: {{ product.price }}</p>
          <p v-if="product.quantity">Quantity: {{ product.quantity }}</p>
          <p v-if="product.createdAt">Created at: {{ new Date(product.createdAt).toLocaleString() }}</p>
          <p v-if="product.updatedAt && product.updatedAt !== product.createdAt">Updated at: {{ new Date(product.updatedAt).toLocaleString() }}</p>
          
          <div class="col-12 btn-group">
            <router-link
                :to="{ name: 'ProductEdit', params: { id: product.id } }"
                class="btn btn-primary btn-sm"
            >
              Edit
            </router-link>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteFromList(product.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <h2>No products yet</h2>
    </div>
  </div>
</template>
 
<script>
import { getProductsList, deleteProduct } from '@/service.js';
 
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
 
  async created() {
    await this.getProducts();
  },

  methods: {
    async getProducts() {
      try {
        this.products = await getProductsList();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteFromList(id) {
      if (confirm('Are you sure?')) {
        try {
          await deleteProduct(id);
          this.getProducts();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
