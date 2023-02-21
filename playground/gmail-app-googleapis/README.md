# Playground Google Drive 

Access GMail from SPA with Google APIs client library

## References
- [Google: quickstart](https://developers.google.com/gmail/api/quickstart/js)
- [Google: GMail API](https://developers.google.com/gmail/api/reference/rest)
- [Google: GMail API discovery document](https://gmail.googleapis.com/$discovery/rest?version=v1)
- [GitHub: typings](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/gapi)

## Install live certificates
```
scp opx:~/ws-archive/certs.tar.gz.bin ~/ws-archive/certs.tar.gz.bin
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv
```

## Manage secrets
Push secrets:
```
tar czv secrets | openssl enc -aes-128-cbc -pbkdf2 -salt -out ~/ws-archive/pilot.tar.gz.enc
scp ~/ws-archive/pilot.tar.gz.enc opx:~/ws-archive/pilot.tar.gz.enc
```
Fetch secrets:
```
scp opx:~/ws-archive/pilot.tar.gz.enc ~/ws-archive/pilot.tar.gz.enc
openssl enc -d -aes-128-cbc -pbkdf2 -salt -in ~/ws-archive/pilot.tar.gz.enc | tar xzv
```

## Setup DNS
Verify `spamfro.xyz` points `127.0.0.1`. Setup at https://namecheap.com if necessary.
```
dig spamfro.xyz | grep '^spamfro.xyz'
  spamfro.xyz.            1759    IN      A       127.0.0.1
```

## Run the app
```
npx http-server ./app -c-1 --ssl -a spamfro.xyz -p 3443 --cert ./certs/cert.pem --key ./certs/cert-key-nopassword.pem

```
