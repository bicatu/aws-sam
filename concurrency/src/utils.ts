export const waitRandomTime = async (): Promise<void> => {
    const randomTime = Math.floor(Math.random() * 10) + 1; // generates a random number between 1 and 10
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
      }, randomTime * 1000); // converts the random number to milliseconds
    });
};
