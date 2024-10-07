// src/utils/dateUtils.js

export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Format date parts
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    // Format time parts
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Return formatted date and time: "dd/MM/yyyy HH:mm"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  