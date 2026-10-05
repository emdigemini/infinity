export const formatDate = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')

  return `${y}-${m}-${d}`
}

export const formatTime = (time: string) => {
  const [hourString, minute] = time.split(':')
  let hour = Number(hourString)

  const period = hour >= 12 ? 'PM' : 'AM'

  hour = hour % 12 || 12

  return `${hour}:${minute} ${period}`
}

export const generateCodeVerifier = () => {
  const array = new Uint8Array(64);

  crypto.getRandomValues(array);

  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);

  const digest = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return btoa(
    String.fromCharCode(...new Uint8Array(digest))
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};