import { BLANK_PDF, Template } from "@pdfme/common";

export const sampleTemplate: Template = {
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
