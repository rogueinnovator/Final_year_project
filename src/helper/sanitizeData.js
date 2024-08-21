export default function sanitizeData(obj) {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeData);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      //take the array and convert it to the object
      Object.entries(obj).map(([key, value]) => [key, sanitizeData(value)]),
      //while the entries convert the object to array
    );
  }
  return obj; //retrun the orignal obj if none of the condtiion is meet
}
