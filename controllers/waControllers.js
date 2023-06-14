const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one",
    }),
    puppeteer: {
        // args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: false,
    },
});

client.on("ready", () => {
    console.log("Client is ready!");
});
client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    // console.log("QR RECEIVED", qr);
});

client.on("message", async (msg) => {
    if (msg.body === "boleh liat listnya?") {
        const media1 = await MessageMedia.fromUrl(
            "https://rengginangempoera.shop/images/Logo.png"
        );
        const media2 = await MessageMedia.fromUrl(
            "https://rengginangempoera.shop/images/Logo.png"
        );
        try {
            client
                .sendMessage(msg.from, media1, { caption: "rengginang hitam" })
                .then(() => {
                    client
                        .sendMessage(msg.from, media2, {
                            caption: "rengginang putih",
                        })
                        .then(() => {
                            client.sendMessage(
                                msg.from,
                                "1. Rengginang Putih (500 gram) - Rp25.000\n2. Rengginang Hitam (500 gram) - Rp25.000\n3. Rengginang Putih (1 kg) - Rp50.000\n4. Rengginang Hitam (1 kg) - Rp50.000"
                            );
                        });
                });
        } catch (error) {
            console.log(error.message);
        }
    }
});

client.on("message", (message) => {
    if (message.body === "!ping") {
        message.reply("pong");
    }
});

exports.sendText = (req, res) => {
    let phone = req.query.phone;
    let message = req.query.message;
    const user = req.query.user;

    if (phone.startsWith("0")) {
        phone = "62" + phone.slice(1) + "@c.us";
    } else if (phone.startsWith("62")) {
        phone = phone + "@c.us";
    } else if (phone.startsWith("+62")) {
        phone = phone.slice(1) + "@c.us";
    } else {
        phone = phone + "@c.us";
    }

    try {
        client.on("ready", () => {
            res.json("Client is ready!");
        });
        // if (user == "jagres") {
        //     client.on("ready", () => {
        //         client
        //             .sendMessage(phone, message)
        //             .then((response) => {
        //                 res.status(200).json({
        //                     message: "Message sent successfully",
        //                     response,
        //                 });
        //             })
        //             .catch((error) => {
        //                 res.status(500).json({
        //                     message: "Message not sent",
        //                     err: error.message,
        //                 });
        //             });
        //     });
        // } else {
        //     res.json({ phone, message });
        // }
    } catch (error) {
        console.log(error);
    }
};
