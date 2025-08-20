import {
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon,
} from "@mui/icons-material";

export default function EmailDetails({ selectedEmail, formatDate }) {
  if (!selectedEmail) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          p: 3,
        }}
      >
        <EmailIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="text.secondary"
        >
          Welcome to Maileroo
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              To
            </Typography>
          </Box>
          <TextField
            fullWidth
            value={selectedEmail.to || selectedEmail.email}
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }}
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
            value={selectedEmail.cc || ""}
            variant="outlined"
            size="small"
            placeholder="No CC recipients"
            InputProps={{ readOnly: true }}
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
            value={selectedEmail.bcc || ""}
            variant="outlined"
            size="small"
            placeholder="No BCC recipients"
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SubjectIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              Subject
            </Typography>
          </Box>
          <TextField
            fullWidth
            value={selectedEmail.subject || "No subject"}
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MessageIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              Body
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={selectedEmail.body || "No content"}
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle2" color="text.secondary">
              Sent At
            </Typography>
          </Box>
          <Typography variant="body1">
            {formatDate(selectedEmail.created_at)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
