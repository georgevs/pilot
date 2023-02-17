# Wiki

## References

- [How to Store JWT in a Cookie](https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81)
- [How To Use JWTs in Express](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)
- [Okta: Cookies vs tokens](https://developer.okta.com/blog/2022/02/08/cookies-vs-tokens)
- [JWT best practices](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
- [OWASP: JWT cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [OWASP: Conten Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [Auth0: Token best practices](https://auth0.com/docs/secure/tokens/token-best-practices)
- [Auth0: Token storage](https://auth0.com/docs/secure/security-guidance/data-security/token-storage)
- [Express: sessions](https://github.com/expressjs/session)
- [Curity: API Security](https://curity.io/resources/api-security)

## JWT validation
See [Auth0: Token best practices](https://auth0.com/docs/secure/tokens/token-best-practices) for details.

Signed by either `RSA256` or `HS256`:
- `RSA256` (RSA signature with SHA-256): An asymetric algorithm. Requires fetching public key for verifiction;
- `HSA256` (HMAC with SHA-256): A symetric algorithm. Requires keeping a shared secret for verification.

## Scenarios
See [Auth0: Token storage](https://auth0.com/docs/secure/security-guidance/data-security/token-storage) for details.

Authentication may be needed in the following scenarios:
- accessing a page;
- accessing an API route;
- accessing 3rd party API on behalf of the user.

On mobile use secure OS provided storage (like KeyStore for Android, and KeyChain for iOS)

Single Page Application (SPA) and backend scenarios:
- backend performs API calls;
- backend does NOT perform API calls, but provides/stores tokens;
- NO backend.

## Authorization Code Flow with Proof Key for Code Exchange (PKCE)
See [Auth0: Authz code flow with PKCE](https://auth0.com/docs/get-started/authentication-and-authorization-flow/add-login-using-the-authorization-code-flow-with-pkce) for details.
Also see [Auth0: Call your API with Authz code flow with PKCE](https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce)

- APP: create code verifier + code challenge;
- APP -> SERVICE: authorization code request + code challenge;
- SERVICE -> USER: authenticate and concent;
- SERVICE -> APP: authorization code;
- APP -> SERVER: Authorization code + code verifier;
- SERVER: validate code verifier + code challenge;
- SERVER -> APP: ID token, access token, refresh token.

```javascript
const codeVerifier = base64UrlEncode(crypto.randomBytes(32));
const codeChallenge = base64UrlEmcode(
  crypto.createHash('sha256').update(codeVerifier).digest()
);
```

Request authorization code:
```bash
curl https://{host}/authorize?\
  response_type=code&\
  code_challenge={codeChallenge}&\
  code_challenge_method=S256&\
  client_id={client_id}&\
  redirect_uri={redirect_uri}&\
  scope={scope}&\
  state={state}

HTTP/1.1 302 Found
Location: {redirect_uri}?code={authorization_code}&state={state}
```

Request tokens (...original scope will be used by defualt):
```bash
curl -X POST https://{host}/oauth/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=authorization_code \
  --data client_id={client_id} \
  --data code_verifier={codeVerifier} \
  --data code={athorization_code} \
  --data redirect_uri={redirect_uri}

HTTP/1.1 200 OK
{
  "access_token": "eyJz...",
  "refresh_token": "GEb...",
  "id_token": "eyJ0...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

Refresh access token with a refresh token:
```bash
curl -X POST https://{host}/oauth/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=refresh_token \
  --data client_id={client_id} \
  --data refresh_token={refresh_token}

HTTP/1.1 200 OK
{
  "access_token": "eyJ...abc",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...xyz",
  "token_type": "Bearer"
}
```

## Refresh token rotation (offline_access)
Return a NEW refresh token with each NEW access token request. 

## Authorization and authentication flows:
See [Auth0: what are refresh tokens and how to use them](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/) for details.

- if client is traditional web app running on the server, then use authorization code flow;
- if client is single page app (SPA) using access tokens, then use authorization code flow with proof key of code xchange (PKCE);
- if client is SPA NOT using access tokens, use implicit flow with form post;
- if client is the resource owner, use client credentials flow;
- if client is thrusted with user credentials, use resource owner password flow.
