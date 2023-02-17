# GMail playground

## Reference

- [Playground](https://developers.google.com/oauthplayground)
- [GMail API reference](https://developers.google.com/gmail/api/reference/rest)
- [Deimto: google oauth with curl](../../../youtube/deimto/google-oauth-curl/README.md)

## Select and authorize APIs
```
HTTP/1.1 302 Found
Location: https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2F&access_type=offline

GET /oauthplayground/?code=4/0AWtgzh55PkwKWubgukn725G2Fm5rFA10F-6xhujZKy_0Vim7SOMXEOC9AVs2CqE9xWVJlQ&scope=https://mail.google.com/ HTTP/1.1
Host: developers.google.com
```

## Exchange authorization code for tokens
```
POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-length: 261
content-type: application/x-www-form-urlencoded
user-agent: google-oauth-playground
code=4%2F0AWtgzh55PkwKWubgukn725G2Fm5rFA10F-6xhujZKy_0Vim7SOMXEOC9AVs2CqE9xWVJlQ&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=407408718192.apps.googleusercontent.com&client_secret=************&scope=&grant_type=authorization_code

HTTP/1.1 200 OK
Content-length: 447
X-xss-protection: 0
X-content-type-options: nosniff
Transfer-encoding: chunked
Expires: Mon, 01 Jan 1990 00:00:00 GMT
Vary: Origin, X-Origin, Referer
Server: scaffolding on HTTPServer2
-content-encoding: gzip
Pragma: no-cache
Cache-control: no-cache, no-store, max-age=0, must-revalidate
Date: Sat, 28 Jan 2023 18:03:18 GMT
X-frame-options: SAMEORIGIN
Alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-type: application/json; charset=utf-8
{
  "access_token": "ya29.a0AVvZVsroPQXeapUqIt8CJOfBQ0SgruWiuIa2pZrVHoHXJewqw0dRLNOyqFqjtJU40apyba03cFEGeFOo1dCNrNmckWRkWuTY29OxDw-KtmKrX-EdO11TJWciCclhMJw5zfmoe8Re_Y0vK6zbVy8bnGe2G_YGaCgYKAeUSARESFQGbdwaIuuloi-rvd4o7lSUIyEsI2Q0163", 
  "scope": "https://mail.google.com/", 
  "token_type": "Bearer", 
  "expires_in": 3599, 
  "refresh_token": "1//04bZnRCvu9KkLCgYIARAAGAQSNwF-L9IrlkcrgWOw3xzYkhe0zo5TFhLFyw93jCVfs2VmN4ClTiKWJNe9TbyyOLLyVLGN3TAwkLQ"
}
```

## GMail users.getProfile
```
GET /gmail/v1/users/spam.frontline.pilot@gmail.com/profile HTTP/1.1
Host: gmail.googleapis.com
Content-length: 0
Authorization: Bearer ya29.a0AVvZVsroPQXeapUqIt8CJOfBQ0SgruWiuIa2pZrVHoHXJewqw0dRLNOyqFqjtJU40apyba03cFEGeFOo1dCNrNmckWRkWuTY29OxDw-KtmKrX-EdO11TJWciCclhMJw5zfmoe8Re_Y0vK6zbVy8bnGe2G_YGaCgYKAeUSARESFQGbdwaIuuloi-rvd4o7lSUIyEsI2Q0163

HTTP/1.1 200 OK
Content-length: 121
X-xss-protection: 0
Content-location: https://gmail.googleapis.com/gmail/v1/users/spam.frontline.pilot@gmail.com/profile
X-content-type-options: nosniff
Transfer-encoding: chunked
Vary: Origin, X-Origin, Referer
Server: ESF
-content-encoding: gzip
Cache-control: private
Date: Sat, 28 Jan 2023 18:05:37 GMT
X-frame-options: SAMEORIGIN
Alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-type: application/json; charset=UTF-8
{
  "threadsTotal": 2, 
  "emailAddress": "spam.frontline.pilot@gmail.com", 
  "historyId": "1501", 
  "messagesTotal": 3
}
```

## GMail users.labels.list
```
GET /gmail/v1/users/spam.frontline.pilot@gmail.com/labels HTTP/1.1
Host: gmail.googleapis.com
Content-length: 0
Authorization: Bearer ya29.a0AVvZVsroPQXeapUqIt8CJOfBQ0SgruWiuIa2pZrVHoHXJewqw0dRLNOyqFqjtJU40apyba03cFEGeFOo1dCNrNmckWRkWuTY29OxDw-KtmKrX-EdO11TJWciCclhMJw5zfmoe8Re_Y0vK6zbVy8bnGe2G_YGaCgYKAeUSARESFQGbdwaIuuloi-rvd4o7lSUIyEsI2Q0163

HTTP/1.1 200 OK
Content-length: 1992
X-xss-protection: 0
Content-location: https://gmail.googleapis.com/gmail/v1/users/spam.frontline.pilot@gmail.com/labels
X-content-type-options: nosniff
Transfer-encoding: chunked
Vary: Origin, X-Origin, Referer
Server: ESF
-content-encoding: gzip
Cache-control: private
Date: Sat, 28 Jan 2023 18:09:20 GMT
X-frame-options: SAMEORIGIN
Alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-type: application/json; charset=UTF-8
{
  "labels": [
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "CHAT", 
      "name": "CHAT"
    }, 
    {
      "type": "system", 
      "id": "SENT", 
      "name": "SENT"
    }, 
    {
      "type": "system", 
      "id": "INBOX", 
      "name": "INBOX"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "IMPORTANT", 
      "name": "IMPORTANT"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "TRASH", 
      "name": "TRASH"
    }, 
    {
      "type": "system", 
      "id": "DRAFT", 
      "name": "DRAFT"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "SPAM", 
      "name": "SPAM"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "CATEGORY_FORUMS", 
      "name": "CATEGORY_FORUMS"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "CATEGORY_UPDATES", 
      "name": "CATEGORY_UPDATES"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "CATEGORY_PERSONAL", 
      "name": "CATEGORY_PERSONAL"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "CATEGORY_PROMOTIONS", 
      "name": "CATEGORY_PROMOTIONS"
    }, 
    {
      "type": "system", 
      "labelListVisibility": "labelHide", 
      "messageListVisibility": "hide", 
      "id": "CATEGORY_SOCIAL", 
      "name": "CATEGORY_SOCIAL"
    }, 
    {
      "type": "system", 
      "id": "STARRED", 
      "name": "STARRED"
    }, 
    {
      "type": "system", 
      "id": "UNREAD", 
      "name": "UNREAD"
    }
  ]
}
```

## GMail users.messages.list
```
GET /gmail/v1/users/spam.frontline.pilot@gmail.com/messages HTTP/1.1
Host: gmail.googleapis.com
Content-length: 0
Authorization: Bearer ya29.a0AVvZVsroPQXeapUqIt8CJOfBQ0SgruWiuIa2pZrVHoHXJewqw0dRLNOyqFqjtJU40apyba03cFEGeFOo1dCNrNmckWRkWuTY29OxDw-KtmKrX-EdO11TJWciCclhMJw5zfmoe8Re_Y0vK6zbVy8bnGe2G_YGaCgYKAeUSARESFQGbdwaIuuloi-rvd4o7lSUIyEsI2Q0163

HTTP/1.1 200 OK
Content-length: 296
X-xss-protection: 0
Content-location: https://gmail.googleapis.com/gmail/v1/users/spam.frontline.pilot@gmail.com/messages
X-content-type-options: nosniff
Transfer-encoding: chunked
Vary: Origin, X-Origin, Referer
Server: ESF
-content-encoding: gzip
Cache-control: private
Date: Sat, 28 Jan 2023 18:11:53 GMT
X-frame-options: SAMEORIGIN
Alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-type: application/json; charset=UTF-8
{
  "resultSizeEstimate": 3, 
  "messages": [
    {
      "id": "185f982f676c6f0a", 
      "threadId": "185f97de3620fa06"
    }, 
    {
      "id": "185f97de3620fa06", 
      "threadId": "185f97de3620fa06"
    }, 
    {
      "id": "185f9494e4698296", 
      "threadId": "185f9494e4698296"
    }
  ]
}
```

## GMail users.messages.get
```
GET /gmail/v1/users/spam.frontline.pilot@gmail.com/messages/185f982f676c6f0a HTTP/1.1
Host: gmail.googleapis.com
Content-length: 0
Authorization: Bearer ya29.a0AVvZVsroPQXeapUqIt8CJOfBQ0SgruWiuIa2pZrVHoHXJewqw0dRLNOyqFqjtJU40apyba03cFEGeFOo1dCNrNmckWRkWuTY29OxDw-KtmKrX-EdO11TJWciCclhMJw5zfmoe8Re_Y0vK6zbVy8bnGe2G_YGaCgYKAeUSARESFQGbdwaIuuloi-rvd4o7lSUIyEsI2Q0163

HTTP/1.1 200 OK
Content-length: 15466
X-xss-protection: 0
Content-location: https://gmail.googleapis.com/gmail/v1/users/spam.frontline.pilot@gmail.com/messages/185f982f676c6f0a
X-content-type-options: nosniff
Transfer-encoding: chunked
Vary: Origin, X-Origin, Referer
Server: ESF
-content-encoding: gzip
Cache-control: private
Date: Sat, 28 Jan 2023 18:17:05 GMT
X-frame-options: SAMEORIGIN
Alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-type: application/json; charset=UTF-8
{
  "internalDate": "1674928387000", 
  "historyId": "1480", 
  "id": "185f982f676c6f0a", 
  "snippet": "Google APIs Explorer was granted access to your Google Account spam.frontline.pilot@gmail.com If you did not grant access, you should check this activity and secure your account. Check activity You can", 
  "sizeEstimate": 11786, 
  "threadId": "185f97de3620fa06", 
  "labelIds": [
    "UNREAD", 
    "INBOX"
  ], 
  "payload": {
    "mimeType": "multipart/alternative", 
    "body": {
      "size": 0
    }, 
    "partId": "", 
    "filename": "", 
    "headers": [
      {
        "name": "Delivered-To", 
        "value": "spam.frontline.pilot@gmail.com"
      }, 
      {
        "name": "Received", 
        "value": "by 2002:adf:e341:0:0:0:0:0 with SMTP id n1csp1475868wrj;        Sat, 28 Jan 2023 09:53:07 -0800 (PST)"
      }, 
      {
        "name": "X-Received", 
        "value": "by 2002:a81:538b:0:b0:500:550f:38c9 with SMTP id h133-20020a81538b000000b00500550f38c9mr4313034ywb.5.1674928387662;        Sat, 28 Jan 2023 09:53:07 -0800 (PST)"
      }, 
      {
        "name": "ARC-Seal", 
        "value": "i=1; a=rsa-sha256; t=1674928387; cv=none;        d=google.com; s=arc-20160816;        b=Hn0dNDvndjJ0fivrxSekE+yn+jLqqLz0e2l+0rn2hZ1aEMAcTOlYE6NNJtoZruF9ay         yNkyyIt8ZF2hApyb1uLa4qx8IuUsgcaLvGBaqGllw/zp5qP6UnNP8YQ9Rq6wB07r/rOy         Zf5e1G5irMR8K0O7clDbFM2lGqPnHy5FQhb0m4JRBW2C+2nosFF+aqR4qLRqbNtJMRV7         tbY2KSUysFfX4KlHj8QbXMxCFwVYsyCva+BtfCf92fyboIGJUXsDbeYYhfwpC64Gt8Oc         BgcIozKBeeorluppO4vJzgUPhUWUfRhqAhInCkpmSYgb5z/OoooxhCv2PbAa/lOhtNYb         AxDg=="
      }, 
      {
        "name": "ARC-Message-Signature", 
        "value": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=to:from:subject:message-id:feedback-id:date:mime-version         :dkim-signature;        bh=AAiKUR4b2uKsE4pawd+JhQt2jmrccgl+7m7FNkFcJCw=;        b=W5xphzuk+mwAABIIrrjd/TuNzeIexGxNqXLBVJSNYej8S+goi1aDZ/nYQ/CJWOvPpM         OxnnEEC31oAK/vf5kiWadlrk5YCS40eYgQL9kB4RggIE0iBaoCUBGUJnbchlOz4lHLDS         4qJ2ldsC2vDQVj8/GqbD9Uc2LcebWMfywlzx1jK78JYCG92UD8ZPQ2KqGd6+4p1Xy9gG         a9FO0JkXBg/4/JVk4dX76iOJteITVUhzxKMJqmh/dPncHv3fP66YWe81iKk2Z6xeLL9l         pPr5uzxO/XwROLsvXVis+I1QjyHD0jVBMxx+K1jRvVo0bSnPIY6cniWisUJ6qfu9GAf2         xiNg=="
      }, 
      {
        "name": "ARC-Authentication-Results", 
        "value": "i=1; mx.google.com;       dkim=pass header.i=@accounts.google.com header.s=20210112 header.b=kCxMUdMM;       spf=pass (google.com: domain of 3a2hvywgtaeapq-tgrn0ceeqwpvu.iqqing.eqo@gaia.bounces.google.com designates 209.85.220.73 as permitted sender) smtp.mailfrom=3A2HVYwgTAEApq-tgrn0ceeqwpvu.iqqing.eqo@gaia.bounces.google.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=accounts.google.com"
      }, 
      {
        "name": "Return-Path", 
        "value": "<3A2HVYwgTAEApq-tgrn0ceeqwpvu.iqqing.eqo@gaia.bounces.google.com>"
      }, 
      {
        "name": "Received", 
        "value": "from mail-sor-f73.google.com (mail-sor-f73.google.com. [209.85.220.73])        by mx.google.com with SMTPS id t15-20020a81780f000000b0036874a33939sor3678346ywc.115.2023.01.28.09.53.07        for <spam.frontline.pilot@gmail.com>        (Google Transport Security);        Sat, 28 Jan 2023 09:53:07 -0800 (PST)"
      }, 
      {
        "name": "Received-SPF", 
        "value": "pass (google.com: domain of 3a2hvywgtaeapq-tgrn0ceeqwpvu.iqqing.eqo@gaia.bounces.google.com designates 209.85.220.73 as permitted sender) client-ip=209.85.220.73;"
      }, 
      {
        "name": "Authentication-Results", 
        "value": "mx.google.com;       dkim=pass header.i=@accounts.google.com header.s=20210112 header.b=kCxMUdMM;       spf=pass (google.com: domain of 3a2hvywgtaeapq-tgrn0ceeqwpvu.iqqing.eqo@gaia.bounces.google.com designates 209.85.220.73 as permitted sender) smtp.mailfrom=3A2HVYwgTAEApq-tgrn0ceeqwpvu.iqqing.eqo@gaia.bounces.google.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=accounts.google.com"
      }, 
      {
        "name": "DKIM-Signature", 
        "value": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=accounts.google.com; s=20210112;        h=to:from:subject:message-id:feedback-id:date:mime-version:from:to:cc         :subject:date:message-id:reply-to;        bh=AAiKUR4b2uKsE4pawd+JhQt2jmrccgl+7m7FNkFcJCw=;        b=kCxMUdMMPQRmEnlk4qVvNMMRAHZQ1QljULLGb5iwUMWSmlSWEd4NSJ6Eb37T6UjgsY         /PdJC4oGIzpqxkmVcM/Z5+XhBUSAYl4d/APw1ruB/g2/0dHXMRbkA9jrBJYMR1veFVnZ         4Egn0UWfrZ9M/gFplcfhiazSqHVNKwz7LMdLbuhLnq9YoOLkwVRH6/RypUDI0TA6hj44         WSGM5JxEisNIhs4cr7f/XQNBxL7aUYf+X+J54QjutWSU2/fs6RE8H6ZiYLqLpZy8nor6         100myOuXA4ifZZS+daVkijReynWOx+YAQulFo1G8QjLY8JTIseaTlVyrkRhsOUxmCkpk         +gUQ=="
      }, 
      {
        "name": "X-Google-DKIM-Signature", 
        "value": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20210112;        h=to:from:subject:message-id:feedback-id:date:mime-version         :x-gm-message-state:from:to:cc:subject:date:message-id:reply-to;        bh=AAiKUR4b2uKsE4pawd+JhQt2jmrccgl+7m7FNkFcJCw=;        b=i0WIWAV/UR6FDWIUVULkiFr2t5BZ83xDkR5afe52H6Uuo9GbfKMXlL2W9rELZ3DTov         FI2BVa8G2OZo+ZyEOwZcppp5v//cFH7ucAHEunW9jhR9/1O6prAlPO3IqpUeDdhOZ/pl         fWfZveaoghU4O5QKqkB/5X49ffP40BYKB6GQD8EFfnx+bYPatDh1pK65XWiqRWEySJMG         KRR4lTR1kAQ1xqjiueBCRpES9VSaj/QfKHIa6I264E4N92CGmBPIa2kuzi2aE+B+5og4         XNZ8/bfjV86ff65HriDBln4eAIgb6+glRD7IAgQGUIASFpHiScTdN/Igiuw5e2XDPDhq         CPPg=="
      }, 
      {
        "name": "X-Gm-Message-State", 
        "value": "AFqh2kp1CxnnbBIJgwoLN66VVjm6sD7RccANJ/Wl3PJ8/wMjevozr9Rm YkVhc1KchrxnlerWJZXFV0rFI6AWShcGdYzbTUrzUA=="
      }, 
      {
        "name": "X-Google-Smtp-Source", 
        "value": "AMrXdXukjAgb6uEFgAtga4uh7BheYX1UIlOln0mJKNZvtkdO48ma6pQa8yEny7tyobqGRso5IWSBzGLB0/RwBavIN1dcow=="
      }, 
      {
        "name": "MIME-Version", 
        "value": "1.0"
      }, 
      {
        "name": "X-Received", 
        "value": "by 2002:a81:d550:0:b0:4f7:b422:92d3 with SMTP id l16-20020a81d550000000b004f7b42292d3mr4494819ywj.180.1674928387399; Sat, 28 Jan 2023 09:53:07 -0800 (PST)"
      }, 
      {
        "name": "Date", 
        "value": "Sat, 28 Jan 2023 17:53:07 GMT"
      }, 
      {
        "name": "X-Account-Notification-Type", 
        "value": "127"
      }, 
      {
        "name": "Feedback-ID", 
        "value": "127:account-notifier"
      }, 
      {
        "name": "X-Notifications", 
        "value": "3ae65825c8380000"
      }, 
      {
        "name": "X-Notifications-Bounce-Info", 
        "value": "AWY41VakwW0l7YBCEAQ-hFUxo_O7X4Xlhp2T5qYKgB2C4QQpV_jft1Jj0oaUuDKLzBXOW8GDtQgbB7X0bRCrUF1DErSG4YhJXlhsefeYnt1rmG7QmtjZlewkfwqBEoUW3CuDhNKUbF1u5KjaJsevNOeSSH3o7Ag9Ve3WtMXbGXKR4Ac2HxaRBEqKvhD6_NQw4m6qF_BuJ6i6pNlu7VwNjAwNjA0MDQxNTM1NTk2OTMzMg"
      }, 
      {
        "name": "Message-ID", 
        "value": "<U5ZL2NEJyWBnC_Dc_HDk_Q@notifications.google.com>"
      }, 
      {
        "name": "Subject", 
        "value": "Security alert"
      }, 
      {
        "name": "From", 
        "value": "Google <no-reply@accounts.google.com>"
      }, 
      {
        "name": "To", 
        "value": "spam.frontline.pilot@gmail.com"
      }, 
      {
        "name": "Content-Type", 
        "value": "multipart/alternative; boundary=\"0000000000008e217705f356a747\""
      }
    ], 
    "parts": [
      {
        "mimeType": "text/plain", 
        "headers": [
          {
            "name": "Content-Type", 
            "value": "text/plain; charset=\"UTF-8\"; format=flowed; delsp=yes"
          }, 
          {
            "name": "Content-Transfer-Encoding", 
            "value": "base64"
          }
        ], 
        "body": {
          "data": "W2ltYWdlOiBHb29nbGVdDQpHb29nbGUgQVBJcyBFeHBsb3JlciB3YXMgZ3JhbnRlZCBhY2Nlc3MgdG8geW91ciBHb29nbGUgQWNjb3VudA0KDQoNCnNwYW0uZnJvbnRsaW5lLnBpbG90QGdtYWlsLmNvbQ0KDQpJZiB5b3UgZGlkIG5vdCBncmFudCBhY2Nlc3MsIHlvdSBzaG91bGQgY2hlY2sgdGhpcyBhY3Rpdml0eSBhbmQgc2VjdXJlIHlvdXINCmFjY291bnQuDQpDaGVjayBhY3Rpdml0eQ0KPGh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9BY2NvdW50Q2hvb3Nlcj9FbWFpbD1zcGFtLmZyb250bGluZS5waWxvdEBnbWFpbC5jb20mY29udGludWU9aHR0cHM6Ly9teWFjY291bnQuZ29vZ2xlLmNvbS9hbGVydC9udC8xNjc0OTI4Mzg3MDAwP3JmbiUzRDEyNyUyNnJmbmMlM0QxJTI2ZWlkJTNELTI3MDk5NjQ3OTQ5Mzc1NjM3NDMlMjZldCUzRDA-DQpZb3UgY2FuIGFsc28gc2VlIHNlY3VyaXR5IGFjdGl2aXR5IGF0DQpodHRwczovL215YWNjb3VudC5nb29nbGUuY29tL25vdGlmaWNhdGlvbnMNCllvdSByZWNlaXZlZCB0aGlzIGVtYWlsIHRvIGxldCB5b3Uga25vdyBhYm91dCBpbXBvcnRhbnQgY2hhbmdlcyB0byB5b3VyDQpHb29nbGUgQWNjb3VudCBhbmQgc2VydmljZXMuDQrCqSAyMDIzIEdvb2dsZSBJcmVsYW5kIEx0ZC4sIEdvcmRvbiBIb3VzZSwgQmFycm93IFN0cmVldCwgRHVibGluIDQsIElyZWxhbmQNCg==", 
          "size": 688
        }, 
        "partId": "0", 
        "filename": ""
      }, 
      {
        "mimeType": "text/html", 
        "headers": [
          {
            "name": "Content-Type", 
            "value": "text/html; charset=\"UTF-8\""
          }, 
          {
            "name": "Content-Transfer-Encoding", 
            "value": "quoted-printable"
          }
        ], 
        "body": {
          "data": "PCFET0NUWVBFIGh0bWw-PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIG5hbWU9ImZvcm1hdC1kZXRlY3Rpb24iIGNvbnRlbnQ9ImVtYWlsPW5vIi8-PG1ldGEgbmFtZT0iZm9ybWF0LWRldGVjdGlvbiIgY29udGVudD0iZGF0ZT1ubyIvPjxzdHlsZSBub25jZT0iMHEyODE0ZVRzTmFmblViYTBRaDVkQSI-LmF3bCBhIHtjb2xvcjogI0ZGRkZGRjsgdGV4dC1kZWNvcmF0aW9uOiBub25lO30gLmFibWwgYSB7Y29sb3I6ICMwMDAwMDA7IGZvbnQtZmFtaWx5OiBSb2JvdG8tTWVkaXVtLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO30gLmFkZ2wgYSB7Y29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7IHRleHQtZGVjb3JhdGlvbjogbm9uZTt9IC5hZmFsIGEge2NvbG9yOiAjYjBiMGIwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7fSBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkgey52MnNwIHtwYWRkaW5nOiA2cHggMzBweCAwcHg7fSAudjJyc3Age3BhZGRpbmc6IDBweCAxMHB4O319IEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7Lm1kdjJydyB7cGFkZGluZzogNDBweCA0MHB4O319IDwvc3R5bGU-PGxpbmsgaHJlZj0iLy9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M_ZmFtaWx5PUdvb2dsZStTYW5zIiByZWw9InN0eWxlc2hlZXQiIHR5cGU9InRleHQvY3NzIiBub25jZT0iMHEyODE0ZVRzTmFmblViYTBRaDVkQSIvPjwvaGVhZD48Ym9keSBzdHlsZT0ibWFyZ2luOiAwOyBwYWRkaW5nOiAwOyIgYmdjb2xvcj0iI0ZGRkZGRiI-PHRhYmxlIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0eWxlPSJtaW4td2lkdGg6IDM0OHB4OyIgYm9yZGVyPSIwIiBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjAiIGxhbmc9ImVuIj48dHIgaGVpZ2h0PSIzMiIgc3R5bGU9ImhlaWdodDogMzJweDsiPjx0ZD48L3RkPjwvdHI-PHRyIGFsaWduPSJjZW50ZXIiPjx0ZD48ZGl2IGl0ZW1zY29wZSBpdGVtdHlwZT0iLy9zY2hlbWEub3JnL0VtYWlsTWVzc2FnZSI-PGRpdiBpdGVtcHJvcD0iYWN0aW9uIiBpdGVtc2NvcGUgaXRlbXR5cGU9Ii8vc2NoZW1hLm9yZy9WaWV3QWN0aW9uIj48bGluayBpdGVtcHJvcD0idXJsIiBocmVmPSJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vQWNjb3VudENob29zZXI_RW1haWw9c3BhbS5mcm9udGxpbmUucGlsb3RAZ21haWwuY29tJmFtcDtjb250aW51ZT1odHRwczovL215YWNjb3VudC5nb29nbGUuY29tL2FsZXJ0L250LzE2NzQ5MjgzODcwMDA_cmZuJTNEMTI3JTI2cmZuYyUzRDElMjZlaWQlM0QtMjcwOTk2NDc5NDkzNzU2Mzc0MyUyNmV0JTNEMCIvPjxtZXRhIGl0ZW1wcm9wPSJuYW1lIiBjb250ZW50PSJSZXZpZXcgQWN0aXZpdHkiLz48L2Rpdj48L2Rpdj48dGFibGUgYm9yZGVyPSIwIiBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjAiIHN0eWxlPSJwYWRkaW5nLWJvdHRvbTogMjBweDsgbWF4LXdpZHRoOiA1MTZweDsgbWluLXdpZHRoOiAyMjBweDsiPjx0cj48dGQgd2lkdGg9IjgiIHN0eWxlPSJ3aWR0aDogOHB4OyI-PC90ZD48dGQ-PGRpdiBzdHlsZT0iYm9yZGVyLXN0eWxlOiBzb2xpZDsgYm9yZGVyLXdpZHRoOiB0aGluOyBib3JkZXItY29sb3I6I2RhZGNlMDsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiA0MHB4IDIwcHg7IiBhbGlnbj0iY2VudGVyIiBjbGFzcz0ibWR2MnJ3Ij48aW1nIHNyYz0iaHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2JyYW5kaW5nL2dvb2dsZWxvZ28vMngvZ29vZ2xlbG9nb19jb2xvcl83NHgyNGRwLnBuZyIgd2lkdGg9Ijc0IiBoZWlnaHQ9IjI0IiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9Im1hcmdpbi1ib3R0b206IDE2cHg7IiBhbHQ9Ikdvb2dsZSI-PGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6ICYjMzk7R29vZ2xlIFNhbnMmIzM5OyxSb2JvdG8sUm9ib3RvRHJhZnQsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7Ym9yZGVyLWJvdHRvbTogdGhpbiBzb2xpZCAjZGFkY2UwOyBjb2xvcjogcmdiYSgwLDAsMCwwLjg3KTsgbGluZS1oZWlnaHQ6IDMycHg7IHBhZGRpbmctYm90dG9tOiAyNHB4O3RleHQtYWxpZ246IGNlbnRlcjsgd29yZC1icmVhazogYnJlYWstd29yZDsiPjxkaXYgc3R5bGU9ImZvbnQtc2l6ZTogMjRweDsiPjxhPkdvb2dsZSBBUElzIEV4cGxvcmVyPC9hPiB3YXMgZ3JhbnRlZCBhY2Nlc3MgdG8geW91ciBHb29nbGUmbmJzcDtBY2NvdW50IDwvZGl2Pjx0YWJsZSBhbGlnbj0iY2VudGVyIiBzdHlsZT0ibWFyZ2luLXRvcDo4cHg7Ij48dHIgc3R5bGU9ImxpbmUtaGVpZ2h0OiBub3JtYWw7Ij48dGQgYWxpZ249InJpZ2h0IiBzdHlsZT0icGFkZGluZy1yaWdodDo4cHg7Ij48aW1nIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgc3R5bGU9IndpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHg7IHZlcnRpY2FsLWFsaWduOiBzdWI7IGJvcmRlci1yYWRpdXM6IDUwJTs7IiBzcmM9Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDZMM0hnMUVHS0VHNWduWkx5cWxrU1NGdkhsRTE2eHhGQmQzNmJmPXM5NiIgYWx0PSIiPjwvdGQ-PHRkPjxhIHN0eWxlPSJmb250LWZhbWlseTogJiMzOTtHb29nbGUgU2FucyYjMzk7LFJvYm90byxSb2JvdG9EcmFmdCxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtjb2xvcjogcmdiYSgwLDAsMCwwLjg3KTsgZm9udC1zaXplOiAxNHB4OyBsaW5lLWhlaWdodDogMjBweDsiPnNwYW0uZnJvbnRsaW5lLnBpbG90QGdtYWlsLmNvbTwvYT48L3RkPjwvdHI-PC90YWJsZT4gPC9kaXY-PGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6IFJvYm90by1SZWd1bGFyLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmOyBmb250LXNpemU6IDE0cHg7IGNvbG9yOiByZ2JhKDAsMCwwLDAuODcpOyBsaW5lLWhlaWdodDogMjBweDtwYWRkaW5nLXRvcDogMjBweDsgdGV4dC1hbGlnbjogbGVmdDsiPjxicj5JZiB5b3UgZGlkIG5vdCBncmFudCBhY2Nlc3MsIHlvdSBzaG91bGQgY2hlY2sgdGhpcyBhY3Rpdml0eSBhbmQgc2VjdXJlIHlvdXIgYWNjb3VudC48ZGl2IHN0eWxlPSJwYWRkaW5nLXRvcDogMzJweDsgdGV4dC1hbGlnbjogY2VudGVyOyI-PGEgaHJlZj0iaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL0FjY291bnRDaG9vc2VyP0VtYWlsPXNwYW0uZnJvbnRsaW5lLnBpbG90QGdtYWlsLmNvbSZhbXA7Y29udGludWU9aHR0cHM6Ly9teWFjY291bnQuZ29vZ2xlLmNvbS9hbGVydC9udC8xNjc0OTI4Mzg3MDAwP3JmbiUzRDEyNyUyNnJmbmMlM0QxJTI2ZWlkJTNELTI3MDk5NjQ3OTQ5Mzc1NjM3NDMlMjZldCUzRDAiIHRhcmdldD0iX2JsYW5rIiBsaW5rLWlkPSJtYWluLWJ1dHRvbi1saW5rIiBzdHlsZT0iZm9udC1mYW1pbHk6ICYjMzk7R29vZ2xlIFNhbnMmIzM5OyxSb2JvdG8sUm9ib3RvRHJhZnQsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAxNnB4OyBjb2xvcjogI2ZmZmZmZjsgZm9udC13ZWlnaHQ6IDQwMDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO2ZvbnQtc2l6ZTogMTRweDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOiAxMHB4IDI0cHg7YmFja2dyb3VuZC1jb2xvcjogIzQxODRGMzsgYm9yZGVyLXJhZGl1czogNXB4OyBtaW4td2lkdGg6IDkwcHg7Ij5DaGVjayBhY3Rpdml0eTwvYT48L2Rpdj48L2Rpdj48ZGl2IHN0eWxlPSJwYWRkaW5nLXRvcDogMjBweDsgZm9udC1zaXplOiAxMnB4OyBsaW5lLWhlaWdodDogMTZweDsgY29sb3I6ICM1ZjYzNjg7IGxldHRlci1zcGFjaW5nOiAwLjNweDsgdGV4dC1hbGlnbjogY2VudGVyIj5Zb3UgY2FuIGFsc28gc2VlIHNlY3VyaXR5IGFjdGl2aXR5IGF0PGJyPjxhIHN0eWxlPSJjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTt0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7Ij5odHRwczovL215YWNjb3VudC5nb29nbGUuY29tL25vdGlmaWNhdGlvbnM8L2E-PC9kaXY-PC9kaXY-PGRpdiBzdHlsZT0idGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgc3R5bGU9ImZvbnQtZmFtaWx5OiBSb2JvdG8tUmVndWxhcixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtjb2xvcjogcmdiYSgwLDAsMCwwLjU0KTsgZm9udC1zaXplOiAxMXB4OyBsaW5lLWhlaWdodDogMThweDsgcGFkZGluZy10b3A6IDEycHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXY-WW91IHJlY2VpdmVkIHRoaXMgZW1haWwgdG8gbGV0IHlvdSBrbm93IGFib3V0IGltcG9ydGFudCBjaGFuZ2VzIHRvIHlvdXIgR29vZ2xlIEFjY291bnQgYW5kIHNlcnZpY2VzLjwvZGl2PjxkaXYgc3R5bGU9ImRpcmVjdGlvbjogbHRyOyI-JmNvcHk7IDIwMjMgR29vZ2xlIElyZWxhbmQgTHRkLiwgPGEgY2xhc3M9ImFmYWwiIHN0eWxlPSJmb250LWZhbWlseTogUm9ib3RvLVJlZ3VsYXIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7Y29sb3I6IHJnYmEoMCwwLDAsMC41NCk7IGZvbnQtc2l6ZTogMTFweDsgbGluZS1oZWlnaHQ6IDE4cHg7IHBhZGRpbmctdG9wOiAxMnB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij5Hb3Jkb24gSG91c2UsIEJhcnJvdyBTdHJlZXQsIER1YmxpbiA0LCBJcmVsYW5kPC9hPjwvZGl2PjwvZGl2PjwvZGl2PjwvdGQ-PHRkIHdpZHRoPSI4IiBzdHlsZT0id2lkdGg6IDhweDsiPjwvdGQ-PC90cj48L3RhYmxlPjwvdGQ-PC90cj48dHIgaGVpZ2h0PSIzMiIgc3R5bGU9ImhlaWdodDogMzJweDsiPjx0ZD48L3RkPjwvdHI-PC90YWJsZT48L2JvZHk-PC9odG1sPg==", 
          "size": 4729
        }, 
        "partId": "1", 
        "filename": ""
      }
    ]
  }
}
```

## List Google drive files
```
GET /drive/v3/files HTTP/1.1
Authorization: Bearer ya29.a0A...0163

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
## Export Google doc spreadsheet in ODS file format
See [Google: export formats reference](https://developers.google.com/drive/api/guides/ref-export-formats)
```
GET /drive/v3/files/1A8ee1ZRvWl-R8LSG5JXfSR9q9B9eHo9Diug6ygQHYZY/export?mimeType=application/x-vnd.oasis.opendocument.spreadsheet HTTP/1.1
Authorization: Bearer ya29.a0AV...163
```
