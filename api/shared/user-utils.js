const getUser = (req) => {
    const header = req.headers["x-ms-client-principal"];
    if (header != undefined) {
        const encoded = Buffer.from(header, "base64");
        const decoded = encoded.toString("ascii");

        return JSON.parse(decoded);
    } else {
        return { userDetails: "John Doe" };
    }
};

function getUserBrowser(userAgent) {
  if (userAgent.includes('Firefox') && !userAgent.includes('Seamonkey'))
    return 'Firefox';
  if (userAgent.includes('Seamonkey'))
    return 'Seamonkey';
  if (userAgent.includes('Chrome') && !userAgent.includes('Chromium'))
    return 'Chrome';
  if (userAgent.includes('Chromium'))
    return 'Chromium';
  if (userAgent.includes('Safari'))
    return 'Safari';
  if (userAgent.includes('OPR') || userAgent.includes('Opera'))
    return 'Opera';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident/7.0') || userAgent.includes('.*rv:'))
    return 'IE';
  return 'Unknown';
};

module.exports = { getUser, getUserBrowser };