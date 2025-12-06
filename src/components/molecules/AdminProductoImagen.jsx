import React, { useState } from 'react';
import { Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import axios from 'axios';
import { apiCall } from '../../services/api';

const CLOUD_NAME = "dmnsdi1rn"; 
const UPLOAD_PRESET = "onlykick_preset"; 

const AdminProductoImagen = ({ idProducto, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage(null);
        setUploadProgress(0);
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            //Limpieza - Borrar imágenes antiguas
            try {
                const oldImages = await apiCall(`/imagenes/producto/${idProducto}`);
                console.log("Imágenes antiguas encontradas:", oldImages); // 🔍 DEBUG

                if (oldImages && Array.isArray(oldImages)) {
                    for (const img of oldImages) {
                        // Intentamos leer el ID de varias formas posibles para asegurar que lo encontramos
                        const idBorrar = img.id_imagen || img.idImagen || img.id; 
                        
                        if (idBorrar) {
                            console.log(`Borrando imagen ID: ${idBorrar}`); // 🔍 DEBUG
                            await apiCall(`/imagenes/${idBorrar}`, 'DELETE');
                        } else {
                            console.warn("No se pudo encontrar el ID de la imagen:", img);
                        }
                    }
                }
            } catch (err) {
                console.warn("Error al intentar borrar imágenes antiguas (continuando subida...):", err);
            }

            //Subir a Cloudinary
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                }
            );

            const imageUrl = res.data.secure_url;

            //Guardar en Backend
            const payload = {
                urlImagen: imageUrl,
                altText: "Foto Producto",
                producto: { idProducto: idProducto }
            };

            await apiCall('/imagenes', 'POST', payload);

            setMessage({ type: 'success', text: '¡Imagen actualizada con éxito!' });
            setFile(null);
            setUploadProgress(0);
            
            if (onUploadSuccess) onUploadSuccess();

        } catch (error) {
            console.error("Error crítico:", error);
            setMessage({ type: 'danger', text: 'Error al subir la imagen.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {message && <Alert variant={message.type}>{message.text}</Alert>}
            
            <div className="d-flex gap-2">
                <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
                <Button 
                    variant="dark" 
                    onClick={handleUpload} 
                    disabled={!file || loading}
                >
                    {loading ? 'Guardando...' : 'Guardar Imagen'}
                </Button>
            </div>
            
            {loading && (
                <ProgressBar 
                    now={uploadProgress} 
                    label={`${uploadProgress}%`} 
                    className="mt-2" 
                    variant="success" 
                    animated 
                />
            )}
        </div>
    );
};

export default AdminProductoImagen;