import { client_id, domainUrl, realms } from "../constant/constant";

const keycloakBase = `https://keycloak.uhsvnu.com/realms/${realms}`;
const clientId = client_id;
const redirectUri = `${domainUrl}/callback`;

export const getLoginUrl = (codeChallenge: string) => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return `${keycloakBase}/protocol/openid-connect/auth?${params}`;
};

export const tokenUrl = `${keycloakBase}/protocol/openid-connect/token`;
