import { ImageUrl } from '@/helper/imageUrl';
import JSZip from 'jszip';
import { FileArchive } from 'lucide-react';
import React from 'react'
import { saveAs } from "file-saver";

const DownloadZip = ({ CatalogueDetailData }) => {
    const downloadAllProductImages = async () => {
        const allImageUrls = CatalogueDetailData?.Product?.map(
            (product) => ImageUrl(product.image)
        );

        const zip = new JSZip();

        await Promise.all(
            allImageUrls.map(async (url, index) => {
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    zip.file(`product-image-${index + 1}.webp`, blob);
                } catch (err) {
                    return err;
                }
            })
        );

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "product-images.zip");
    };

    return (
        <>
            <button
                onClick={downloadAllProductImages}
                title="Share on Twitter"
                className="p-2 border rounded-md border-s border-gray-400 hover:bg-sky-100"
            >
                <FileArchive size={20} />
            </button>
        </>
    )
}

export default DownloadZip
