import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EmailList from "./EmailList";
import EmailDetails from "./EmailDetails";

export default function EmailDashboard() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/emails");
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      // let's sort this by creation date descending, shall we? latest mail always on top!
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setEmails(data);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setError("Failed to load emails. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <EmailList
        emails={emails}
        loading={loading}
        error={error}
        selectedEmail={selectedEmail}
        onEmailClick={handleEmailClick}
      />

      <Box sx={{ width: "75%", bgcolor: "background.default" }}>
        <EmailDetails selectedEmail={selectedEmail} formatDate={formatDate} />
      </Box>
    </Box>
  );
}
