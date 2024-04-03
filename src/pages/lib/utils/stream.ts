import type { ReadableStream } from 'node:stream/web';

export async function streamToString(stream: ReadableStream): Promise<string> {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}
