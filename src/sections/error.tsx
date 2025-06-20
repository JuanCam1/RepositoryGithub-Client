import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
	error: string;
}
const ErrorComponent: FC<Props> = ({ error }) => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-4">
			<Card className="border-red-200 bg-red-50">
				<CardContent className="pt-6">
					<p className="text-red-600">{error}</p>
				</CardContent>
			</Card>
		</div>
	);
};
export default ErrorComponent;
