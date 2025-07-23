"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/app/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_URL}order/showAllMyOrders`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError("Unable to fetch your orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "paid":
        return "bg-blue-100 text-blue-700";
      case "canceled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
      <Typography variant="h4" className="text-center">
        Your Orders
      </Typography>

      {loading ? (
        <Typography className="text-center">Loading...</Typography>
      ) : error ? (
        <Typography className="text-center text-red-600">{error}</Typography>
      ) : orders.length === 0 ? (
        <Typography className="text-center">
          You haven&apos;t placed any orders yet.
        </Typography>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    Order ID:{" "}
                    <span className="text-[13px] md:text-[18px]">
                      #{order._id.toUpperCase()}
                    </span>
                  </CardTitle>

                  <Typography variant="muted">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography className="text-lg font-bold text-gray-800">
                    ₹{order.total.toFixed(2)}
                  </Typography>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 mt-4">
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center  pb-2 last:border-none"
                    >
                      <Typography className="text-gray-700">
                        {item.amount} × {item.name}
                      </Typography>
                      <Typography className="text-gray-900 font-medium">
                        ₹{item.price.toFixed(2)}
                      </Typography>
                    </div>
                  ))}
                  <div className="">
                    <div className="flex justify-between items-center  pb-2 last:border-none">
                      <Typography className="text-gray-700">
                        Sub Total
                      </Typography>
                      <Typography className="text-gray-700">
                        ₹{order.subtotal}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center  pb-2 last:border-none">
                      <Typography className="text-gray-700">
                        Shipping fee
                      </Typography>
                      <Typography className="text-gray-700">
                        ₹{order.shippingFee}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center  pb-2 last:border-none">
                      <Typography className="text-gray-700">Tax</Typography>
                      <Typography className="text-gray-700">
                        ₹{order.tax}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center  pb-2 last:border-none">
                      <Typography className="text-lg font-bold text-gray-800">
                        Total
                      </Typography>
                      <Typography className="text-lg font-bold text-gray-800">
                        ₹{order.total}
                      </Typography>
                    </div>
                  </div>
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
