import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "swayambhoo_admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  expiresAt: number;
}

function getSecretKey(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    return "swayambhoo-fallback-secret-key-32-chars-long!";
  }
  return secret;
}

// Convert string to Uint8Array
function strToUint8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Base64URL encode
function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Base64URL decode
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

async function getCryptoKey(): Promise<CryptoKey> {
  const rawKey = strToUint8(getSecretKey());
  return await crypto.subtle.importKey(
    "raw",
    rawKey as unknown as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Universal Web Crypto HMAC-SHA256 Token Signer
 * Safe for Edge Middleware and Node.js Route Handlers
 */
export async function createSessionToken(
  payload: Omit<SessionPayload, "expiresAt">
): Promise<string> {
  const fullPayload: SessionPayload = {
    ...payload,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const jsonStr = JSON.stringify(fullPayload);
  const encodedPayload = base64UrlEncode(strToUint8(jsonStr));

  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    strToUint8(encodedPayload) as unknown as ArrayBuffer
  );
  const signature = base64UrlEncode(signatureBuffer);

  return `${encodedPayload}.${signature}`;
}

/**
 * Universal Web Crypto HMAC-SHA256 Token Verifier
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signatureStr] = parts;
    const key = await getCryptoKey();

    // Decode signature
    const binary = atob(signatureStr.replace(/-/g, "+").replace(/_/g, "/"));
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as ArrayBuffer,
      strToUint8(encodedPayload) as unknown as ArrayBuffer
    );

    if (!isValid) return null;

    const decodedPayloadStr = base64UrlDecode(encodedPayload);
    const payload: SessionPayload = JSON.parse(decodedPayloadStr);

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Get current session payload from server cookies (for Server Components & Route Handlers).
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Get session payload from NextRequest (for Middleware).
 */
export async function getSessionFromRequest(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Set session cookie on a NextResponse object.
 */
export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_DURATION / 1000),
  });
}

/**
 * Clear session cookie on a NextResponse object.
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
