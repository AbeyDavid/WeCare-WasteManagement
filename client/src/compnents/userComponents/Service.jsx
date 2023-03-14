import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getServices } from "../../services/adminApi";

export default function Service() {
    const [serviceData, setServiceData] = React.useState([]);
    useEffect(()=>{
        async function fetchData() {
            const result = await getServices();
            setServiceData(result.serviceData);
        }
        fetchData();
    },[])
    return (
        <div>
            <Typography variant="h5" sx={{ textAlign: "center", padding: "20px", fontWeight: "500" }}>
                SERVICES
            </Typography>

            <Grid container spacing={2} justifyContent={"center"}>
                {serviceData.map((item) => {
                    return (
                        <Grid key={item._id} item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    padding: "35px",
                                    borderRight: "1px solid #e91e63",
                                }}
                            >
                                <Card
                                    sx={{
                                        padding: "10px",
                                        backgroundColor: "#24262b",
                                        "&:hover": {
                                            boxShadow: "1px 5px 2px 2px #ff3478",
                                        },
                                    }}
                                >
                                    <CardMedia component="img" height="200" image={item.image} alt="image" />

                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            sx={{ height: "63px", overflow: "hidden", color: "white" }}
                                        >
                                            {item.serviceName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                height: "120px",
                                                overflow: "hidden",
                                                color: "white",
                                                fontWeight: 100,
                                                fontSize: "12PX",
                                            }}
                                        >
                                            {item.serviceDetails}
                                        </Typography>
                                    </CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            align="center"
                                            sx={{
                                                marginBottom: "25px",
                                                backgroundColor: "#474952",
                                                color: "#fff",
                                                borderRadius: "8px",
                                                "&:hover": {
                                                    backgroundColor: "#222327",
                                                },
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

        </div>
    );
}
