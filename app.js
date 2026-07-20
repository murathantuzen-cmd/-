let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || []
function toplamBagisiBul() {
    let toplamBagis = 0
    for (let i = 0; i < ogrenciler.length; i++) {
        toplamBagis += ogrenciler[i].bagis
    }
    return toplamBagis
}
function temizle() {
    document.getElementById("ogrenciSinifi").value = ""
    document.getElementById("ogrenciIsmi").value = ""
    document.getElementById('ogrenciBagisi').value = ""
}
function tumYazilariSil() {
    let basliklar = document.querySelectorAll("h3");
    basliklar.forEach(h3 => h3.remove());
}
function yazdir(yazi) {
    let yazi1 = document.createElement("h3")
    yazi1.innerText = yazi
    document.body.appendChild(yazi1)
}
function ogrenciTanimla() {
    let ogrenci = { sinif: "", isim: "", bagis: 0, tarih: "" }
    let sinif1 = document.getElementById("ogrenciSinifi").value
    let isim1 = document.getElementById("ogrenciIsmi").value
    let bagis1 = Number(document.getElementById('ogrenciBagisi').value)
    let tarih1 = new Date()
    let tarih2 = tarih1.getFullYear() + "." + Number(tarih1.getMonth() + 1) + "." + tarih1.getDate() + "." + tarih1.getHours() + "." + tarih1.getMinutes() + "." + tarih1.getSeconds()
    ogrenci.sinif = sinif1
    ogrenci.isim = isim1
    ogrenci.bagis = bagis1
    ogrenci.tarih = tarih2
    ogrenciler.push(ogrenci)
    temizle()
    tumYazilariSil()

    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler))
    bagislariGoster()
}

function bagislariGoster() {
    tumYazilariSil()
    temizle()
    let toplamBagis = toplamBagisiBul()
    yazdir("----------------------------------------------")
    yazdir("Toplam bağış miktarı : " + toplamBagis)
    let i = 0
    while (true) {
        if (i == ogrenciler.length) {
            yazdir("----------------------------------------------")
            break
        }
        yazdir("----------------------------------------------")
        yazdir("Sınıf : " + ogrenciler[i].sinif + "\r\nİsim : " + ogrenciler[i].isim + "\r\nBağış miktarı : " + ogrenciler[i].bagis + "\r\nTarih : " + ogrenciler[i].tarih)
        i++
    }
}

function verileriSil() {
    tumYazilariSil()
    localStorage.removeItem('ogrenciler')
    ogrenciler = []
    alert("Tüm kayıtlar başarıyla silindi!")
}
