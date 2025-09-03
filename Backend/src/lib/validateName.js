export function isValidUsername(username) {
    const regex = /^[A-Za-z]+$/;

    return regex.test(username);
}
export function containsMyName(str) {
    const lowerStr = str.toLowerCase();
    const blockedNames = process.env.BLOCKED_NAMES?.split(",") || [];
  
    return blockedNames.some(name => lowerStr.includes(name));
  }
  
  

