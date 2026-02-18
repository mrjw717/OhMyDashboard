"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import * as React from "react"

export function Breadcrumbs() {
    const pathname = usePathname()
    const paths = pathname === "/" ? [] : pathname.split("/").filter((path) => path)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1
                    const href = `/${paths.slice(0, index + 1).join("/")}`
                    const title = path.charAt(0).toUpperCase() + path.slice(1)

                    return (
                        <React.Fragment key={path}>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href} className="hidden md:block">
                                        {title}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
