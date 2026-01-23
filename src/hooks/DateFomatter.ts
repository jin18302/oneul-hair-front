export  function DateFommater({ date }: { date: Date }) {


    const jsonDate = date.toJSON();

    const yyyy = jsonDate.substring(0, 4); 
    const mm = jsonDate.substring(5, 7);
    const dd = Number(jsonDate.substring(8, 10)) + 1;

    return yyyy + "-" + mm + "-" + dd;
}

export function getMonth(date: Date){

    const jsonDate = date.toJSON();
    return Number(jsonDate.substring(5, 7));
}