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
        var payload = JSON.stringify({
          token: ${JSON.stringify(token.access_token)},
          provider: "github"
        });
        var msg = "authorization:github:success:" + payload;

        function sendToken(origin) {
          console.log("[oauth-callback] sending token to origin:", origin);
          window.opener.postMessage(msg, origin || "*");
          setTimeout(function() { window.close(); }, 500);
        }

        function receiveMessage(e) {
          console.log("[oauth-callback] received:", e.data, "from", e.origin);
          if (e.data === "authorizing:github") {
            sendToken(e.origin);
          }
        }

        if (!window.opener) {
          document.body.innerHTML =
            "<h1>授权成功，但无法联系到主窗口</h1>" +
            "<p>window.opener 为 null，请按 F12 打开控制台，把日志截图发给开发者。</p>";
          return;
        }

        window.addEventListener("message", receiveMessage, false);
        console.log("[oauth-callback] handshake: authorizing:github");
        window.opener.postMessage("authorizing:github", "*");
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
