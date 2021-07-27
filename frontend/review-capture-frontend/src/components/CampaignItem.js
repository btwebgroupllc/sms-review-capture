import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function SimpleDialog(props) {
  const classes = useStyles();

  const { onClose, open, campaign } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">People in Campaign </DialogTitle>
      <div style={{ padding: "20px" }}>
        {campaign.phoneNumbers.map((numbers) => (
          <>{numbers}</>
        ))}
      </div>
    </Dialog>
  );
}

function CampaignItem({ campaign }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div
      className="campaign-item"
      style={{
        margin: "5px",
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card>
        <CardContent>
          <p>Campaign ID: {campaign.campaign_id}</p>
          <p>Initial Text: {campaign.initial_text}</p>
          <p>Status: {campaign.status}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              marginLeft: "350px",
            }}
          >
            <p>View More Info</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              View People in Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
      <SimpleDialog open={open} onClose={handleClose} campaign={campaign} />
    </div>
  );
}

export default CampaignItem;
