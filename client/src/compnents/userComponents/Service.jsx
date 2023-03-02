import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import pic1 from "../../public/images/1.jpg";
import pic2 from "../../public/images/2.jpg";
import pic3 from "../../public/images/3.jpg";

export default function Service() {
    const serviceDetails = [
        {
            service: "Residential Garbage Pickup",
            discription:
                "Residential garbage pickup is important for public health, environmental protection, aesthetics, and convenience.It is a critical service that helps maintain a healthy and livable community.",
            image: pic1,
        },
        {
            service: "Restaurants waste management",
            discription:
                "Effective restaurant waste management is important for environmental protection, health and safety. By implementing effective waste management practices, restaurants can help protect the environment, save money, and improve their reputation.",
            image: pic2,
        },
        {
            service: "Waste Management in Events",
            discription:
                " Events generate a significant amount of waste, including food waste, packaging, and decorations. Proper waste management, including recycling and composting, can help reduce the amount of waste that goes to landfills, which can harm the environment.",
            image: pic3,
        },
    ];

    return (
        <div>
            <Typography variant="h5" sx={{ textAlign: "center", padding: "20px", fontWeight: "500" }}>
                SERVICES
            </Typography>

            <Grid container spacing={2} justifyContent={"center"}>
                {serviceDetails.map((item, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={6} md={4}>
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
                                            {item.service}
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
                                            {item.discription}
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
