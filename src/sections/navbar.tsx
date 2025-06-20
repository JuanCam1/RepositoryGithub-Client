import { Search } from "lucide-react";
import ModeToggle from "@/components/shared/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRepositoryStore } from "@/store/repository-store";

const Navbar = () => {
	const username = useRepositoryStore((state) => state.username);
	const setUsername = useRepositoryStore((state) => state.setUsername);
	const searchUser = useRepositoryStore((state) => state.searchUser);
	const loading = useRepositoryStore((state) => state.loading);
	return (
		<div className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-900 border-b z-50 shadow-sm">
			<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
				<div className="flex gap-4 w-full">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<Input
							placeholder="Buscar usuario de GitHub..."
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onKeyUp={(e) => e.key === "Enter" && searchUser()}
							className="pl-10 w-full"
						/>
					</div>

					<Button
						className="bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
						onClick={searchUser}
						disabled={loading}
					>
						{loading ? "Buscando..." : "Buscar"}
					</Button>
				</div>

				<ModeToggle />
			</div>
		</div>
	);
};
export default Navbar;
