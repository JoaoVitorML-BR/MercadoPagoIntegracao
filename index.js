const express = require("express");
const MercadoPago = require("mercadopago");
const crypto = require('crypto');
const app = express();

console.log(crypto.randomUUID())

MercadoPago.configure({
  sandbox: true,
  access_token: "TEST-2031916644973637-022419-de5eb8ecbf82859f4357da438f0d09bb-447170738"
});

app.get("/", (req, res) => {
  res.send("Olá! " + crypto.randomUUID());
});

const id = "" + crypto.randomUUID();
const emailDoPagador = `${id}@gmail.com`

app.get("/pagar", async (req, res) => {
  const dados = {
    items: [
      item = {
        id: id,
        title: "3x Memoria ram; 10x ssd",
        quantity: 1,
        currency_id: "BRL",
        unit_price: parseFloat(150)
      }
    ],
    payer: {
      email: emailDoPagador
    },
    external_reference: id
  }

  try{
    const payment = await MercadoPago.preferences.create(dados);
    console.log(payment);
    return res.redirect(payment.body.init_point);
  }catch(err){
    return res.send(err.message);
  }

});

app.post("/not", (req, res) => {
  console.log(req.query);
  res.send("ok");
});

app.listen(80, (req, res) => {
  console.log("Servidor rodando na porta 3000...");
});