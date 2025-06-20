import { Calendar, LinkIcon, MapPin } from "lucide-react";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { GitHubUserModel } from "@/types/user-model";
import { formatDate } from "@/utils/format-date";

interface Props {
	user: GitHubUserModel;
}
const Header: FC<Props> = ({ user }) => {
	return (
		<div className="bg-white shadow-sm">
			<div className="px-4 pb-4">
				<div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 relative z-10">
					<div className="flex flex-col md:flex-row md:items-end gap-4">
						<Avatar className="w-40 h-40 border-4 border-white shadow-lg">
							<AvatarImage
								src={user.avatar_url || "/placeholder.svg"}
								alt={user.name || user.login}
							/>
							<AvatarFallback className="text-4xl">
								{user.login[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="pb-4">
							<h1 className="text-3xl font-bold text-gray-900">
								{user.name || user.login}
							</h1>
							<p className="text-gray-600">@{user.login}</p>
							{user.bio && (
								<p className="text-gray-700 mt-2 max-w-md">{user.bio}</p>
							)}
						</div>
					</div>
					<div className="flex gap-2 pb-4">
						<Button variant="outline" asChild>
							<a href={user.html_url} target="_blank" rel="noopener noreferrer">
								Ver en GitHub
							</a>
						</Button>
					</div>
				</div>

				<div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
					{user.location && (
						<div className="flex items-center gap-1">
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
								className="text-blue-600 hover:underline"
							>
								{user.blog}
							</a>
						</div>
					)}
					<div className="flex items-center gap-1">
						<Calendar className="w-4 h-4" />
						<span>Se unió en {formatDate(user.created_at)}</span>
					</div>
				</div>

				<div className="mt-4 flex gap-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-900">
							{user.public_repos}
						</div>
						<div className="text-sm text-gray-600">Repositorios</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-900">
							{user.followers}
						</div>
						<div className="text-sm text-gray-600">Seguidores</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-900">
							{user.following}
						</div>
						<div className="text-sm text-gray-600">Siguiendo</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
