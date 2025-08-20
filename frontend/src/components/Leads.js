import { useState, } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import { useCompletion } from "@ai-sdk/react";

export default function Leads() {
  const [emailData, setEmailData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const {
    completion,
    complete,
    isLoading: isCompleting,
  } = useCompletion({
    api: "/api/ai/generate",
    onFinish: (_prompt, completion) => {
      // Parse the completion to extract subject and body
      const lines = completion.split("\n");
      let subject = "";
      let body = "";

      for (const line of lines) {
        if (line.startsWith("SUBJECT:")) {
          subject = line.replace("SUBJECT:", "").trim();
        } else if (line.startsWith("BODY:")) {
          body = line.replace("BODY:", "").trim();
        }
      }

      // Populate the form fields
      setEmailData({
        ...emailData,
        subject: subject,
        body: body,
      });

      setSnackbar({
        open: true,
        message: "Generated Email Content",
        severity: "success",
      });

      handleCloseAiModal();
    },
    onError: (error) => {
      console.error("AI generation error:", error);
      setSnackbar({
        open: true,
        message: "Failed to generate email content",
        severity: "error",
      });
    },
  });

  const handleInputChange = (field) => (event) => {
    setEmailData({
      ...emailData,
      [field]: event.target.value,
    });
  };

  const handleSend = async () => {
    if (!emailData.to.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter a recipient email address",
        severity: "error",
      });
      return;
    }

    if (!emailData.subject.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter a subject",
        severity: "error",
      });
      return;
    }

    if (!emailData.body.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter email content",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: {
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: emailData.subject,
            body: emailData.body,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Clear form on success
      setEmailData({
        to: "",
        cc: "",
        bcc: "",
        subject: "",
        body: "",
      });

      setSnackbar({
        open: true,
        message: "Email sent successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbar({
        open: true,
        message: "Failed to send email. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenAiModal = () => {
    setAiModalOpen(true);
  };

  const handleCloseAiModal = () => {
    setAiModalOpen(false);
    setAiPrompt("");
  };

  const handleSubmitAiPrompt = async () => {
    if (!aiPrompt.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter a prompt",
        severity: "error",
      });
      return;
    }

    setAiLoading(true);

    try {
      // First, classify the prompt
      const classifyResponse = await fetch("/api/ai/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!classifyResponse.ok) {
        throw new Error("Failed to classify prompt");
      }

      const classifyResult = await classifyResponse.json();

      // Determine email type
      let emailType = "OTHER";
      if (classifyResult.isSalesEmail) {
        emailType = "SALES";
      } else if (classifyResult.isFollowUpEmail) {
        emailType = "FOLLOW_UP";
      }

      // Generate email content if we have a valid type
      if (emailType !== "OTHER") {
        complete({
          aiPrompt,
          emailType,
        });
      } else {
        setSnackbar({
          open: true,
          message: "Email type not recognized for generation",
          severity: "warning",
        });
        handleCloseAiModal();
      }
    } catch (error) {
      console.error("AI processing error:", error);
      setSnackbar({
        open: true,
        message: "Failed to process AI request",
        severity: "error",
      });
      handleCloseAiModal();
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Compose Email
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleOpenAiModal}
          sx={{ borderRadius: 2 }}
        >
          Generate with AI ✨
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              To *
            </Typography>
          </Box>
          <TextField
            fullWidth
            value={emailData.to}
            onChange={handleInputChange("to")}
            variant="outlined"
            size="small"
            placeholder="Enter recipient email address"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              CC
            </Typography>
          </Box>
          <TextField
            fullWidth
            value={emailData.cc}
            onChange={handleInputChange("cc")}
            variant="outlined"
            size="small"
            placeholder="Enter CC recipients (comma separated)"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              BCC
            </Typography>
          </Box>
          <TextField
            fullWidth
            value={emailData.bcc}
            onChange={handleInputChange("bcc")}
            variant="outlined"
            size="small"
            placeholder="Enter BCC recipients (comma separated)"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SubjectIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              Subject *
            </Typography>
          </Box>
          <TextField
            fullWidth
            value={emailData.subject}
            onChange={handleInputChange("subject")}
            variant="outlined"
            size="small"
            placeholder="Enter email subject"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MessageIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              Body *
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={emailData.body}
            onChange={handleInputChange("body")}
            variant="outlined"
            size="small"
            placeholder="Enter your email content"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SendIcon />}
              onClick={handleSend}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? "Sending..." : "Send Email"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* AI Modal */}
      <Dialog
        open={aiModalOpen}
        onClose={handleCloseAiModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Email with AI ✨</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Prompt"
            fullWidth
            multiline
            rows={4}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe the email you want to generate..."
            variant="outlined"
            disabled={isCompleting}
          />

          {isCompleting && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Generating email content...
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  minHeight: "60px",
                }}
              >
                {completion || "Starting generation..."}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAiModal} disabled={aiLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitAiPrompt}
            variant="contained"
            color="primary"
            disabled={aiLoading || isCompleting}
          >
            {isCompleting
              ? "Generating..."
              : aiLoading
              ? "Processing..."
              : "Generate Email"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
