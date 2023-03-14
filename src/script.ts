// entry point for the content-script loaded in the web page
// the application running in the pop-up can communicate with this script
// via chrome messaging

export const sample = () => console.log("Hello");

sample();
