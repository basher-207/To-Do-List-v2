const today = new Date();
const options = {
    weekday: "long",
    month: "long",
    day: "numeric"
}

module.exports = today.toLocaleString("en-US", options);
