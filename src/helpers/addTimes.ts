const addTimes = (time1, time2) => {
    const [hours1, minutes1, seconds1] = time1.split(":");
    const [hours2, minutes2, seconds2] = time2.split(":");
    
    const totalSeconds = parseInt(seconds1) + parseInt(seconds2);
    const totalMinutes = parseInt(minutes1) + parseInt(minutes2);
    const totalHours = parseInt(hours1) + parseInt(hours2);
    
    const remainderSeconds = totalSeconds % 60;
    const additionalMinutes = Math.floor(totalSeconds / 60);
    
    const finalMinutes = totalMinutes + additionalMinutes;
    
    const remainderMinutes = finalMinutes % 60;
    const additionalHours = Math.floor(finalMinutes / 60);

    const finalHours = totalHours + additionalHours;
    
    return `${finalHours.toString().padStart(2, "0")}:${remainderMinutes.toString().padStart(2, "0")}:${remainderSeconds.toString().padStart(2, "0")}`;
}

export default addTimes;
