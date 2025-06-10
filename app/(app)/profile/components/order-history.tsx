"use client";

import React from "react";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderHistory = () => {
  // Dummy order data
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-05-15",
      status: "Delivered",
      total: "$129.99",
      items: [
        { name: "Organic Apples", quantity: 2, price: "$4.99" },
        { name: "Whole Grain Bread", quantity: 1, price: "$3.49" },
      ],
    },
    {
      id: "ORD-12344",
      date: "2023-05-01",
      status: "Delivered",
      total: "$89.50",
      items: [
        { name: "Free Range Eggs", quantity: 1, price: "$5.99" },
        { name: "Almond Milk", quantity: 2, price: "$3.99" },
      ],
    },
  ];

  return (
    <div className="space-y-4 mx-auto bg-white p-6 rounded-lg shadow">
      <Typography variant="h4">Your Orders</Typography>

      {orders.length === 0 ? (
        <Typography>You haven&apos;t placed any orders yet.</Typography>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <Typography variant="muted">
                    Placed on {order.date}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography>{order.total}</Typography>
                  <Typography
                    variant="small"
                    className={
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {order.status}
                  </Typography>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-2 last:border-b-0"
                    >
                      <Typography>
                        {item.quantity} × {item.name}
                      </Typography>
                      <Typography>{item.price}</Typography>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
