export const calculateHash = async (index, previousHash, timestamp, data, nonce) => {
  const message = `${index}${previousHash}${timestamp}${data}${nonce}`;
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Synchronous version for simple UI updates if needed, though Web Crypto is async.
// Since we must use Web Crypto API SHA-256, all hashing is async.
