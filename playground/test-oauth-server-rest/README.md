# Test Google OAuth2

## Summary

Base setup for read account Google drive

## References (Spam Frontline Pilot)
- [Google: Spam Frontline Pilot dashboard](https://console.cloud.google.com/home/dashboard?project=spam-frontline-pilot)

## Install live certificates
Download live certificates:
```
scp opx:~/ws-archive/certs.tar.gz.bin ~/ws-archive/certs.tar.gz.bin
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv
```

## Manage secrets
Download secrets:
```
scp opx:~/ws-archive/pilot.tar.gz.enc ~/ws-archive/pilot.tar.gz.enc
openssl enc -d -aes-128-cbc -pbkdf2 -salt -in ~/ws-archive/pilot.tar.gz.enc | tar xzv
```
Upload secrets:
```
tar czv secrets | openssl enc -aes-128-cbc -pbkdf2 -salt -out ~/ws-archive/pilot.tar.gz.enc
scp ~/ws-archive/pilot.tar.gz.enc opx:~/ws-archive/pilot.tar.gz.enc
```
## Setup DNS
Verify `spamfro.xyz` points `127.0.0.1`. Setup at https://namecheap.com if necessary.
```
dig spamfro.xyz | grep '^spamfro.xyz'
  spamfro.xyz.            1759    IN      A       127.0.0.1
```

## Run the app
```
npm install
node index
```