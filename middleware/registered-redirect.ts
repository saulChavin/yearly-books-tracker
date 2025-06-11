// filepath: /Users/saulchavin/Documents/Projects/books/middleware/auth-redirect.ts
export default defineNuxtRouteMiddleware((to, from) => {
	// This middleware should only execute on the client side
	// because localStorage is not available on the server.
	if (import.meta.client) {
		const hasName = localStorage.getItem('name') != null;

		// If the user is trying to access the root path '/'
		if (to.path === '/') {
			if (hasName) {
				// If name is set, redirect to dashboard
				return navigateTo('/dashboard', { replace: true });
			} else {
				// If name is not set, redirect to welcome page
				return navigateTo('/welcome', { replace: true });
			}
		}

		if (to.path === '/welcome') {
			if (hasName) {
				// If name is set, redirect to dashboard
				return navigateTo('/dashboard', { replace: true });
			}
		} else if (to.path === '/dashboard') {
			if (!hasName) {
				return navigateTo('/welcome', { replace: true });
			}
		}
	}
	// If not on the client or no redirection rule matches, do nothing.
});