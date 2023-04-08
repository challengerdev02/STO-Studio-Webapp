// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegexMed = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const truncateRegexShort = /^(k[a-zA-Z0-9]{0})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const truncateRegexLong = /^([a-zA-Z0-9]{6})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/;
/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (
  address: string,
  size: 'long' | 'med' | 'short' = 'long'
) => {
  let regex: any;
  switch (size) {
    case 'long':
      regex = truncateRegexLong;
      break;
    case 'med':
      regex = truncateRegexMed;
      break;
    default:
      truncateRegexShort;
      break;
  }
  const match = address?.match(regex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
