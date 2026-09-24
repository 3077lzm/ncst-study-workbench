import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

createServer(async (request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const relativePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = resolve(join(root, relativePath));

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const info = await stat(filePath).catch(() => null);
    if (!info || info.isDirectory()) {
      filePath = join(root, "index.html");
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Server error: ${error.message}`);
  }
}).listen(port, host, () => {
  console.log(`华理学习台已启动: http://${host}:${port}`);
});
