const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchSeats() {
  try {
    const res = await fetch(`${API_BASE}/api/registrations/counts`);
    if (!res.ok) throw new Error("Failed to fetch seats");
    return res.json();
  } catch (err) {
    return {};
  }
}

export async function postRegistration(eventId, formData) {
  const res = await fetch(`${API_BASE}/api/registrations/${eventId}`, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

export async function fetchRegistrations(eventId) {
  const res = await fetch(`${API_BASE}/api/registrations/${eventId}`);
  if (!res.ok) throw new Error("Failed to fetch registrations");
  return res.json();
}

export async function fetchParticipants() {
  const res = await fetch(`${API_BASE}/api/registrations`);
  if (!res.ok) throw new Error("Failed to fetch participants");
  return res.json();
}

export async function updateRegistration(id, updates) {
  const res = await fetch(`${API_BASE}/api/registrations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");
  return data;
}
