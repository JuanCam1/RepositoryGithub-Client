import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRepositoryStore } from "@/store/repository-store";

const Navbar = () => {
	const username = useRepositoryStore((state) => state.username);
	const setUsername = useRepositoryStore((state) => state.setUsername);
	const searchUser = useRepositoryStore((state) => state.searchUser);
	const loading = useRepositoryStore((state) => state.loading);
	return (
		<div className="bg-white shadow-sm border-b">
			<div className="max-w-6xl mx-auto px-4 py-4">
				<div className="flex items-center gap-4">
					<div className="flex-1 max-w-md">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input
								placeholder="Buscar usuario de GitHub..."
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								onKeyUp={(e) => e.key === "Enter" && searchUser()}
								className="pl-10"
							/>
						</div>
					</div>
					<Button onClick={searchUser} disabled={loading}>
						{loading ? "Buscando..." : "Buscar"}
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
