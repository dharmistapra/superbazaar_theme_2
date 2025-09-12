import { ImageUrl } from '@/helper/imageUrl';
import { Download } from 'lucide-react';
import React from 'react'

const DownloadImage = ({ CatalogueDetailData }) => {

    const downloadImage = async (url, index) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = `product-image-${index + 1}.webp`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            return err;
        }
    };

    const downloadAllProductImages = async () => {
        const allImageUrls = CatalogueDetailData?.Product.map(
            (product) => ImageUrl(product.image)
        );

        await Promise.all(
            allImageUrls.map((url, index) => downloadImage(url, index))
        );
    };

    return (
        <>
            <button
                onClick={downloadAllProductImages}
                title="Share on Twitter"
                className="p-2 border rounded-md border-s border-gray-400 hover:bg-sky-100"
            >
                <Download size={20} />
            </button>
        </>
    )
}

export default DownloadImage
