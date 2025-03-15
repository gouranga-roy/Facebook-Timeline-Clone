// Time Stamp
function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };
    
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 172800) return "Yesterday";
    
    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
        }
    }
    
    return "Just now";
}

// Create Id
function createID() {
    const timestamp = Math.floor(Date.now() / 1000).toString(16); // 4-byte timestamp
    const random = Math.random().toString(16).substring(2, 12); // 5-byte random value
    const counter = (Math.floor(Math.random() * 16777215)).toString(16).padStart(6, '0'); // 3-byte counter

    return (timestamp + random + counter).padEnd(24, '0'); // Ensure 24 chars
}

// Example usage:
console.log(generateObjectId());
console.log(createID());


