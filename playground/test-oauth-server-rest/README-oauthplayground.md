# Google drive playground

## Reference

- [Playground](https://developers.google.com/oauthplayground)
- [Google drive API reference](https://developers.google.com/gmail/api/reference/rest)

## Select and authorize
```
HTTP/1.1 302 Found
Location: https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.readonly&access_type=offline

...

GET /oauthplayground/?code=4/0AWtgzh7PKi9kde8IZ-iwRKms5TL3Sq5GV_K_APFeXeHpJeNY7Zrvs8CpaWR1grdCnHH9cw&scope=https://www.googleapis.com/auth/drive.readonly HTTP/1.1
```

## Exchange authorization code for tokens
```
POST /token HTTP/1.1
content-type: application/x-www-form-urlencoded
code=4%2F0AWtgzh7PKi9kde8IZ-iwRKms5TL3Sq5GV_K_APFeXeHpJeNY7Zrvs8CpaWR1grdCnHH9cw&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=407408718192.apps.googleusercontent.com&client_secret=************&scope=&grant_type=authorization_code

HTTP/1.1 200 OK
{
  "access_token": "ya29.a0AV...163", 
  "scope": "https://www.googleapis.com/auth/drive.readonly", 
  "token_type": "Bearer", 
  "expires_in": 3599, 
  "refresh_token": "1//04C...Q3U"
}
```

## List files
```
GET /drive/v3/files HTTP/1.1
Authorization: Bearer ya29.a0AV...163

HTTP/1.1 200 OK
{
  "files": [
    {
      "mimeType": "application/vnd.google-apps.spreadsheet", 
      "kind": "drive#file", 
      "id": "1A8ee1ZRvWl-R8LSG5JXfSR9q9B9eHo9Diug6ygQHYZY", 
      "name": "Balances"
    }, 
  ...
```

## Export spreadsheet in ODS file format
See [Google: export formats reference](https://developers.google.com/drive/api/guides/ref-export-formats)
```
GET /drive/v3/files/1A8ee1ZRvWl-R8LSG5JXfSR9q9B9eHo9Diug6ygQHYZY/export?mimeType=application/x-vnd.oasis.opendocument.spreadsheet HTTP/1.1
Authorization: Bearer ya29.a0AV...163

HTTP/1.1 200 OK
PK...
```
