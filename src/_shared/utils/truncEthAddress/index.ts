// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegexLong = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const truncateRegexShort = /^(0x[a-zA-Z0-9]{0})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (address: string, size = 'long') => {
  const match = address?.match(
    size == 'long' ? truncateRegexLong : truncateRegexShort
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
