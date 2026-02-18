"use client"

import { Shell } from "@/components/layout/shell/shell"
import { Dock } from "@/features/dock"

/**
 * Main layout component for the (main) route group.
 * Wraps children in the Shell component for consistent layout.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Shell>{children}</Shell>
      <Dock />
    </>
  )
}
