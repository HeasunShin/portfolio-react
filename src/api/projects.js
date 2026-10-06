const API_URL = import.meta.env.VITE_API_URL;

async function request(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export function getProjects() {
  return request(`${API_URL}/projects`);
}

export function getProject(id) {
  return request(`${API_URL}/projects/${id}`);
}

export function createProject(project) {
  return request(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
}

export function updateProject(id, project) {
  return request(`${API_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
}

export function deleteProject(id) {
  return request(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
}
