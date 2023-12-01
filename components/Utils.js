export const getDateTime = (date) => {
    const dateArray = date.split('-');
    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];
    return new Date(year, month, day);
}


export const formatDate = (date) => {
    // 01.02.2021 to 2021-02-01
    const dateArray = date.split('.');
    const day = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];
    return `${year}-${month}-${day}`;
}