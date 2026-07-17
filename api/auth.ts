import https from "https";

const clientId = process.env.OAUTH_CLIENT_ID || "";
const clientSecret = process.env.OAUTH_CLIENT_SECRET || "";

function requestToken(code: string): Promise<{
  access_token?: string;
  error?: string;
  error_description?: string;
}> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    });

    const req = https.request(
      {
        hostname: "github.com",
        path: "/login/oauth/access_token",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve({ error: "invalid response", error_description: body });
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(data);
    req.end();
  });
}

export default async function handler(req: any, res: any) {
  const host = (req.headers.host || req.headers["x-forwarded-host"] || "") as string;
  const protocol =
    (req.headers["x-forwarded-proto"] as string) ||
    (req.headers.referer?.startsWith("https:") ? "https" : "http");
  const baseUrl = `${protocol}://${host}`;

  const code = req.query.code as string | undefined;
  const siteId = (req.query.site_id as string) || host;

  if (!clientId || !clientSecret) {
    res.status(500).json({ error: "OAuth credentials not configured" });
    return;
  }

  if (code) {
    try {
      const token = await requestToken(code);
      if (token.error || !token.access_token) {
        res
          .status(500)
          .json({ error: token.error_description || token.error });
        return;
      }

      const payload = JSON.stringify({
        access_token: token.access_token,
        provider: "github",
      });

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(`<!doctype html>
<html>
  <head><title>授权成功</title></head>
  <body>
    <script>
      (function() {
        function sendAuth() {
          if (!window.opener) {
            document.body.innerText = "授权成功，请关闭此窗口";
            return;
          }
          window.opener.postMessage(
            "authorization:github:success:" + ${JSON.stringify(payload)},
            "*"
          );
          setTimeout(function() { window.close(); }, 500);
        }
        sendAuth();
      })();
    </script>
  </body>
</html>`);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
    return;
  }

  const redirectUri = encodeURIComponent(`${baseUrl}/api/auth`);
  const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=${redirectUri}`;

  res.writeHead(302, { Location: authorizeUrl });
  res.end();
}
