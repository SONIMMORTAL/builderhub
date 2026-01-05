import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface CobeGlobeProps {
    variant?: 'default' | 'minimal';
    phi?: number;
    theta?: number;
    mapSamples?: number;
    mapBrightness?: number;
    mapBaseBrightness?: number;
    diffuse?: number;
    dark?: number;
    baseColor?: string;
    markerColor?: string;
    markerSize?: number;
    glowColor?: string;
    scale?: number;
    offsetX?: number;
    offsetY?: number;
    opacity?: number;
    pulseColors?: boolean;
    pulseSpeed?: number;
    markers?: Array<{ location: [number, number]; size: number }>;
}

// Helper to convert hex color to RGB array (0-1 range)
function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
        ]
        : [1, 1, 1];
}

// Interpolate between two RGB colors
function lerpColor(
    color1: [number, number, number],
    color2: [number, number, number],
    t: number
): [number, number, number] {
    return [
        color1[0] + (color2[0] - color1[0]) * t,
        color1[1] + (color2[1] - color1[1]) * t,
        color1[2] + (color2[2] - color1[2]) * t,
    ];
}

// Pulse colors array - vibrant accent colors
const PULSE_COLORS: [number, number, number][] = [
    hexToRgb('#a855f7'), // Purple
    hexToRgb('#22d3ee'), // Cyan
    hexToRgb('#3b82f6'), // Blue
    hexToRgb('#ec4899'), // Pink
    hexToRgb('#f97316'), // Orange
    hexToRgb('#10b981'), // Emerald
];

export function CobeGlobe({
    variant = 'default',
    phi = 0,
    theta = 0.2,
    mapSamples = 16000,
    mapBrightness = 1.8,
    mapBaseBrightness = 0.05,
    diffuse = 3,
    dark = 1.1,
    baseColor = '#ffffff',
    markerColor = '#fb6415',
    markerSize = 0.05,
    glowColor = '#ffffff',
    scale = 1.0,
    offsetX = 0.0,
    offsetY = 0.0,
    opacity = 0.7,
    pulseColors = false,
    pulseSpeed = 0.5,
    markers = [
        // Default markers: Major tech hubs
        { location: [37.7749, -122.4194], size: 0.08 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.08 },   // New York
        { location: [51.5074, -0.1278], size: 0.06 },   // London
        { location: [35.6762, 139.6503], size: 0.06 },  // Tokyo
        { location: [1.3521, 103.8198], size: 0.05 },   // Singapore
        { location: [52.52, 13.405], size: 0.05 },      // Berlin
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        { location: [37.5665, 126.978], size: 0.05 },   // Seoul
    ],
}: CobeGlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phiRef = useRef(phi);
    const timeRef = useRef(0);

    useEffect(() => {
        let width = 0;
        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;

        const initialBaseColor = hexToRgb(baseColor);
        const initialGlowColor = hexToRgb(glowColor);

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: phiRef.current,
            theta,
            dark,
            diffuse,
            mapSamples,
            mapBrightness,
            mapBaseBrightness,
            baseColor: initialBaseColor,
            markerColor: hexToRgb(markerColor),
            glowColor: initialGlowColor,
            scale,
            offset: [offsetX, offsetY],
            markers: markers.map((m) => ({
                location: m.location,
                size: m.size || markerSize,
            })),
            onRender: (state) => {
                // Auto-rotate
                state.phi = phiRef.current;
                phiRef.current += 0.003;
                state.width = width * 2;
                state.height = width * 2;

                // Color pulsing
                if (pulseColors) {
                    timeRef.current += 0.016 * pulseSpeed; // ~60fps
                    const colorTime = timeRef.current % PULSE_COLORS.length;
                    const colorIndex = Math.floor(colorTime);
                    const nextColorIndex = (colorIndex + 1) % PULSE_COLORS.length;
                    const t = colorTime - colorIndex;

                    // Smooth easing
                    const easedT = (1 - Math.cos(t * Math.PI)) / 2;

                    const currentColor = lerpColor(
                        PULSE_COLORS[colorIndex],
                        PULSE_COLORS[nextColorIndex],
                        easedT
                    );

                    state.baseColor = currentColor;
                    state.glowColor = currentColor;
                }
            },
        });

        // Fade in effect
        if (canvasRef.current) {
            canvasRef.current.style.opacity = '0';
            setTimeout(() => {
                if (canvasRef.current) {
                    canvasRef.current.style.transition = 'opacity 1s ease';
                    canvasRef.current.style.opacity = String(opacity);
                }
            }, 100);
        }

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, [
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        mapBaseBrightness,
        baseColor,
        markerColor,
        glowColor,
        scale,
        offsetX,
        offsetY,
        markerSize,
        markers,
        opacity,
        pulseColors,
        pulseSpeed,
    ]);

    return (
        <div className="cobe-globe-container">
            <canvas
                ref={canvasRef}
                className="cobe-globe-canvas"
                style={{
                    width: '100%',
                    height: '100%',
                    contain: 'layout paint size',
                    cursor: 'grab',
                }}
            />
        </div>
    );
}

export default CobeGlobe;

