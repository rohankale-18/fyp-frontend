import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const BackgroundPattern = () => {
	const canvasRef = useRef(null);
	const mousePosRef = useRef({ x: 0, y: 0 });
	const hoverRadius = 50; // Define the radius of the hover effect

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const gridSize = 50;
		const cols = Math.ceil(canvas.width / gridSize);
		const rows = Math.ceil(canvas.height / gridSize);

		const edges = [];

		for (let i = 0; i <= cols; i++) {
			for (let j = 0; j <= rows; j++) {
				if (i < cols)
					edges.push({
						x: i,
						y: j,
						direction: "horizontal",
						alpha: 0,
					});
				if (j < rows)
					edges.push({ x: i, y: j, direction: "vertical", alpha: 0 });
			}
		}

		const handleMouseMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			mousePosRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		};

		window.addEventListener("mousemove", handleMouseMove);

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = "#FF8500";

			edges.forEach((edge) => {
				// Calculate edge position
				const edgeX =
					edge.direction === "horizontal"
						? (edge.x + 0.5) * gridSize
						: edge.x * gridSize;
				const edgeY =
					edge.direction === "vertical"
						? (edge.y + 0.5) * gridSize
						: edge.y * gridSize;

				// Calculate distance between mouse and edge
				const dist = Math.sqrt(
					(mousePosRef.current.x - edgeX) ** 2 +
					(mousePosRef.current.y - edgeY) ** 2
				);

				// Brighten edges within the hover radius
				if (dist < hoverRadius) {
					edge.alpha = Math.min(
						edge.alpha + 0.05,
						0.5 + (hoverRadius - dist) / hoverRadius
					);
				} else if (Math.random() < 0.18) {
					edge.alpha = Math.min(edge.alpha + 0.05, 0.3);
				} else {
					edge.alpha = Math.max(edge.alpha - 0.01, 0);
				}

				// Draw the edge if it has alpha
				if (edge.alpha > 0) {
					ctx.globalAlpha = edge.alpha;
					ctx.beginPath();
					if (edge.direction === "horizontal") {
						ctx.moveTo(edge.x * gridSize, edge.y * gridSize);
						ctx.lineTo((edge.x + 1) * gridSize, edge.y * gridSize);
					} else {
						ctx.moveTo(edge.x * gridSize, edge.y * gridSize);
						ctx.lineTo(edge.x * gridSize, (edge.y + 1) * gridSize);
					}
					ctx.stroke();
				}
			});

			requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

const AuthPageLayout = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] relative overflow-hidden">
			<BackgroundPattern />
			<div className="w-full max-w-md z-10">
				<div className="bg-[#ffffff] p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthPageLayout;
