'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
	const daysName = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	const agenticLoading = [
		"Analyzing calendars...",
		"Consulting the time lords...",
		"Rewinding time...",
		"Flipping the day switch...",
		"Decoding temporal patterns...",
		"Summoning yesterday's data...",
		"Aligning planetary positions...",
		"Accessing the space-time continuum...",
		"Reviewing historical logs...",
		"Engaging temporal mechanics...",
		"Synchronizing with universal clock...",
		"Retrieving lost days...",
		"Calculating day offsets...",
		"Verifying with ancient scripts...",
		"Hacking NASA for data...",
		"Contacting aliens...",
		"If you move, you gay...",
		"Almost there..."
	];

	const [selectedDay, setSelectedDay] = useState("");
	const [loadingStep, setLoadingStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState("");

	const detectYesterday = async () => {
		setIsLoading(true);
		setResult("");
		setLoadingStep(0);

		// Simulate loading steps
		for (let i = 0; i < agenticLoading.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setLoadingStep(i);
		}

		// Determine the previous day
		const selectedIndex = daysName.indexOf(selectedDay);
		const previousIndex = (selectedIndex - 1 + daysName.length) % daysName.length;
		const previousDay = daysName[previousIndex];

		setResult(`The day before ${selectedDay} is ${previousDay}.`);
		setIsLoading(false);

		startConfetti();
	};

	const startConfetti = () => {
		confetti({
			particleCount: 200,
			spread: 80,
			origin: { y: 0.6 }
		});
	};

	return (
		<div>
			<main className="flex min-h-screen flex-col items-center justify-center p-10 text-center space-y-6">
				<h1 className="text-4xl font-bold">Previous Day Detector</h1>

				<Select
					value={selectedDay}
					disabled={false}
					onValueChange={(value) => setSelectedDay(value)}
				>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Select a day" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{daysName.map((day) => (
								<SelectItem key={day} value={day}>
									{day}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button
					disabled={!selectedDay || isLoading}
					onClick={detectYesterday}
					className="flex items-center gap-2"
				>
					{isLoading ? (
						<>
							Thinking...
							<Spinner />
						</>
					) : (
						"Detect Yesterday"
					)}
				</Button>

				{/* Loading indicator */}
				{isLoading && (
					<p className="text-md animate-pulse">{agenticLoading[loadingStep]}</p>
				)}

				{/* Final result */}
				{!isLoading && result && (
					<p className="text-md font-semibold">{result}</p>
				)}

			</main>
		</div>
	);
}
