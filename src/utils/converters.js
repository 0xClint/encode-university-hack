export const shortenAddress = (address, starting = 4, ending = 4) => {
  if (!address || address?.length < length * 2 + 2) {
    return "";
  }

  const start = address.slice(0, starting);
  const end = address.slice(-ending);

  return `${start}...${end}`;
};

export const secondsToDay = (seconds) => {
  return Math.floor(Number(seconds) / (60 * 60 * 24));
};

export const convertToJSON = (data) => {
  const arrayBuffer = new Uint8Array(data).buffer;

  const decodedString = new TextDecoder().decode(arrayBuffer);
  const jsonData = JSON.parse(decodedString);

  return jsonData;
};
