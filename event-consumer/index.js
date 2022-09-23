var kafka = require("kafka-node");
const express = require("express"),
  path = require("path"),
  app = express(),
  puerto = 3002;

const kafkarun = async () => {
  const client = new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });
  var consumer = new kafka.Consumer(
    client,
    [{ topic: "transaction-register", partition: 0 }],
    {
      autoCommit: false,
    }
  );

  consumer.on("message", async (message) => {
    console.log("message", message);
    return axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      url: "http://localhost:3000/transaction/update",
      data: message,
    })
      .then((response) => {
        comsole.log({ status: true, data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

setTimeout(kafkarun, 1000);
app.listen(puerto, (err) => {
  if (err) {
    console.error("Error escuchando: ", err);
    return;
  }
  console.log(`Escuchando en el puerto :${puerto}`);
});
