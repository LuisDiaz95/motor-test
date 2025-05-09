import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const App = () => {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setScreenshotUrl("");

    try {
      const formData = {
        price,
        description,
      };

      const response = await axios.post("http://localhost:3001/publish", formData, {
        responseType: "blob",
      });

      const imageBlob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(imageBlob);
      setScreenshotUrl(imageUrl);
    } catch (error) {
      console.error("Error al publicar el anuncio: ", error);
      alert("Hubo un error al publicar el anuncio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Publicar Anuncio en Seminuevos
      </Typography>

      <TextField
        label="Precio"
        type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <TextField
        label="Descripción"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Box sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" onClick={handleSubmit} disabled={loading} fullWidth>
          Publicar
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {screenshotUrl && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Anuncio Publicado:</Typography>
          <img src={screenshotUrl} alt="Anuncio publicado" style={{ width: "100%", border: "1px solid #ccc" }} />
        </Box>
      )}
    </Container>
  );
};

export default App;
