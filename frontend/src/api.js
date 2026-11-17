export const API_URL = "http://127.0.0.1:8000/api";

// POSTs JSON and returns the parsed response. On a non-2xx response, throws an
// Error whose message is built from DRF's {field: [messages]} error format.
export async function postJSON(path, body) {
    const response = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = Object.entries(data)
            .map(([field, msgs]) => `${field}: ${[].concat(msgs).join(" ")}`)
            .join("\n");
        throw new Error(message || `Request failed (${response.status})`);
    }
    return data;
}
