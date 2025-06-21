import { Calendar, LinkIcon, MapPin } from "lucide-react";
import type { FC } from "react";
import LogoGithub from "@/components/icon/logo-github";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { GitHubUserModel } from "@/types/user-model";
import { formatDate } from "@/utils/format-date";

interface Props {
	user: GitHubUserModel;
}
const Header: FC<Props> = ({ user }) => {
	return (
		<Card className="p-6">
			<div className="flex justify-between ">
				<div className="flex flex-col md:flex-row items-center gap-4">
					<Avatar className="size-36 border-4 border-indigo-500 shadow-lg">
						<AvatarImage
							src={user.avatar_url || "/placeholder.svg"}
							alt={user.name || user.login}
						/>
						<AvatarFallback className="text-4xl">
							{user.login[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-1">
						<h1 className="text-4xl font-extrabold text-indigo-500">
							{user.name || user.login}
						</h1>
						{/* <p className="text-gray-600 dark:text-indigo-200">@{user.login}</p> */}
						{user.bio && (
							<p className="text-gray-700 text-2xl font-extrabold dark:text-white mt-2 max-w-md">
								{user.bio}
							</p>
						)}
					</div>
				</div>
				<a
					href={user.html_url}
					target="_blank"
					rel="noreferrer"
					className=" flex items-center justify-center w-10 h-10 rounded-lg border bg-white text-gray-800 hover:bg-neutral-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white hover:dark:bg-zinc-800 transition-colors"
				>
					<LogoGithub className="text-black dark:text-white" />
				</a>
			</div>

			<div className="flex justify-between items-end ">
				<div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
					{user.location && (
						<div className="flex items-center gap-1 text-gray-600 dark:text-indigo-200">
							<MapPin className="w-4 h-4" />
							<span>{user.location}</span>
						</div>
					)}
					{user.blog && (
						<div className="flex items-center gap-1">
							<LinkIcon className="w-4 h-4" />
							<a
								href={user.blog}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 dark:text-indigo-200 hover:underline"
							>
								{user.blog}
							</a>
						</div>
					)}
					<div className="flex items-center gap-1 text-gray-600 dark:text-indigo-200">
						<Calendar className="w-4 h-4" />
						<span>Se unió en {formatDate(user.created_at)}</span>
					</div>
				</div>

				<div className="mt-4 flex gap-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
							{user.public_repos}
						</div>
						<div className="text-sm text-gray-600 dark:text-indigo-200">
							Repositorios
						</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
							{user.followers}
						</div>
						<div className="text-sm text-gray-600 dark:text-indigo-200">
							Seguidores
						</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
							{user.following}
						</div>
						<div className="text-sm text-gray-600 dark:text-indigo-200">
							Siguiendo
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
export default Header;
