// "use client";
import MyCard from "@/components/MyCard";
import { Box, Button, Stack } from "@mui/material";
import axios from "axios";

import { useState, useEffect } from "react";

export default function Shopkeeper({ params }) {
  const _id = params._id;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const addToCart = async () => {
      const { data } = await axios.get(`/api/item/get_from_shop/${_id}`);
      setItems(data.data);
    };
    addToCart();
  }, []);

  return (
    <Box display={"flex"} sx={{ flexDirection: { sm: "column", md: "row" } }}>
      <Stack
        direction={"row"}
        spacing={"20px"}
        justifyContent={"space-evenly"}
        sx={{
          bgcolor: "grey",
          color: "white",
          margin: "20px 30px",
          borderRadius: "50px",
          padding: "15px",
        }}
      >
        <Button variant="contained">Post Items to Shop</Button>
        <Button variant="contained">Show Added Items</Button>
      </Stack>
      <Box>
        {items.map((val) => (
          <MyCard key={val._id} val={val} />
        ))}
      </Box>
    </Box>
  );
}
