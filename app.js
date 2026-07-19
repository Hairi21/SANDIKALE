// ======================================================
// SANDIKALE PROJECT
// Sistem Manajemen Produksi & Kasir
// Versi 1.0
// ======================================================


// ======================
// DATABASE
// ======================

let daftarProduk = JSON.parse(localStorage.getItem("produk")) || [];

let keranjang = [];


// ======================
// SIMPAN DATABASE
// ======================

function simpanProduk(){

    localStorage.setItem(
        "produk",
        JSON.stringify(daftarProduk)
    );

}


// ======================
// CEK HALAMAN
// ======================

const listProduk = document.getElementById("listProduk");

const selectProduk = document.getElementById("produk");

const tabelKeranjang = document.getElementById("keranjang");

const totalBelanja = document.getElementById("total");


// ======================
// FORMAT RUPIAH
// ======================

function rupiah(angka){

    return "Rp " + Number(angka).toLocaleString("id-ID");

}// ======================
// PRODUK
// ======================

function tampilProduk(){

    if(!listProduk) return;

    listProduk.innerHTML = "";

    daftarProduk.forEach((item,index)=>{

        listProduk.innerHTML += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>${rupiah(item.harga)}</td>
            <td>
                <button onclick="hapusProduk(${index})">
                    Hapus
                </button>
            </td>
        </tr>
        `;

    });

}

function tambahDataProduk(){

    const nama =
    document.getElementById("namaProduk").value.trim();

    const kategori =
    document.getElementById("kategoriProduk").value.trim();

    const harga =
    document.getElementById("hargaProduk").value;

    if(nama==="" || kategori==="" || harga===""){

        alert("Lengkapi data produk.");

        return;

    }

    daftarProduk.push({

        nama:nama,

        kategori:kategori,

        harga:Number(harga)

    });

    simpanProduk();

    tampilProduk();

    document.getElementById("namaProduk").value="";
    document.getElementById("kategoriProduk").value="";
    document.getElementById("hargaProduk").value="";

}

function hapusProduk(index){

    if(confirm("Yakin ingin menghapus produk ini?")){

        daftarProduk.splice(index,1);

        simpanProduk();

        tampilProduk();

    }

}

tampilProduk();// ======================
// KASIR
// ======================

function loadProdukKasir(){

    if(!selectProduk) return;

    selectProduk.innerHTML =
    '<option value="">Pilih Produk</option>';

    daftarProduk.forEach((item,index)=>{

        selectProduk.innerHTML += `
        <option value="${index}">
            ${item.nama} - ${rupiah(item.harga)}
        </option>`;

    });

}

loadProdukKasir();

function tambahProduk(){

    if(!selectProduk) return;

    const index = selectProduk.value;

    if(index===""){

        alert("Pilih produk terlebih dahulu.");

        return;

    }

    const qty = parseInt(document.getElementById("qty").value);

    const diskon = parseInt(document.getElementById("diskon").value);

    const produk = daftarProduk[index];

    let subtotal = produk.harga * qty;

    subtotal = subtotal - (subtotal * diskon / 100);

    keranjang.push({

        nama: produk.nama,

        qty: qty,

        harga: produk.harga,

        diskon: diskon,

        subtotal: subtotal

    });

    tampilKeranjang();

    selectProduk.value = "";

    document.getElementById("qty").value = 1;

    document.getElementById("diskon").value = 0;

}

function tampilKeranjang(){

    if(!tabelKeranjang) return;

    tabelKeranjang.innerHTML="";

    let total = 0;

    keranjang.forEach((item)=>{

        total += item.subtotal;

        tabelKeranjang.innerHTML += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.qty}</td>
            <td>${rupiah(item.harga)}</td>
            <td>${rupiah(item.subtotal)}</td>
        </tr>
            });

    totalBelanja.innerHTML = "Total : " + rupiah(total);

}
       // ======================
// UTILITAS
// ======================

// Kosongkan Keranjang
function kosongkanKeranjang(){

    if(keranjang.length===0){

        alert("Keranjang masih kosong.");

        return;

    }

    if(confirm("Kosongkan semua transaksi?")){

        keranjang=[];

        tampilKeranjang();

    }

}

// Hitung Total
function hitungTotal(){

    let total=0;

    keranjang.forEach(item=>{

        total += item.subtotal;

    });

    return total;

}

// Simpan Transaksi (sementara)
function simpanTransaksi(){

    if(keranjang.length===0){

        alert("Belum ada transaksi.");

        return;

    }

    alert(
        "Transaksi berhasil disimpan.\n\nTotal : " +
        rupiah(hitungTotal())
    );

    keranjang=[];

    tampilKeranjang();

}

// ======================
// INISIALISASI
// ======================

tampilProduk();

loadProdukKasir();

tampilKeranjang();
// ======================
// DASHBOARD
// ======================

function loadDashboard(){

    const totalProduk = document.getElementById("totalProduk");
    const totalCustomer = document.getElementById("totalCustomer");
    const totalTransaksi = document.getElementById("totalTransaksi");
    const totalPenjualan = document.getElementById("totalPenjualan");

    if(!totalProduk) return;

    // Produk
    let produk =
    JSON.parse(localStorage.getItem("produk")) || [];

    totalProduk.innerHTML = produk.length;

    // Customer
    let customer =
    JSON.parse(localStorage.getItem("customer")) || [];

    totalCustomer.innerHTML = customer.length;

    // Transaksi
    let transaksi =
    JSON.parse(localStorage.getItem("transaksi")) || [];

    totalTransaksi.innerHTML = transaksi.length;

    // Penjualan
    let total = 0;

    transaksi.forEach(item=>{

        total += Number(item.total);

    });

    totalPenjualan.innerHTML =
    "Rp " + total.toLocaleString("id-ID");

}

loadDashboard();
// =======================
// DATA CUSTOMER
// =======================

let daftarCustomer = JSON.parse(localStorage.getItem("customer")) || [];

function simpanCustomer() {
    localStorage.setItem("customer", JSON.stringify(daftarCustomer));
}

function tampilCustomer() {

    let tbody = document.getElementById("listCustomer");

    if (!tbody) return;

    tbody.innerHTML = "";

    daftarCustomer.forEach((item, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.hp}</td>
            <td>${item.alamat}</td>
            <td>
                <button onclick="hapusCustomer(${index})">
                    Hapus
                </button>
            </td>
        </tr>`;
    });

}

function tambahCustomer() {

    let nama = document.getElementById("namaCustomer").value;
    let hp = document.getElementById("hpCustomer").value;
    let alamat = document.getElementById("alamatCustomer").value;

    if (nama == "" || hp == "" || alamat == "") {
        alert("Lengkapi data customer!");
        return;
    }

    daftarCustomer.push({
        nama: nama,
        hp: hp,
        alamat: alamat
    });

    simpanCustomer();

    tampilCustomer();

    document.getElementById("namaCustomer").value = "";
    document.getElementById("hpCustomer").value = "";
    document.getElementById("alamatCustomer").value = "";
}

function hapusCustomer(index) {

    if (confirm("Hapus customer?")) {

        daftarCustomer.splice(index, 1);

        simpanCustomer();

        tampilCustomer();

    }

}

tampilCustomer();
