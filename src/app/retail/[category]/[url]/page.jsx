import themes from "@/app/themeConfig";

const ProductDetailpage = () => {
  const currentTheme = "theme2";
  const { ProdductDetail } = themes[currentTheme];

  const product = {
    id: "687de673690d3457a4d714d0",
    name: "Red Chinon Readymade Palazzo Suit",
    sku: "Blossom Vol 2-1713",
    description:
      "Experience timeless elegance with our Embroidered Chinon Readymade Palazzo Suit. This beautifully crafted ensemble is designed to bring a touch of sophistication to any occasion. The delicate embroidery adds charm to the rich fabric, perfect for both casual and festive events.",
    image: [
      "uploads/product/BlossomV2_1713.webp",
      "uploads/product/BlossomV2_1713-A.webp",
    ],
    thumbImage: [
      "uploads/product/thumb/BlossomV2_1713.webp",
      "uploads/product/thumb/BlossomV2_1713-A.webp",
    ],
    optionType: "Size",
    offer_price: 3762,
  };

  return (
    <ProdductDetail product={product} />
  )
}

export default ProductDetailpage;