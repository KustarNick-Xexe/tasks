const subtractTimes = (time1, time2) => {
    const [hours1, minutes1, seconds1] = time1.split(":");
    const [hours2, minutes2, seconds2] = time2.split(":");
    
    const totalSeconds1 = parseInt(seconds1) + (parseInt(minutes1) * 60) + (parseInt(hours1) * 3600);
    const totalSeconds2 = parseInt(seconds2) + (parseInt(minutes2) * 60) + (parseInt(hours2) * 3600);
    
    let diffSeconds = totalSeconds1 - totalSeconds2;
    
    const diffHours = Math.floor(diffSeconds / 3600);
    diffSeconds %= 3600;
    
    const diffMinutes = Math.floor(diffSeconds / 60);
    diffSeconds %= 60;
    
    return `${diffHours.toString().padStart(2, "0")}:${diffMinutes.toString().padStart(2, "0")}:${diffSeconds.toString().padStart(2, "0")}`;
}

export default subtractTimes;