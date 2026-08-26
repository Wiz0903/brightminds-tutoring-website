const addRecentActivity = (activityType, activityMessage) => {
    const today = new Date();
    const isoString = today.toISOString();

    const activity = {
        type: activityType,
        message: activityMessage,
        date: isoString.slice(0, 10),
        time: isoString.slice(11, 16)
    }

    const JSONstring = localStorage.getItem('activities')
    const activityArray = JSON.parse(JSONstring) || [];
    activityArray.push(activity);
    const last20 = activityArray.slice(-20); 
    localStorage.setItem('activities', JSON.stringify(last20));
}