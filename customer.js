let daftarCustomer = JSON.parse(localStorage.getItem("customer")) || [];

function simpanCustomer(){
    localStorage.setItem("customer", JSON.stringify(daftarCustomer));
}

function tampilCustomer(){

    let tbody = document.getElementById("listCustomer");

    if(!tbody) return;

    tbody.innerHTML = "";

    daftarCustomer.forEach((item,index)=>{

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
        </tr>
        `;

    });

}

function tambahCustomer(){

    let nama = document.getElementById("namaCustomer").value;
    let hp = document.getElementById("hpCustomer").value;
    let alamat = document.getElementById("alamatCustomer").value;

    if(nama=="" || hp=="" || alamat==""){
        alert("Lengkapi data customer.");
        return;
    }

    daftarCustomer.push({
        nama:nama,
        hp:hp,
        alamat:alamat
    });

    simpanCustomer();
    tampilCustomer();

    document.getElementById("namaCustomer").value="";
    document.getElementById("hpCustomer").value="";
    document.getElementById("alamatCustomer").value="";
}

function hapusCustomer(index){

    if(confirm("Hapus customer?")){

        daftarCustomer.splice(index,1);

        simpanCustomer();
        tampilCustomer();

    }

}

tampilCustomer();
