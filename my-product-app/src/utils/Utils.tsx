export const useUtils = () => {

    const generateUniqueId = (): string => {
        // Generate a random number and convert it to a string
        const randomNumber = Math.random() * 1000000;
        const randomString = randomNumber.toString();
    
        // Get the current timestamp and convert it to a string
        const timestamp = Date.now().toString();
    
        // Concatenate the random string and timestamp to create a unique ID
        const uniqueId = randomString + timestamp;
    
        return uniqueId;
      };

      return {generateUniqueId};
};
