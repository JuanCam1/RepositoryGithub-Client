import { ArrowLeft, ArrowRight } from "lucide-react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { useRepositoryStore } from "@/store/repository-store";
import type { GitHubUserModel } from "@/types/user-model";

interface Props {
	user: GitHubUserModel;
}
const Pagination: FC<Props> = ({ user }) => {
	const currentPage = useRepositoryStore((state) => state.currentPage);
	const totalPages = useRepositoryStore((state) => state.totalPages);
	const loadingRepos = useRepositoryStore((state) => state.loadingRepos);
	const handlePageChange = useRepositoryStore(
		(state) => state.handlePageChange,
	);
	return (
		<div className="border-t pt-4 mt-4 px-6">
			<div className="flex items-center justify-between">
				<div className="text-sm text-gray-600 dark:text-indigo-400">
					Página {currentPage} de {totalPages} ({user.public_repos}{" "}
					repositorios)
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1 || loadingRepos}
					>
						<ArrowLeft />
					</Button>

					<div className="flex gap-1">
						{currentPage > 3 && (
							<>
								<Button
									variant={1 === currentPage ? "default" : "outline"}
									size="sm"
									onClick={() => handlePageChange(1)}
									disabled={loadingRepos}
								>
									1
								</Button>
								{currentPage > 4 && (
									<span className="px-2 py-1 text-gray-500">...</span>
								)}
							</>
						)}

						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							const pageNum =
								Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
							if (pageNum > totalPages) return null;

							return (
								<Button
									key={pageNum}
									variant={pageNum === currentPage ? "default" : "outline"}
									size="sm"
									onClick={() => handlePageChange(pageNum)}
									disabled={loadingRepos}
								>
									{pageNum}
								</Button>
							);
						})}

						{currentPage < totalPages - 2 && (
							<>
								{currentPage < totalPages - 3 && (
									<span className="px-2 py-1 text-gray-500">...</span>
								)}
								<Button
									variant={totalPages === currentPage ? "default" : "outline"}
									size="sm"
									onClick={() => handlePageChange(totalPages)}
									disabled={loadingRepos}
								>
									{totalPages}
								</Button>
							</>
						)}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages || loadingRepos}
					>
						<ArrowRight />
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Pagination;
