const addRecentActivity = (activityType, activityMessage) => {
    const today = new Date();

    const date = today.toLocaleDateString("en-CA", {
        timeZone: "Africa/Johannesburg"
    });

    const time = today.toLocaleTimeString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const activity = {
        type: activityType,
        message: activityMessage,
        date,
        time
    }

    const JSONstring = localStorage.getItem('activities')
    const activityArray = JSON.parse(JSONstring) || [];
    activityArray.push(activity);
    const last20 = activityArray.slice(-20); 
    localStorage.setItem('activities', JSON.stringify(last20));
}
