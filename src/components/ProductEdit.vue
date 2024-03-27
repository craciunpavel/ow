<template>
  <div class="card mx-auto col-lg-6 col-md-6 col-sm-9 col-12 p-4">
    <div class="mb-3">
      <label class="form-label" for="name">Product Name</label>
      <input
        id="name"
        class="form-control"
        type="text"
        placeholder="Product Name"
        v-model="name"
      />
    </div>
  
    <div class="mb-3">
      <label class="form-label" for="description">Description</label>
      <input
        id="description"
        class="form-control"
        type="text"
        placeholder="Description"
        v-model="description"
      />
    
    </div>

    <div class="mb-3">
      <label class="form-label" for="price">Price</label>
      <div class="control">
        <input
          id="price"
          class="form-control"
          type="text"
          placeholder="Price"
          v-model="price"
        />
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="quantity">Quantity</label>
      <div class="control">
        <input
          id="quantity"
          class="form-control"
          type="text"
          placeholder="Quantity"
          v-model="quantity"
        />
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="image">Image Url</label>
      <div class="control">
        <input
          id="image"
          class="form-control"
          type="text"
          placeholder="Image Url"
          v-model="imageUrl"
        />
      </div>
    </div>
  
    <div class="col-12 btn-group">
      <button class="btn btn-success" @click="saveProduct">Update</button>
      <router-link :to="{ name: 'ProductList' }" class="btn btn-danger">Cancel</router-link>
    </div>
  </div>
</template>
   
<script>
  import { updateProduct, getProductById } from "../service";
   
  export default {
    name: "ProductEdit",
    data() {
      return {
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: ""
      };
    },
    created: function () {
      this.getCurrentProduct();
    },
    methods: {
      async saveProduct() {
        try {
          await updateProduct({
            id: this.$route.params.id,
            name: this.name,
            description: this.description,
            price: this.price,
            quantity: this.quantity,
            imageUrl: this.imageUrl,
            createdAt: this.createdAt,
            updatedAt: Date.now()
          });
          
          this.name = "";
          this.description = "";
          this.price = "";
          this.quantity = "";
          this.imageUrl = "";

          this.$router.push("/");
        } catch (err) {
          console.log(err);
        }
      },
      async getCurrentProduct() {
        try {
          const currentId = this.$route.params.id;
          const currentProduct = await getProductById(currentId)

          this.name = currentProduct.name;
          this.description = currentProduct.description;
          this.price = currentProduct.price;
          this.quantity = currentProduct.quantity;
          this.imageUrl = currentProduct.imageUrl;
          this.createdAt = currentProduct.createdAt;
        } catch (err) {
          console.log(err);
        }
      }
    },
  };
</script>
