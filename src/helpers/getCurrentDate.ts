export default function () {
    const today = new Date();

    const day = today.getDate();
    const month = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ][today.getMonth()];

    return `${day} ${month}`;
}