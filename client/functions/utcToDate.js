export const isValidDate = (dateString) => {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
}
  
export const utcToDate = (utcDateString) => {
    const utcDate = new Date(utcDateString)

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        timeZone: 'Europe/Stockholm' // Specify the time zone for Sweden
    };
        
    // Format the date according to Swedish conventions
    const localDateString = utcDate.toLocaleString('sv-SE', options);

    return localDateString
}