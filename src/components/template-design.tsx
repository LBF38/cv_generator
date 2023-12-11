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
} from '../lib/helper';

const headerHeight = 60;
const controllerHeight = 60;

const TemplateDesign = () => {
    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);
    const [template, setTemplate] = useState<Template>(getSampleTemplate());
    const [smallDisplay, setSmallDisplay] = useState(true);
    const [prevDesignerRef, setPrevDesignerRef] = useState<typeof designerRef | null>(null);

    useEffect(() => {
        setSmallDisplay(window.innerWidth < 900);
    }, []);

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
                    alert(`Invalid template file.
--------------------------
${e}`);
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
    }

    return (
        <>
            <div
                style={{
                    height: controllerHeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1rem',
                }}
            >
                {smallDisplay ? (
                    <div className="dropdown dropdown--hoverable dropdown--right">
                        <button className="button button--sm button--outline button--primary">...</button>
                        <ul className="dropdown__menu">
                            <li>
                                <label style={{ display: 'flex', alignItems: 'center' }} className="dropdown__link">
                                    Change BasePDF
                                    <input
                                        style={{ display: 'none' }}
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
                            </li>
                            <li>
                                <label style={{ display: 'flex', alignItems: 'center' }} className="dropdown__link">
                                    Load Template
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        accept="application/json"
                                        onChange={(e) => {
                                            if (e.target && e.target.files) {
                                                loadTemplate(e.target.files[0]);
                                            }
                                        }}
                                        onClick={(e) => {
                                            e.currentTarget.value = '';
                                        }}
                                    />
                                </label>
                            </li>
                            <li>
                                <div
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    onClick={downloadTemplate}
                                    className="dropdown__link"
                                >
                                    Download Template
                                </div>
                            </li>
                            <li>
                                <div
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    onClick={generatePdf}
                                    className="dropdown__link"
                                >
                                    Preview PDF
                                </div>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <label
                            style={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}
                            className="button button--sm button--outline button--success"
                        >
                            Change BasePDF
                            <input
                                style={{ display: 'none' }}
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

                        <label
                            style={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}
                            className="button button--sm button--outline button--info"
                        >
                            Load Template
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                accept="application/json"
                                onChange={(e) => {
                                    if (e.target && e.target.files) {
                                        loadTemplate(e.target.files[0]);
                                    }
                                }}
                                onClick={(e) => {
                                    e.currentTarget.value = '';
                                }}
                            />
                        </label>

                        <button
                            style={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}
                            onClick={downloadTemplate}
                            className="button button--sm button--outline button--warning"
                        >
                            Download Template
                        </button>
                        <button
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={generatePdf}
                            className="button button--sm button--outline button--secondary"
                        >
                            Generate PDF
                        </button>
                    </div>
                )}
            </div>
            <div
                ref={designerRef}
                style={{ width: '100%', height: `calc(100vh - ${headerHeight + controllerHeight}px)` }}
            />
        </>
    );
};

export default TemplateDesign;
