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
      <div class="control">
        <input
          id="description"
          class="form-control"
          type="text"
          placeholder="Description"
          v-model="description"
        />
      </div>
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
    <div class="col-12" v-if="validationError">
      <p class="alert alert-danger">All fieds are required</p>
    </div>
  
    <div class="col-12 btn-group">
      <button class="btn btn-success" @click="addProduct">Add new product</button>
      <router-link :to="{ name: 'ProductList' }" class="btn btn-danger">Cancel</router-link>
    </div>
  </div>
</template>
   
<script>
  import { v4 as uuidv4 } from "uuid";
  import { addProduct } from "@/service";
   
  export default {
    name: "ProductCreate",
    data() {
      return {
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: "",
        validationError: false
      };
    },
    methods: {
      async addProduct() {

        if (this.name.length && this.description.length && this.price.length && this.quantity.length && this.imageUrl.length) {
          this.validationError = false;

          try {
            await addProduct({
              id: uuidv4(), 
              name: this.name,
              description: this.description,
              price: this.price,
              quantity: this.quantity,
              imageUrl: this.imageUrl,
              createdAt: new Date(),
              updatedAt: new Date()
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
        } else {
          this.validationError = true;
        }        
      },
    },
  };
</script>
