export default function conversionDate(elem) {
    let num = elem.split('.');
    return (`${num[2]}-${num[1]}-${num[0]}`);
}