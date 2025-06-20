import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./contexts/theme-context";

import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<ThemeProvider defaultTheme="dark" storageKey="githubUser-ui-theme">
			<RouterProvider router={router} />
		</ThemeProvider>,
	);
}
