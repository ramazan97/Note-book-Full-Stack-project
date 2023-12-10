// 28. videoda buradan başladım

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Sema = mongoose.Schema;

const kullaniciSema = new Sema({
  email: {
    type: String,
    // zorunlu olduğun için bunu kullandık
    required: true,
    // eklenen email hesabını tekrar eklenmemesisni kontrol emtmek maksatlı kullak
    unique: true,
  },
  parola: {
    type: String,
    required: true,
  },
});

kullaniciSema.statics.signup = async function (email, parola) {
  
    // validatin işlemlerinin burada yapacaz
  
    if (!email || !parola) {
    throw Error("Alanlar boş geçilemez");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email kurallara uygun değil");
  }

  if (!validator.isStrongPassword(parola)) {
    throw Error("Parola yeterince güçlü değil");
  }

  const kontrolKullanici = await this.findOne({ email });

  if (kontrolKullanici) {
    throw Error("Email zaten kullanılıyor");
  }

//   parolayı güçlendirmek için anlamsız random karakterlere salt dedik
  const salt = await bcrypt.genSalt(10);
//   hash olayı parola+ salt = şifrelenöişş hash
  const sifrelenmisParola = await bcrypt.hash(parola, salt);

//   şifrelenmiş parola ile emailli veritabanına kayot ettik
  const kullanici = await this.create({ email, parola: sifrelenmisParola });

  return kullanici;
};

kullaniciSema.statics.login = async function (email, parola) {
  if (!email || !parola) {
    throw Error("Alanlar boş geçilemez");
  }

  const kullanici = await this.findOne({ email });

  if (!kullanici) {
    throw Error("Email bulunamadı");
  }

  const parolaKontrol = await bcrypt.compare(parola, kullanici.parola);

  if (!parolaKontrol) {
    throw Error("Hatalı parola girdiniz");
  }

  return kullanici;
};

module.exports = mongoose.model("Kullanici", kullaniciSema);
