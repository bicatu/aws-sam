export const handler = (): string => {
    return Math.floor(new Date().getTime() / 1000).toString();
};
