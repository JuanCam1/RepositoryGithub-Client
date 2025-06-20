import { Users } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubUserModel } from "@/types/user-model";
import { formatDate } from "@/utils/format-date";

interface Props {
	user: GitHubUserModel;
}
const Information: FC<Props> = ({ user }) => {
	return (
		<div className="lg:col-span-1 space-y-4 ">
			<Card>
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2 ">
						<Users className="w-5 h-5" />
						Información
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div>
						<div className="font-semibold dark:text-indigo-500">
							Nombre de usuario
						</div>
						<div className="text-gray-600 dark:text-zinc-300">
							@{user.login}
						</div>
					</div>
					{user.name && (
						<div>
							<div className="font-semibold dark:text-indigo-500">
								Nombre completo
							</div>
							<div className="text-gray-600 dark:text-zinc-300">
								{user.name}
							</div>
						</div>
					)}
					{user.location && (
						<div>
							<div className="font-semibold dark:text-indigo-500">
								Ubicación
							</div>
							<div className="text-gray-600 dark:text-zinc-300">
								{user.location}
							</div>
						</div>
					)}
					<div>
						<div className="font-semibold dark:text-indigo-500">
							Miembro desde
						</div>
						<div className="text-gray-600 dark:text-zinc-300">
							{formatDate(user.created_at)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default Information;
