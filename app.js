let daftarProduk = JSON.parse(localStorage.getItem("produk")) || [];

let keranjang = [];

const selectProduk = document.getElementById("produk");

function loadProduk(){

    selectProduk.innerHTML =
    '<option value="">Pilih Produk</option>';

    daftarProduk.forEach((item,index)=>{

        selectProduk.innerHTML +=
        `<option value="${index}">
        ${item.nama} - Rp ${Number(item.harga).toLocaleString('id-ID')}
        </option>`;

    });

}

loadProduk();

function tambahProduk(){

    let index = selectProduk.value;

    if(index===""){

        alert("Pilih produk");

        return;

    }

    let qty = parseInt(document.getElementById("qty").value);

    let diskon = parseInt(document.getElementById("diskon").value);

    let produk = daftarProduk[index];

    let subtotal = produk.harga * qty;

    subtotal = subtotal - (subtotal*diskon/100);

    keranjang.push({

        nama:produk.nama,

        qty:qty,

        harga:produk.harga,

        subtotal:subtotal

    });

    tampilKeranjang();

}

function tampilKeranjang(){

    let tbody = document.getElementById("keranjang");

    tbody.innerHTML="";

    let total=0;

    keranjang.forEach(item=>{

        total+=item.subtotal;

        tbody.innerHTML +=

        `<tr>

        <td>${item.nama}</td>

        <td>${item.qty}</td>

        <td>Rp ${Number(item.harga).toLocaleString('id-ID')}</td>

        <td>Rp ${Number(item.subtotal).toLocaleString('id-ID')}</td>

        </tr>`;

    });

    document.getElementById("total").innerHTML =
    "Total : Rp "+total.toLocaleString('id-ID');

}
