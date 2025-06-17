const login = require("fca-unofficial");
const fs = require("fs");

const credentials = { appState: JSON.parse(fs.readFileSync("session.json", "utf-8")) };

login(credentials, (err, api) => {
  if (err) return console.error(err);

  api.setOptions({ listenEvents: true });

  const stopListening = api.listenMqtt((err, message) => {
    if (err) return console.error(err);

    if (message.body?.toLowerCase() === 'hi') {
      api.sendMessage("Hello! I'm Seima Sumu ", message.threadID);
    }
  });
});
