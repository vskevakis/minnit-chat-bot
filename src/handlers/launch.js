const { DateTime } = require("luxon");

async function launch(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import("node-fetch")).default;
    const argument = lastMessage.text.split(" ")[1];

    let url = "https://ll.thespacedevs.com/2.2.0/launch/";
    if (argument === "past") {
        url += "previous/?limit=1";
    } else if (argument === "present") {
        url += "?window_end__gt=now&window_start__lt=now&limit=1";
    } else if (argument === "upcoming") {
        url += "upcoming/?limit=1";
    } else {
        await puppeteerUtils.send_message(chat_frame, "Invalid argument. Please use 'past', 'present', or 'upcoming'.");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const launch = data.results[0];
            const dateTime = DateTime.fromISO(launch.net, { zone: "utc" }).setZone("Europe/Athens");
            const formattedDate = dateTime.toFormat("dd/MM/yyyy HH:mm");

            await puppeteerUtils.send_message(chat_frame, `The ${argument} launch is ${launch.name}, scheduled for ${formattedDate}.`);
        } else {
            await puppeteerUtils.send_message(chat_frame, "No launch found.");
        }
    } catch (error) {
        console.error("Error fetching launch data:", error);
        await puppeteerUtils.send_message(chat_frame, "Error fetching launch data.");
    }
}

module.exports = launch;
