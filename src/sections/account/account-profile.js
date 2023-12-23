import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";

import { getAvataById } from "src/services/customerServices";
export const AccountProfile = () => {
  const { user, isAuthenticated } = useAuth();

  const [updatedImage, setUpdatedImage] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imageCheck, setImageCheck] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUpdatedImage(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }

    // try {
    //   const data = await getAvataById("1");
    //   const binaryString = data?.data;
    //   const bytes = new Uint8Array(binaryString.length);
    //   for (let i = 0; i < binaryString.length; i++) {
    //     bytes[i] = binaryString.charCodeAt(i);
    //   }
    //   const blob = new Blob([bytes], { type: "image/jpeg" });
    //   const imageUrlBlob = URL.createObjectURL(blob);
    //   setImageCheck(imageUrlBlob);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={imageData || user?.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user?.username}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.city} {user?.country}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        {/* <img src={imageCheck} alt="error" /> */}

        <form>
          <Button fullWidth onClick={handleButtonClick}>
            Tải ảnh lên
          </Button>
          <input
            type="file"
            id="image"
            name="image"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </form>
      </CardActions>
    </Card>
  );
};
