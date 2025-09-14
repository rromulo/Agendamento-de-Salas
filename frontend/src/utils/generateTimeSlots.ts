export const generateTimeSlots = (
  openTime: string, 
  closeTime: string, 
  scheduleBlock: string
): string[] => {
  const timeSlots: string[] = [];
  const [openHours, openMinutes] = openTime.split(':').map(Number);
  const [closeHours, closeMinutes] = closeTime.split(':').map(Number);
  
  const openTotalMinutes = openHours * 60 + openMinutes;
  const closeTotalMinutes = closeHours * 60 + closeMinutes;
  
  let currentMinutes = openTotalMinutes;
  
  while (currentMinutes + Number(scheduleBlock) <= closeTotalMinutes) {
    const startHours = Math.floor(currentMinutes / 60);
    const startMinutes = currentMinutes % 60;
    const startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
    
    const endMinutes = currentMinutes + Number(scheduleBlock);
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
    
    timeSlots.push(`${startTime} as ${endTime}`);
    
    currentMinutes += Number(scheduleBlock);
  }
  return timeSlots;
};