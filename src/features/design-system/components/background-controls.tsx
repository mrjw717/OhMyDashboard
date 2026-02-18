"use client"

import React from "react"
import { useBackgroundStore, BackgroundVariant } from "@/stores"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

/**
 * Background controls component.
 * Provides UI for selecting and configuring animated background variants.
 * 
 * Features:
 * - Background variant selection (Aurora, Geometric, Grid, Neural)
 * - Per-variant parameter controls (speed, intensity, count, etc.)
 * - Real-time parameter adjustment via sliders
 * 
 * @component
 */
export function BackgroundControls() {
    const { activeVariant, settings, setVariant, updateSettings } = useBackgroundStore()

    /**
     * Available background variants with labels and descriptions.
     */
    const variants: { id: BackgroundVariant; label: string; description: string }[] = [
        {
            id: "aurora",
            label: "Aurora Borealis",
            description: "Ethereal northern lights with theme colors",
        },
        {
            id: "geometric",
            label: "Geometric Shapes",
            description: "Floating 3D wireframe shapes interacting in space",
        },
        {
            id: "grid",
            label: "Futuristic Grid",
            description: "Interactive particle grid with mouse distortion",
        },
        {
            id: "neural",
            label: "Neural Network",
            description: "Energy waves and scanning data patterns",
        },
    ]

    /**
     * Handles setting changes for the active variant.
     * 
     * @param key - Setting key to update
     * @param value - New value for the setting
     */
    const handleSettingChange = (key: string, value: any) => {
        updateSettings(activeVariant, { [key]: value })
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold text-foreground">Background Style</h3>
                        <p className="text-xs text-muted-foreground">
                            Select the global animated background variant.
                        </p>
                    </div>

                    <RadioGroup
                        value={activeVariant}
                        onValueChange={(value) => setVariant(value as BackgroundVariant)}
                        className="grid grid-cols-1 gap-2"
                    >
                        {variants.map((variant) => (
                            <div key={variant.id}>
                                <RadioGroupItem
                                    value={variant.id}
                                    id={variant.id}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor={variant.id}
                                    className={cn(
                                        "flex flex-col gap-2 rounded-lg border border-border bg-card p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary cursor-pointer transition-all",
                                        activeVariant === variant.id ? "bg-accent/50" : ""
                                    )}
                                >
                                    <span className="text-sm font-semibold">{variant.label}</span>
                                    <span className="text-xs text-muted-foreground leading-normal">
                                        {variant.description}
                                    </span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="space-y-4 pt-4 md:pt-0 md:border-l md:border-border md:pl-6">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                        Physics & Parameters
                    </h4>

                    {activeVariant === "aurora" && (
                        <>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Flow Speed</Label>
                                    <span className="text-xs text-muted-foreground">{settings.aurora.speed}x</span>
                                </div>
                                <Slider
                                    value={[settings.aurora.speed]}
                                    min={0.1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={([val]) => handleSettingChange("speed", val)}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Intensity</Label>
                                    <span className="text-xs text-muted-foreground">{Math.round(settings.aurora.intensity * 100)}%</span>
                                </div>
                                <Slider
                                    value={[settings.aurora.intensity]}
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    onValueChange={([val]) => handleSettingChange("intensity", val)}
                                />
                            </div>
                        </>
                    )}

                    {activeVariant === "geometric" && (
                        <>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Movement Speed</Label>
                                    <span className="text-xs text-muted-foreground">{settings.geometric.speed}x</span>
                                </div>
                                <Slider
                                    value={[settings.geometric.speed]}
                                    min={0.1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={([val]) => handleSettingChange("speed", val)}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Shape Count</Label>
                                    <span className="text-xs text-muted-foreground">{settings.geometric.count}</span>
                                </div>
                                <Slider
                                    value={[settings.geometric.count]}
                                    min={10}
                                    max={50}
                                    step={5}
                                    onValueChange={([val]) => handleSettingChange("count", val)}
                                />
                            </div>
                        </>
                    )}

                    {activeVariant === "grid" && (
                        <>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Repulsion Force</Label>
                                    <span className="text-xs text-muted-foreground">{settings.grid.repulsion}x</span>
                                </div>
                                <Slider
                                    value={[settings.grid.repulsion]}
                                    min={0}
                                    max={3}
                                    step={0.1}
                                    onValueChange={([val]) => handleSettingChange("repulsion", val)}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Friction (Decay)</Label>
                                    <span className="text-xs text-muted-foreground">{settings.grid.friction}</span>
                                </div>
                                <Slider
                                    value={[settings.grid.friction]}
                                    min={0.8}
                                    max={0.99}
                                    step={0.01}
                                    onValueChange={([val]) => handleSettingChange("friction", val)}
                                />
                            </div>
                        </>
                    )}

                    {activeVariant === "neural" && (
                        <>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Wave Speed</Label>
                                    <span className="text-xs text-muted-foreground">{settings.neural.speed}x</span>
                                </div>
                                <Slider
                                    value={[settings.neural.speed]}
                                    min={0.1}
                                    max={5}
                                    step={0.1}
                                    onValueChange={([val]) => handleSettingChange("speed", val)}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-xs font-medium text-muted-foreground">Turbulence</Label>
                                    <span className="text-xs text-muted-foreground">{settings.neural.turbulence}x</span>
                                </div>
                                <Slider
                                    value={[settings.neural.turbulence]}
                                    min={0}
                                    max={3}
                                    step={0.1}
                                    onValueChange={([val]) => handleSettingChange("turbulence", val)}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
