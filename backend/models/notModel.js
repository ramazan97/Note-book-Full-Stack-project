// monggose içerisinde bulunan schema kullanıyoruz
const mongoose = require("mongoose");

const Sema = mongoose.Schema;

const notSema = new Sema(
  {
    baslik: {
      type: String,
      required: [true, "Baslik zorunlu olarak girilmelidir"],
    },
    aciklama: {
      type: String,
    },
     kullanici_id:{
       type:String,
       required:true
     }
  },
  {
    // zaman damgasını aktif etmek maksatlı kullandık
    timestamps: true,
  }
);
// ('Not',notSema) isim ve shema vermemiz lazım
module.exports = mongoose.model("Not", notSema);
