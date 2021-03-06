
module.exports.readableNumber = function readableNumber(num) {
  var str = num.toLocaleString();
  var parts = str.split(",");
  switch(parts.length) {
    case 5:
      return parts[0] + "." + parts[1] + "T";
    case 4:
      return parts[0] + "." + parts[1] + "B";
    case 3:
      return parts[0] + "." + parts[1] + "M";
    case 2:
      return parts[0] + "." + parts[1] + "K";
    case 1:
    default:
      return str;
  }
}

module.exports.getTabbing = function getTabbing(str) {
  let spacing = "\t";
  if (str.length < 7) {
    spacing = "\t\t\t";
  } else if (str.length < 15) {
    spacing = "\t\t";
  }
  return spacing
}

module.exports.printAxiosError = function printAxiosError(message, error) {
  console.error(message);
  console.error(error.message);
  console.error(
    error.response.status + " " + error.response.statusText + " - " +
    error.request.method + " " + error.request.path
  );
}
