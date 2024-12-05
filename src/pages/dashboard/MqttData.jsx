import React, { useEffect } from "react";
import mqtt from "mqtt";

const MQTT_BROKER_URL = "ws://192.168.78.52:1883"; // Replace with your broker's WebSocket URL
const TOPICS = ["sensor/DHT11/humidity", "sensor/DHT11/temperature_celsius", "sensor/voltage"];

const MqttData = ({ onMessage }) => {
	useEffect(() => {
		const client = mqtt.connect(MQTT_BROKER_URL);

		client.on("connect", () => {
			console.log("Connected to MQTT Broker");
			client.subscribe(TOPICS, (err) => {
				if (err) console.error("Subscription error:", err);
				else console.log(`Subscribed to: ${TOPICS.join(", ")}`);
			});
		});

		client.on("message", (topic, message) => {
			const data = message.toString();
			const payload = { topic, data, timestamp: new Date() };
			onMessage(payload); // Pass the message to the parent
		});

		return () => client.end(); // Cleanup on unmount
	}, [onMessage]);

	return null; // No UI for this component
};

export default MqttData;
