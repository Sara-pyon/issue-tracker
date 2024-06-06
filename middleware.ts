import { auth } from "@/auth"
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = { 
    redirect: "/",
    matcher: [
        "/issues/new",
        "/issues/edit/:id+"
    ] 
}