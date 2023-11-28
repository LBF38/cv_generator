"use client";

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { BLANK_PDF, Template } from "@pdfme/common";
import { text, image, barcodes } from "@pdfme/schemas";
import { Designer } from "@pdfme/ui";
import { generate } from '@pdfme/generator';
import React, { useEffect, useRef } from 'react';

const template = {
    "schemas": [
        {
            "name": {
                "type": "text",
                "position": {
                    "x": 22.69,
                    "y": 23.97
                },
                "width": 77.77,
                "height": 18.7,
                "fontSize": 36,
                "fontColor": "#14b351"
            },
            "photo": {
                "type": "image",
                "position": {
                    "x": 24.99,
                    "y": 65.61
                },
                "width": 60.66,
                "height": 93.78
            },
            "age": {
                "type": "text",
                "position": {
                    "x": 36,
                    "y": 136.65
                },
                "width": 43.38,
                "height": 6.12,
                "fontSize": 12
            },
            "sex": {
                "type": "text",
                "position": {
                    "x": 36,
                    "y": 186.23
                },
                "width": 43.38,
                "height": 6.12,
                "fontSize": 12
            },
            "weight": {
                "type": "text",
                "position": {
                    "x": 40,
                    "y": 192.99
                },
                "width": 43.38,
                "height": 6.12,
                "fontSize": 12
            },
            "breed": {
                "type": "text",
                "position": {
                    "x": 40,
                    "y": 199.09
                },
                "width": 43.38,
                "height": 6.12,
                "fontSize": 12
            },
            "owner": {
                "type": "qrcode",
                "position": {
                    "x": 115.09,
                    "y": 204.43
                },
                "width": 26.53,
                "height": 26.53
            },
            "field8": {
                "type": "text",
                "position": {
                    "x": 0,
                    "y": 0
                },
                "width": 45,
                "height": 10,
                "rotate": 0,
                "alignment": "left",
                "verticalAlignment": "top",
                "fontSize": 13,
                "lineHeight": 1,
                "characterSpacing": 0,
                "fontColor": "#",
                "backgroundColor": "",
                "fontName": "Roboto"
            }
        }
    ],
    "basePdf": BLANK_PDF
};
const plugins = { text, image, qrcode: barcodes.qrcode };


export default function Home() {
    const containerRef = useRef(null);
    let designer: Designer;

    useEffect(() => {
        if (containerRef.current) {
            designer = new Designer({ domContainer: containerRef.current, template, plugins });
            designer.resizeObserver.observe(containerRef.current);
        }
    }, []);

    return <>
        <h1 className="text-4xl font-bold text-center my-5">PDF generator page</h1>
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger onClick={() => {
                    const inputs = designer.getTemplate().sampledata ?? [];
                    const plugins = { text, image, qrcode: barcodes.qrcode }
                    generate({ template, inputs, plugins }).then((pdf) => {
                        console.log(pdf);

                        // Browser
                        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
                        window.open(URL.createObjectURL(blob));

                        // Node.js
                        // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
                    });
                }}>Generate PDF</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => console.log('Print PDF')}>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>

        <div id="container" ref={containerRef}></div>
    </>
}
