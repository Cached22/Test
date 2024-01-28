const crypto = require('crypto');
const config = require('../config');

const encryption = {
  encrypt: function(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(config.encryptionKey), config.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  },

  decrypt: function(text) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(config.encryptionKey), config.iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
};

module.exports = encryption;