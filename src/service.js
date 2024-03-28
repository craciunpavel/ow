
export async function getProductsList() {
    if (localStorage.getItem('products')) {
        try {
            const products = await JSON.parse(localStorage.getItem('products'));
            return products || [];
        } catch(e) {
            localStorage.removeItem('products');
            return [];
        }
    } else {
        return [];
    }
}

export async function getProductById(id) {
    const products = await getProductsList();
    return products.find(p => p.id === id);
}

export async function addProduct(product) {
    const products = await getProductsList();
    updateStorage([...products, product]);
}

export async function updateProduct(product) {
    const products = await getProductsList();
    const indexToUpdate = products.findIndex(function(obj){return obj.id == product.id});
    products[indexToUpdate] = product;
    updateStorage(products);
}

export async function deleteProduct(id) {
    const products = await getProductsList();
    const indexToDelete = products.findIndex(function(obj){return obj.id == id});
    products.splice(indexToDelete, 1);
    updateStorage(products);

}

export async function updateStorage(products) {
    const parsed = JSON.stringify(products);
    localStorage.setItem('products', parsed);
}

