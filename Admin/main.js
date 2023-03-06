

getProducts();
// Hàm gọi API lấy sản phẩm
function getProducts(searchValue) {
    axios({
        method: "GET",
        url: "https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products",
        params: {
            name: searchValue || undefined,
        },
    }).then((response) => {
        sort = response.data.price
        console.log(response.data);
        const products = response.data.map((product) => {
            return new Product(
                product.id,
                product.name,
                product.price,
                product.img,
                product.desc,
            );  
        });
        renderProducts(products);
        
    })

}
// Hàm thêm sản phẩm
function createProduct() {
    const product = {
        name: getElement("#TenSP").value,
        price: getElement("#GiaSP").value,
        img: getElement("#HinhSP").value,
        desc: getElement("#loaiSP").value,
    };
    axios({
        method: "POST",
        url: "https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products",
        data: product
    }).then((response) => {
        getProducts();
    })
    $("#myModal").modal("hide");
}


// Hàm xóa sản phẩm
function deleteProduct(productId) {
    axios({
        method: "DELETE",
        url: `https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products/${productId}`
    }).then(() => {
        getProducts();
    })
}

// Hàm lấy chi tiết sản phẩm hiện ra giao diện
function selectProduct(productId) {
    axios({
        method: "GET",
        url: `https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products/${productId}`
    }).then((response) => {
        const product = response.data;
        getElement("#TenSP").value = product.name;
        getElement("#HinhSP").value = product.img;
        getElement("#GiaSP").value = product.price;
        getElement("#loaiSP").value = product.desc;

        getElement(".modal-title").innerHTML = "Cập Nhật Sản Phẩm";
        getElement(".modal-footer").innerHTML = `
<button>Hủy</button>
<button onclick="updateProduct('${product.id}')">Cập Nhật</button>`
        $("#myModal").modal("show");
    })
}


// Hàm cập nhật thông tin sản phẩm
function updateProduct(productId) {
    const product = {
        name: getElement("#TenSP").value,
        price: getElement("#GiaSP").value,
        img: getElement("#HinhSP").value,
        desc: getElement("#loaiSP").value,
    };
    axios({
        method: "PUT",
        url: `https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products/${productId}`,
        data: product
    }).then((response) => {
        getProducts()
        $("#myModal").modal("hide");
    })
}


// =======Dom============
getElement("#btnThemSP").addEventListener("click", () => {
    getElement(".modal-title").innerHTML = "Thêm Sản Phẩm";
    getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismis="modal">Hủy</button>
    <button class="btn btn-primary" onclick="createProduct()">Thêm</button>`;
});

// Tìm kiếm
getElement("#txtSearch").addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key !== "Enter") return;
    const searchValue = event.target.value;
    getProducts(searchValue);
});

// Hàm sắp xếp tăng dần
function sortUp(){
    axios({
        method: "GET",
        url:"https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products",
        }).then((response) => {
           let S = sortJSON(response.data, "price", true )
            renderProducts(S);
        });
}

function sortJSON(arr, key, asc = true) {
    return arr.sort((a, b) => {
      let x = a[key];
      let y = b[key];
      if (asc) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  }

//   Hàm sắp xếp giảm dần
function sortDown(){
    axios({
        method: "GET",
        url:"https://63f2d93b4f17278c9a2cedf5.mockapi.io/api/products",
        }).then((response) => {
           let S = sortJSON(response.data, "price", false )
            renderProducts(S);
        });
}

// Hàm render sản phẩm
function renderProducts(products) {
    let html = products.reduce((result, product, index) => {
        return (result + `
        <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><img src="${product.img}" width="100" height="100" /></td>
        <td>${product.desc}</td>
        <td>
        <button class="btn btn-primary"onclick="selectProduct('${product.id}')">Xem</button>
        <button class="btn btn-secondary" onclick="deleteProduct('${product.id}')">Xóa</button>
        </td>
        </tr>`);
    }, "");
    document.getElementById("tblDanhSachSP").innerHTML = html;
}


// =====Helper======
function getElement(selector) {
    return document.querySelector(selector);
}
