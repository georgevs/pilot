# Test Google OAuth2

## Summary

Base setup for read account GMail

## Install live certificates
```
scp opx:~/ws-archive/certs.tar.gz.bin ~/ws-archive/certs.tar.gz.bin

openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv --directory ./
```

## Manage secrets
```
tar czv secrets | openssl enc -aes-128-cbc -pbkdf2 -salt -out ~/ws-archive/test-oauth-pilot.tar.gz.enc
scp ~/ws-archive/test-oauth-pilot.tar.gz.enc opx:~/ws-archive/test-oauth-pilot.tar.gz.enc

scp opx:~/ws-archive/test-oauth-pilot.tar.gz.enc ~/ws-archive/test-oauth-pilot.tar.gz.enc
openssl enc -d -aes-128-cbc -pbkdf2 -salt -in ~/ws-archive/test-oauth-pilot.tar.gz.enc | tar xzv
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
