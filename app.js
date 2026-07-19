let total = 0;

function formatRupiah(angka){
    return "Rp " + angka.toLocaleString("id-ID");
}

function tambahProduk(){

    const produk = document.getElementById("produk");
    const qty = document.getElementById("qty");
    const diskon = document.getElementById("diskon");

    const namaProduk = produk.options[produk.selectedIndex].text;
    const harga = Number(produk.value);
    const jumlah = Number(qty.value);
    const potongan = Number(diskon.value);

    let subtotal = harga * jumlah;

    subtotal = subtotal - (subtotal * potongan / 100);

    total += subtotal;

    const tbody = document.getElementById("keranjang");

    tbody.innerHTML += `
    <tr>
        <td>${namaProduk}</td>
        <td>${jumlah}</td>
        <td>${formatRupiah(harga)}</td>
        <td>${formatRupiah(subtotal)}</td>
    </tr>
    `;

    document.getElementById("total").innerHTML =
        "Total : " + formatRupiah(total);
}
