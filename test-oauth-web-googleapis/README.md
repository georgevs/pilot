# Test Google OAuth2

## Summary

Client side web app calling Google API client library

## Install live certificates
```
scp opx:~/ws-archive/certs.tar.gz.bin ~/ws-archive/certs.tar.gz.bin

openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv --directory ./
```

## Setup DNS
Verify `spamfro.xyz` points `127.0.0.1`. Setup at https://namecheap.com if necessary.
```
dig spamfro.xyz | grep '^spamfro.xyz'
  spamfro.xyz.            1759    IN      A       127.0.0.1
```

## Run the app
```
cd backend
npm install
node index
```
