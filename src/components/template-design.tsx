"use client";
import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { barcodes, image, text } from '@pdfme/schemas';
import { Designer } from '@pdfme/ui';
import { useEffect, useRef, useState } from 'react';
import {
    cloneDeep,
    downloadJsonFile,
    getSampleTemplate,
    getTemplateFromJsonFile,
    readFile
} from '../lib/pdfme/helper';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from './ui/menubar';

export default function TemplateDesign() {
    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);
    const [template, setTemplate] = useState<Template>(getSampleTemplate());
    const [prevDesignerRef, setPrevDesignerRef] = useState<typeof designerRef | null>(null);

    const buildDesigner = () => {
        if (designerRef.current) {
            designer.current = new Designer({
                domContainer: designerRef.current,
                template,
                plugins: { text, image, qrcode: barcodes.qrcode },
            });
            designer.current.onSaveTemplate(downloadTemplate);
            designer.current.onChangeTemplate(setTemplate);
        }
    };

    useEffect(() => {
        buildDesigner();
    })

    const changeBasePdf = (file: File) => {
        if (designer.current) {
            readFile(file, 'dataURL').then(async (basePdf) => {
                designer.current?.updateTemplate(Object.assign(cloneDeep(template), { basePdf }));
            });
        }
    };

    const loadTemplate = (file: File) => {
        if (designer.current) {
            getTemplateFromJsonFile(file)
                .then((t) => {
                    designer.current?.updateTemplate(t);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const downloadTemplate = () => {
        downloadJsonFile(designer.current?.getTemplate(), 'template');
    };

    const generatePdf = async () => {
        const inputs = template.sampledata ?? [];
        const pdf = await generate({
            template,
            plugins: { text, image, qrcode: barcodes.qrcode },
            inputs
        });
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
    };

    if (designerRef.current && designerRef != prevDesignerRef) {
        if (prevDesignerRef && designer.current) {
            designer.current.destroy();
        }
        buildDesigner();
        setPrevDesignerRef(designerRef);
        console.log('build designer', designerRef, designer);
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-center my-5">PDF generator page</h1>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <label className='w-full'>
                                Change BasePDF
                                <input
                                    className='hidden'
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => {
                                        if (e.target && e.target.files) {
                                            changeBasePdf(e.target.files[0]);
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.currentTarget.value = '';
                                    }}
                                />
                            </label>
                            <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <label className='w-full'>
                                Load Template
                                <input
                                    className='hidden'
                                    type="file"
                                    accept="application/json"
                                    onChange={(e) => {
                                        if (e.target && e.target.files) {
                                            loadTemplate(e.target.files[0]);
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.currentTarget.value = '';
                                    }} />
                            </label>
                        </MenubarItem>
                        <MenubarItem onClick={downloadTemplate}>Download Template</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={generatePdf}>Generate PDF</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
            <div id="container" ref={designerRef} className='w-full min-h-screen h-full' />
        </>
    );
};

