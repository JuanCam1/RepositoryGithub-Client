import { Eye, GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRepositoryStore } from "@/store/repository-store";
import { formatDate } from "@/utils/format-date";

const Repositories = () => {
	const repositories = useRepositoryStore((state) => state.repositories);
	return (
		<div className="space-y-4">
			{repositories.map((repo) => (
				<div
					key={repo.id}
					className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
				>
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h3 className="font-semibold text-blue-600 hover:underline">
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{repo.name}
								</a>
							</h3>
							{repo.description && (
								<p className="text-gray-600 mt-1 text-sm">{repo.description}</p>
							)}
							<div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
								{repo.language && (
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 rounded-full bg-blue-500"></div>
										<span>{repo.language}</span>
									</div>
								)}
								<div className="flex items-center gap-1">
									<Star className="w-4 h-4" />
									<span>{repo.stargazers_count}</span>
								</div>
								<div className="flex items-center gap-1">
									<GitFork className="w-4 h-4" />
									<span>{repo.forks_count}</span>
								</div>
								<div className="flex items-center gap-1">
									<Eye className="w-4 h-4" />
									<span>{repo.watchers_count}</span>
								</div>
							</div>
							{repo.topics && repo.topics.length > 0 && (
								<div className="flex flex-wrap gap-1 mt-2">
									{repo.topics.slice(0, 5).map((topic) => (
										<Badge key={topic} variant="secondary" className="text-xs">
											{topic}
										</Badge>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="text-xs text-gray-500 mt-2">
						Actualizado el {formatDate(repo.updated_at)}
					</div>
				</div>
			))}
		</div>
	);
};
export default Repositories;
