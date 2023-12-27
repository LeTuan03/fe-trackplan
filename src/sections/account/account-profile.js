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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { getAvataById, uploadAvata, getAvataByAccountId } from "src/services/customerServices";
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

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("accountId", user?.id);
      const data = await uploadAvata(formData);
      if (data?.status === 200) {
        toast.success("Cập nhật ảnh đại diện thành công !!", {
          autoClose: 1000,
        });
        window.location.reload();
      }
      setImageCheck(data);
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật ảnh đại diện thất bại !!", {
        autoClose: 1000,
      });
    }
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
            src={imageData || `http://localhost:9090/api/files/avatar/${user?.id}` || user?.avatar}
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
        <a href={getAvataByAccountId(user?.id)} rel="noreferrer" target="_blank">
          Xem ảnh
        </a>

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
            accept="image/jpeg, image/png, image/gif"
          />
        </form>
      </CardActions>
    </Card>
  );
};
