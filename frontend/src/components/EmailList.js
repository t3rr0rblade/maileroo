import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";

export default function EmailList({
  emails,
  loading,
  error,
  selectedEmail,
  onEmailClick,
}) {
  return (
    <Box sx={{ width: "25%", borderRight: 1, borderColor: "divider" }}>
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Emails
        </Typography>
      </Box>

      <Box sx={{ height: "calc(80vh - 80px)", overflow: "auto" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : emails.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No emails found
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {emails.map((email, index) => (
              <Box key={index}>
                <ListItem
                  button
                  onClick={() => onEmailClick(email)}
                  sx={{
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    ...(selectedEmail?.id === email.id && {
                      bgcolor: "primary.light",
                      "&:hover": {
                        bgcolor: "primary.light",
                      },
                    }),
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" noWrap>
                        {email.email}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {email.subject}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < emails.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
