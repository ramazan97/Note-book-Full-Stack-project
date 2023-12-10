const express = require("express");
const router = express.Router();
const NotModel = require("../models/notModel");
const {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notController");
const authKontrol = require("../middleware/authKontrol");

router.use(authKontrol);
router.get("/", notlarGetir);

router.get("/:id", notGetir);
router.post(
  "/",
  notOlustur

  // async (req, res) => {
  //  const {baslik,aciklama}=req.body

  // try {
  //   const not=await NotModel.create({baslik,aciklama})
  //   res.status(200).json(not)
  // } catch (error) {
  //   res.status(400).json({hata:error.message})

  // }}
);
router.delete("/:id", notSil);
router.patch("/:id", notGuncelle);

module.exports = router;
