import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconFileUnknown } from "@tabler/icons-react"

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-4">
                <IconFileUnknown className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
            <p className="text-muted-foreground">
                The page you are looking for does not exist or has been moved.
            </p>
            <Button asChild className="mt-4">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
