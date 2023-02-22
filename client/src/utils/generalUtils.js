function generateOTP(len) {
  len = len || 4;
  var charSet = "0123456789";
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * 0.9 * charSet.length);
    randomString += charSet[randomPoz];
  }
  return randomString;
}

export { generateOTP };
