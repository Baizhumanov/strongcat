export default function (timestamp) {
    let dateFormat= new Date(timestamp);
    let day = dateFormat.getDate() < 10 ? "0".concat(dateFormat.getDate()) : dateFormat.getDate()
    let month = dateFormat.getMonth() < 10 ? "0".concat(dateFormat.getMonth()) : dateFormat.getMonth()
    return day + "." + month + "." + dateFormat.getFullYear()
};