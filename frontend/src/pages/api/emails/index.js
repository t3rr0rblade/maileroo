export default async function handler(req, res) {
  const { method } = req;

  // Get the backend URL from environment variable or use default
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

  try {
    let response;

    if (method === "GET") {
      // Handle GET request to fetch emails
      response = await fetch(`${backendUrl}/emails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (method === "POST") {
      // Handle POST request to add email
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required", body: req.body });
      }

      response = await fetch(`${backendUrl}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const data = await response.json();

    // Forward the status code from the backend
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error calling backend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
