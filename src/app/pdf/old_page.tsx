"use client";

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { BLANK_PDF, Template } from "@pdfme/common";
import { generate } from '@pdfme/generator';
import { barcodes, image, text } from "@pdfme/schemas";
import { Designer } from "@pdfme/ui";
import { useEffect, useRef, useState } from 'react';

const sampleTemplate: Template = {
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

export const cloneDeep = (obj: object) => JSON.parse(JSON.stringify(obj));
function changeBasePDF(template: Template, basePDF: Template["basePdf"]): Template {
    template.basePdf = basePDF;
    return template;

}

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const designer = useRef<Designer | null>(null);
    const [prevDesignerRef, setPrevDesignerRef] = useState<typeof containerRef | null>(null);
    const [template, setTemplate] = useState<Template>(sampleTemplate);

    const buildDesigner = () => {
        if (containerRef.current) {
            designer.current = new Designer({
                domContainer: containerRef.current,
                template,
                plugins: { text, image, qrcode: barcodes.qrcode },
            });
            // designer.current.onSaveTemplate(downloadTemplate);
            designer.current.onChangeTemplate(setTemplate);
        }
    };

    const changeBasePdf = (file: File) => {
        if (designer.current) {
            readFile(file, 'dataURL').then(async (basePdf) => {
                designer.current?.updateTemplate(Object.assign(cloneDeep(template), { basePdf }));
            });
        }
    };

    async function readFile(file: File | null, type: "text" | "dataURL" | "arrayBuffer"): Promise<string | ArrayBuffer> {
        const fileReader = new FileReader();
        fileReader.onerror = (e) => {
            console.error(e);
            throw new Error("Error reading file");
        }
        fileReader.onload = (e) => {
            if (e.target?.result && file !== null) {
                return e.target.result;
            }
        }
        if (file !== null) {
            switch (type) {
                case "text":
                    fileReader.readAsText(file);
                    break;
                case "dataURL":
                    fileReader.readAsDataURL(file);
                    break;
                case "arrayBuffer":
                    fileReader.readAsArrayBuffer(file);
                    break;
                default:
                    console.error("Invalid type", type);
                    break;
            }
        }
        throw new Error("Invalid input");
    };

    useEffect(() => {
        if (containerRef.current && !designer.current) {
            designer.current = new Designer({ domContainer: containerRef.current, template, plugins });
            // designer?.resizeObserver.observe(containerRef.current);
        }
    }, [template]);

    if (containerRef.current && containerRef != prevDesignerRef) {
        if (prevDesignerRef && designer.current) {
            designer.current.destroy();
        }
        buildDesigner();
        setPrevDesignerRef(containerRef);
    }

    return <>
        <h1 className="text-4xl font-bold text-center my-5">PDF generator page</h1>
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger onClick={() => {
                    const inputs = designer.current?.getTemplate().sampledata ?? [];
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
                    <MenubarItem /*onClick={() => {
                        console.log("Change BasePDF");
                        // const newTemplate = changeBasePDF(template, BLANK_PDF);
                        // designer.updateTemplate(newTemplate);
                    }}*/>
                        <label className="cursor-pointer">
                            <input type="file" accept="application/pdf" onChange={async (e) => {
                                console.log("Change BasePDF");
                                if (e.target && e.target.files) {
                                    // const file = await readFile(e.target.files[0], "dataURL");
                                    // console.log("file", file);
                                    // const newTemplate = changeBasePDF(template, file);
                                    // console.log(newTemplate);
                                    // console.log("designer", designer);
                                    // designer.current?.updateTemplate(Object.assign(cloneDeep(template), { basePDF: file }));
                                    changeBasePdf(e.target.files[0]);
                                }
                            }} onClick={(e) => e.currentTarget.value = ""} className="hidden" />
                            Change BasePDF
                        </label>
                        <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => {
                        console.log("Load Template");
                    }}>Load Template</MenubarItem>
                    <MenubarItem onClick={() => {
                        console.log("Download Template")
                    }}>Download Template</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>

        <div id="container" ref={containerRef}></div>
    </>
}
