import { Button } from "@/components/ui/button"
import { IconBox } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
    title?: string
    description?: string
    icon?: React.ElementType
    action?: {
        label: string
        onClick: () => void
    }
    className?: string
}

export function EmptyState({
    title = "No data found",
    description = "There are no items to display at this time.",
    icon: Icon = IconBox,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
                className
            )}
        >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                {description}
            </p>
            {action && (
                <Button onClick={action.onClick} variant="outline">
                    {action.label}
                </Button>
            )}
        </div>
    )
}
