class Kullanici {
    constructor(ad, email, numara) {
        this.ad = ad;
        this.email = email;
        this.numara = numara;
    }

    bilgi() {
        return `Ad: ${this.ad}, Email: ${this.email}, Numara: ${this.numara}`;
    }
}

function verileriGetir() {
    let veri = localStorage.getItem("kullanicilar");
    return veri ? JSON.parse(veri) : [];
}

function verileriKaydet(kullanicilar) {
    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
}

function kullaniciEkle() {
    const ad = document.getElementById("ad").value;
    const email = document.getElementById("email").value;
    const numara = document.getElementById("numara").value;

    if (ad.trim() === "" || email.trim() === "" || numara.trim() === "") {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    const yeniKullanici = new Kullanici(ad, email, numara);
    const kullanicilar = verileriGetir();
    kullanicilar.push(yeniKullanici);
    verileriKaydet(kullanicilar);
    kullanicilariGoster();

    document.getElementById("ad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("numara").value = "";
}

function kullanicilariGoster() {
    const liste = document.getElementById("kullaniciListesi");
    liste.innerHTML = "";

    const kullanicilar = verileriGetir();

    kullanicilar.forEach((kisi, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${kisi.ad} - ${kisi.email} - ${kisi.numara}
            <button onclick="kullaniciSil(${index})">Sil</button>
            <button onclick="kullaniciDuzenle(${index})">Düzenle</button>
        `;
        liste.appendChild(li);
    });
}

function kullaniciSil(index) {
    const kullanicilar = verileriGetir();
    kullanicilar.splice(index, 1);
    verileriKaydet(kullanicilar);
    kullanicilariGoster();
}

function kullaniciDuzenle(index) {
    const kullanicilar = verileriGetir();
    const secilen = kullanicilar[index];

    document.getElementById("ad").value = secilen.ad;
    document.getElementById("email").value = secilen.email;
    document.getElementById("numara").value = secilen.numara;

    const btn = document.getElementById("ekleBtn");
    btn.textContent = "Güncelle";

    btn.onclick = function () {
        const yeniAd = document.getElementById("ad").value;
        const yeniEmail = document.getElementById("email").value;
        const yeniNumara = document.getElementById("numara").value;

        if (yeniAd.trim() === "" || yeniEmail.trim() === "" || yeniNumara.trim() === "") {
            alert("Boş alan bırakmayın!");
            return;
        }

        secilen.ad = yeniAd;
        secilen.email = yeniEmail;
        secilen.numara = yeniNumara;

        kullanicilar[index] = secilen;
        verileriKaydet(kullanicilar);
        kullanicilariGoster();

        document.getElementById("ad").value = "";
        document.getElementById("email").value = "";
        document.getElementById("numara").value = "";
        btn.textContent = "Ekle";
        btn.onclick = kullaniciEkle;
    };
}

window.onload = kullanicilariGoster;
