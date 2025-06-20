import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Search } from "lucide-react";
import { useEffect } from "react";
import ModeToggle from "@/components/shared/toggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ErrorComponent from "@/sections/error";
import Header from "@/sections/header";
import Information from "@/sections/information";
import Navbar from "@/sections/navbar";
import Pagination from "@/sections/pagination";
import Repositories from "@/sections/repositories";
import { useRepositoryStore } from "@/store/repository-store";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const searchUser = useRepositoryStore((state) => state.searchUser);
	const loading = useRepositoryStore((state) => state.loading);
	const error = useRepositoryStore((state) => state.error);
	const user = useRepositoryStore((state) => state.user);
	const loadingRepos = useRepositoryStore((state) => state.loadingRepos);

	const totalPages = useRepositoryStore((state) => state.totalPages);

	useEffect(() => {
		searchUser();
	}, [searchUser]);

	return (
		<div className="min-h-screen bg-gray-100 relative">
			<div className="absolute top-4 right-4">
				<ModeToggle />
			</div>
			<Navbar />

			{error && <ErrorComponent error={error} />}

			{user && (
				<div className="max-w-6xl mx-auto ">
					<Header user={user} />

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
						<Information user={user} />

						<div className="lg:col-span-2 space-y-4">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<BookOpen className="w-5 h-5" />
										Repositorios Recientes
									</CardTitle>
									<CardDescription>
										Los repositorios más actualizados de{" "}
										{user.name || user.login}
									</CardDescription>
								</CardHeader>
								<CardContent>
									{loadingRepos ? (
										<div className="flex items-center justify-center py-8">
											<div className="text-gray-500">
												Cargando repositorios...
											</div>
										</div>
									) : (
										<Repositories />
									)}
								</CardContent>
								{totalPages > 1 && <Pagination user={user} />}
							</Card>
						</div>
					</div>
				</div>
			)}

			{!user && !loading && !error && (
				<div className="max-w-6xl mx-auto px-4 py-12 text-center">
					<div className="text-gray-500">
						<Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
						<h2 className="text-2xl font-semibold mb-2">
							Busca un usuario de GitHub
						</h2>
						<p>
							Ingresa un nombre de usuario en el campo de búsqueda para ver su
							perfil y repositorios
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
