import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear area chart";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-2))",
	},
};

const calculateMinMax = (data, key) => {
	const values = data.map((entry) => entry[key]);
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);
	return { minValue, maxValue };
};

export function ChartComponent({
	title,
	description,
	footer,
	chartData,
	dataKey,
}) {
	const { minValue, maxValue } = calculateMinMax(chartData, dataKey);
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="h-full">
				<ChartContainer className="px-6 h-[80%] w-full" config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={true} />
						<XAxis
							dataKey="time"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						//   tickFormatter={(value) => value.slice(0, 3	)}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tickMargin={8}
							domain={[minValue - 120, maxValue + 50]} // Set custom domain
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" hideLabel />}
						/>
						<Area
							dataKey={dataKey}
							type="linear"
							fill="var(--color-desktop)"
							fillOpacity={0.4}
							stroke="var(--color-desktop)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>{footer}</CardFooter>
		</Card>
	);
}

export default ChartComponent;
