"use client"

import { BackgroundControls } from "@/features/design-system"

/**
 * Backgrounds page component.
 * Displays background controls for customizing animated backgrounds.
 */
export default function BackgroundsPage() {
    // Controls are now rendered in-page

    return (
        <>


            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center p-6 border border-border/50 backdrop-blur-sm">
                        <p className="text-sm text-muted-foreground text-center mb-4">
                            The active background is rendered globally. Use the controls below to customize physics and behavior.
                        </p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/30">
                            <h3 className="font-medium">Configuration</h3>
                        </div>
                        <BackgroundControls />
                    </div>
                </div>
            </div>
        </>
    )
}
