import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


function DashboardChart({ instructorData, currentChart }) {
    ChartJS.register(ArcElement, Tooltip, Legend)

    const [colors, setColors] = useState([]);

    // Function to generate HSL to RGB conversion
    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, 0.9)`;
    }

    // Function to generate random complementing colors
    function generateComplementingColors(numColors) {
        const colors = [];
        const hueStep = 360 / numColors; // Divide the color wheel

        for (let i = 0; i < numColors; i++) {
            const hue = (i * hueStep) / 360; // Calculate hue value
            const saturation = 1.0; // Fixed saturation for vibrant colors
            const lightness = 0.48; // Fixed lightness for vibrant colors

            colors.push(hslToRgb(hue, saturation, lightness));
        }
        return colors;
    }

    // function to generate random complementing color for Doughnut graph
    // function randomColor(segment) {
    //     const colors = []
    //     for (let i = 0; i < segment; i++) {
    //         const red = Math.floor(Math.random() * 255)
    //         const blue = Math.floor(Math.random() * 255)
    //         const greem = Math.floor(Math.random() * 255)

    //         colors.push(`rgba(${red},${blue},${greem})`)
    //     }
    //     return colors;
    // }

    // data for revenue Info
    const revenueData = {
        labels: instructorData?.map(course => course?.courseName),
        datasets: [{
            label: '# of Revenue(₹)',
            data: instructorData.map(course => course?.revenueGenerated),
            backgroundColor: colors,
            borderColor: 'rgb(51, 52, 53)',
            borderWidth: 1,
        }]
    }

    // data for student Info
    const studentData = {
        labels: instructorData?.map(course => course?.courseName),
        datasets: [{
            label: '# of Students',
            data: instructorData.map(course => course?.studentsEnrolled),
            backgroundColor: colors,
            borderColor: 'rgb(51, 52, 53)',
            borderWidth: 1,
        }]
    }

    const handleResize = (chart) => {
        chart.resize();
    }

    // options
    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 20,
                    font: {
                        size: 12,
                    },
                },
            },
        },
        responsive: true,
        onResize: handleResize,
        maintainAspectRatio: false,
        aspectRatio: 2,
    }

    useEffect(() => {
        if (instructorData.length) {
            setColors(generateComplementingColors(instructorData.length));
        }
    }, [instructorData]);

    return (
        <div className='mx-auto aspect-square md:h-[85%] md:w-full relative'>
            {currentChart === 'revenue'
                ? <Doughnut data={revenueData} options={options} />
                : <Doughnut data={studentData} options={options} />
            }
        </div>
    )
}

export default DashboardChart