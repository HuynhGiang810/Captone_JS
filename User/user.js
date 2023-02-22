let productList = [];
getProduct();

// Hàm call API từ data
function getProduct() {
    axios({
        method: "GET",
        url: "https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products",
    }).then((response) => {
        productList = response.data;
        console.log(response.data);
        renderProducts(response.data)
    });
}

// Hàm hiển thị sản phẩm
function renderProducts(products) {
    let html = products.reduce((result, product) => {
        return (result + `
        <div class="col-3 mb-5 mt-5 text-center">

        <img src="${product.img}" with="70" height="70"/>
        <p>${product.name}</p>
        <p> Giá: ${product.price}</p>
        <button onclick="addToCart(${product.id})"> Thêm Vào Giỏ Hàng </button>

        </div>
        `);
    }, "");

    document.getElementById("product").innerHTML = html;
}


// ==============Cart==================


// let productList = getProduct();

// Thêm sản phẩm vào giỏ hàng
let cartList = [];
function addToCart(id) {
    const cartItem = productList.filter((item) => {
        return item.id == id
    })
    let item = new CartItem(
        cartItem[0].id,
        cartItem[0].name,
        cartItem[0].price,
        1,
    );
    if (cartList.some((item) => {
        return item.id === id
    })) {
        cartList.push(item);
    } else {
        let index = cartList.findIndex((val) => {
            return val.id === id
        })
        cartList[index].quantity += 1;
    }
    renderCart();
}


// Lưu giỏ hàng vào Storage
function setLocal() {
    localStorage.setItem("listCart", JSON.stringify(cartList));
}

// Lấy giỏ hàng từ storage
function getLocal() {
    let cartList = localStorage.getItem("listCart");
    if (cartList === null) return;
    return cartList;
}

// Hàm render giỏ hàng
function renderCart() {
    if (cartList.length > 0) {
        const res = cartList.reduce((res, product) => {
            return (res + `
            <tr>
            <td>${product.name}</td>
            <td>
            <div style="width:100px">
            <button type='button' class='btn decrease' onclick="decrease(${product.id})">-</button><span></span>
            <button type='button' class='btn increase' onclick="increase(${product.id})">+</button>
            </div>
            </td>
            <td>${product.price.toLocaleString()}</td>
            <td>${(product.quantity < 1 ? val.price : val.quantity * val.price).toLocaleString()}</td>
            <td><button class='btn btn-danger' onclick=""> Xóa </button></td>
            </tr>`);
        },"");


    }
};

// // Hàm giảm số lượng trong Cart
// function decrease(id) {
//     let index = cartList.findIndex((item) => {
//         return item.id === id
//     });
// if (index === -1 ) return;
// cartList[index].quantity -= 1;
// renderCart();
// }

// // Hàm tăng số lượng
// function increase(id){
//     let index = cartList.findIndex((item) => {
//         return item.id === id
//     });
// if(index === -1) return;
// cartList[index].quantity += 1;
// renderCart()
// };

// // Đếm số lượng
// function getCount(){
// let count = cartList.reduce(() => {
//     return res + product.quantity
// },0)
// };
// getCount();