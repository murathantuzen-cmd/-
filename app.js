let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || []

function toplamBagisiBul() {
    let toplamBagis = 0
    for (let i = 0; i < ogrenciler.length; i++) {
        toplamBagis += ogrenciler[i].bagis
    }
    return toplamBagis
}

// 1. DÜZELTME: Diziden eleman silme ve LocalStorage'ı güncelleme
function kayitSil(index) {
    onaylandiMi = confirm("Emin misiniz!")
    if (onaylandiMi){
        ogrenciler.splice(index, 1) // Seçilen indeksteki öğrenciyi diziden çıkarır
        localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler)) // LocalStorage'ı günceller
        bagislariGoster() // Listeyi ekranda tekrar günceller
    } else {
        alert("İşlem iptal edildi.")
    }
    
}

function temizle() {
    document.getElementById("ogrenciSinifi").value = ""
    document.getElementById("ogrenciIsmi").value = ""
    document.getElementById('ogrenciBagisi').value = ""
}

function tumYazilariSil() {
    let liste = document.getElementById("listeAlani")
    if (liste) {
        liste.innerHTML = "" // Liste alanının içini tamamen temizler
    }
}

function butonYazdir(metin, tiklanincaCalisacakFonksiyon) {
    let yeniButon = document.createElement("button")
    yeniButon.innerText = metin
    yeniButon.onclick = tiklanincaCalisacakFonksiyon

    // Buton stilleri
    yeniButon.style.backgroundColor = "#e74c3c"
    yeniButon.style.color = "#ffffff"
    yeniButon.style.border = "none"
    yeniButon.style.borderRadius = "4px"
    yeniButon.style.padding = "5px 10px"
    yeniButon.style.cursor = "pointer"
    yeniButon.style.marginTop = "5px"
    yeniButon.style.marginBottom = "15px"

    document.getElementById("listeAlani").appendChild(yeniButon)
}

// 2. DÜZELTME: Fazladan parantez kapatması kaldırıldı
function yazdir(yazi) {
    let yazi1 = document.createElement("h3")
    yazi1.innerText = yazi
    
    // 3. DÜZELTME: body yerine listeAlani içine ekliyoruz
    document.getElementById("listeAlani").appendChild(yazi1)
}

function ogrenciTanimla() {
    let sinif1 = document.getElementById("ogrenciSinifi").value
    let isim1 = document.getElementById("ogrenciIsmi").value
    let bagis1 = Number(document.getElementById('ogrenciBagisi').value)

    if (!isim1 || !sinif1 || !bagis1) {
        alert("Lütfen tüm alanları doldurun!")
        return
    }

    let tarih1 = new Date()
    let tarih2 = tarih1.getFullYear() + "." + Number(tarih1.getMonth() + 1) + "." + tarih1.getDate() + " - " + tarih1.getHours() + ":" + tarih1.getMinutes()

    let ogrenci = {
        sinif: sinif1,
        isim: isim1,
        bagis: bagis1,
        tarih: tarih2
    }

    ogrenciler.push(ogrenci)
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler))

    temizle()
    bagislariGoster()
}

function bagislariGoster() {
    tumYazilariSil()
    
    let toplamBagis = toplamBagisiBul()
    yazdir("----------------------------------------")
    yazdir("Toplam Bağış Miktarı : " + toplamBagis + " TL")
    yazdir("----------------------------------------")

    for (let i = 0; i < ogrenciler.length; i++) {
        yazdir("Sınıf : " + ogrenciler[i].sinif + " | İsim : " + ogrenciler[i].isim + " | Bağış Miktarı : " + ogrenciler[i].bagis + " TL | Tarih : " + ogrenciler[i].tarih)
        
        // 4. DÜZELTME: Fonksiyonu () => kayitSil(i) şeklinde verdik ki anında çalışmasın
        butonYazdir("Bağışı Sil", function() {
            kayitSil(i)
        })
        
        yazdir("----------------------------------------")
    }
}

function verileriSil() {
    tumYazilariSil()
    localStorage.removeItem('ogrenciler')
    ogrenciler = []
    alert("Tüm kayıtlar başarıyla silindi!")
}
// Mevcut JS kodlarının altına bu fonksiyonu ekle:

function exceleAktar() {
    if (ogrenciler.length === 0) {
        alert("Excel'e aktarılacak kayıt bulunamadı!");
        return;
    }

    // 1. Excel tablosunda görünecek başlıkları ve verileri düzenliyoruz
    let excelVerisi = ogrenciler.map(function(item) {
        return {
            "Sınıfı": item.sinif,
            "Adı Soyadı": item.isim,
            "Bağış Miktarı (TL)": item.bagis,
            "Tarih": item.tarih
        };
    });

    // 2. Verileri SheetJS formatına dönüştürüyoruz
    let calismaSayfasi = XLSX.utils.json_to_sheet(excelVerisi);
    let calismaKitabi = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(calismaKitabi, calismaSayfasi, "Bağış Listesi");

    // 3. Dosyayı indiriyoruz
    XLSX.writeFile(calismaKitabi, "OAB_Bagis_Listesi.xlsx");
}
