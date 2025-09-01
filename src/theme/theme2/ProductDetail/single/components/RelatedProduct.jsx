import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/cards/ProductCards"
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation"
import { useRef } from "react"

const product = {
  "isSuccess": true,
  "message": "Related products fetched successfully",
  "data": [
    {
      "id": "687dd675690d3457a4d71444",
      "name": "Yellow Georgette Casual Sequins Work Saree",
      "sku": "Erisha-S3693",
      "url": "mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3693",
      "mediumImage": [
        "uploads/product/medium/Erisha_S3693.webp",
        "uploads/product/medium/Erisha_S3693-A.webp",
        "uploads/product/medium/Erisha_S3693-B.webp"
      ],
      "retail_price": 1443,
      "retail_discount": 0,
      "offer_price": 1443,
      "categories": [
        {
          "category": {
            "url": "designer-sarees"
          }
        },
        {
          "category": {
            "url": "sarees"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        }
      ]
    },
    {
      "id": "687dd60a690d3457a4d7142c",
      "name": "Pink Georgette Sequins Work Casual Saree",
      "sku": "Erisha-S3691",
      "url": "mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3691",
      "mediumImage": [
        "uploads/product/medium/Erisha_S3691.webp",
        "uploads/product/medium/Erisha_S3691-A.webp",
        "uploads/product/medium/Erisha_S3691-B.webp"
      ],
      "retail_price": 1443,
      "retail_discount": 0,
      "offer_price": 1443,
      "categories": [
        {
          "category": {
            "url": "sarees"
          }
        },
        {
          "category": {
            "url": "designer-sarees"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        }
      ]
    },
    {
      "id": "687dd5c4690d3457a4d7141b",
      "name": "Pink Georgette Casual Sequins Work Saree",
      "sku": "Erisha-S3690",
      "url": "mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3690",
      "mediumImage": [
        "uploads/product/medium/Erisha_S3690.webp",
        "uploads/product/medium/Erisha_S3690-A.webp",
        "uploads/product/medium/Erisha_S3690-B.webp"
      ],
      "retail_price": 1443,
      "retail_discount": 0,
      "offer_price": 1443,
      "categories": [
        {
          "category": {
            "url": "designer-sarees"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "sarees"
          }
        }
      ]
    },
    {
      "id": "687dd56d690d3457a4d7140a",
      "name": "Sky Blue Georgette Casual Sequins Work Saree",
      "sku": "Erisha-S3689",
      "url": "mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3689",
      "mediumImage": [
        "uploads/product/medium/Erisha_S3689.webp",
        "uploads/product/medium/Erisha_S3689-A.webp",
        "uploads/product/medium/Erisha_S3689-B.webp"
      ],
      "retail_price": 1443,
      "retail_discount": 0,
      "offer_price": 1443,
      "categories": [
        {
          "category": {
            "url": "designer-sarees"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "sarees"
          }
        }
      ]
    },
    {
      "id": "687de673690d3457a4d714d0",
      "name": "Red Chinon Readymade Palazzo Suit",
      "sku": "Blossom Vol 2-1713",
      "url": "blossom-vol-2-1711-to-1713-designer-sharara-dress-party-wear-collection-blossom-vol-2-1713",
      "mediumImage": [
        "uploads/product/medium/BlossomV2_1713.webp",
        "uploads/product/medium/BlossomV2_1713-A.webp"
      ],
      "retail_price": 3762,
      "retail_discount": 0,
      "offer_price": 3762,
      "categories": [
        {
          "category": {
            "url": "plazzo-suits"
          }
        },
        {
          "category": {
            "url": "salwar-suits"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "readymade-suits"
          }
        }
      ]
    },
    {
      "id": "687de649690d3457a4d714c4",
      "name": "Yellow Chinon Readymade Palazzo Suit",
      "sku": "Blossom Vol 2-1712",
      "url": "blossom-vol-2-1711-to-1713-designer-sharara-dress-party-wear-collection-blossom-vol-2-1712",
      "mediumImage": [
        "uploads/product/medium/BlossomV2_1712.webp",
        "uploads/product/medium/BlossomV2_1712-A.webp"
      ],
      "retail_price": 3762,
      "retail_discount": 0,
      "offer_price": 3762,
      "categories": [
        {
          "category": {
            "url": "readymade-suits"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "plazzo-suits"
          }
        },
        {
          "category": {
            "url": "salwar-suits"
          }
        }
      ]
    },
    {
      "id": "687de617690d3457a4d714b8",
      "name": "Magenta Chinon Readymade Palazzo Suit",
      "sku": "Blossom Vol 2-1711",
      "url": "blossom-vol-2-1711-to-1713-designer-sharara-dress-party-wear-collection-blossom-vol-2-1711",
      "mediumImage": [
        "uploads/product/medium/BlossomV2_1711.webp",
        "uploads/product/medium/BlossomV2_1711-A.webp"
      ],
      "retail_price": 3762,
      "retail_discount": 0,
      "offer_price": 3762,
      "categories": [
        {
          "category": {
            "url": "plazzo-suits"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "salwar-suits"
          }
        },
        {
          "category": {
            "url": "readymade-suits"
          }
        }
      ]
    },
    {
      "id": "687de9ec690d3457a4d714fc",
      "name": "Green Georgette Long Top With Skirt",
      "sku": "Vamika-10270",
      "url": "aashirwad-creation-vamika-real-georgette-top-skirt-dupatta-vamika-10270",
      "mediumImage": [
        "uploads/product/medium/Vamika_10270.webp",
        "uploads/product/medium/Vamika_10270-A.webp"
      ],
      "retail_price": 5011,
      "retail_discount": 0,
      "offer_price": 5011,
      "categories": [
        {
          "category": {
            "url": "designer-lehengas"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "lehengas"
          }
        }
      ]
    },
    {
      "id": "687de9b0690d3457a4d714f0",
      "name": "Red Georgette Long Top With Skirt",
      "sku": "Vamika-10269",
      "url": "aashirwad-creation-vamika-real-georgette-top-skirt-dupatta-vamika-10269",
      "mediumImage": [
        "uploads/product/medium/Vamika_10269.webp",
        "uploads/product/medium/Vamika_10269-A.webp"
      ],
      "retail_price": 5011,
      "retail_discount": 0,
      "offer_price": 5011,
      "categories": [
        {
          "category": {
            "url": "designer-lehengas"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        },
        {
          "category": {
            "url": "lehengas"
          }
        }
      ]
    },
    {
      "id": "687dea19690d3457a4d71507",
      "name": "Blue Georgette Long Top With Skirt",
      "sku": "Vamika-10271",
      "url": "aashirwad-creation-vamika-real-georgette-top-skirt-dupatta-vamika-10271",
      "mediumImage": [
        "uploads/product/medium/Vamika_10271.webp",
        "uploads/product/medium/Vamika_10271-A.webp"
      ],
      "retail_price": 5011,
      "retail_discount": 0,
      "offer_price": 5011,
      "categories": [
        {
          "category": {
            "url": "lehengas"
          }
        },
        {
          "category": {
            "url": "designer-lehengas"
          }
        },
        {
          "category": {
            "url": "new-arrivals"
          }
        }
      ]
    }
  ]
}
const RealtedProduct = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className="pb-0 mb-5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              You may also like this
            </h2>
            <p className="text-gray-500 text-sm">TOP SALE IN THIS WEEK</p>
          </div>
        </div>

        <div className="relative">
          <SliderNavigation position="center" ref={prevRef} />

          <Swiper
            grabCursor
            loop={true}
            slidesPerView="auto"
            spaceBetween={16}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {product?.data?.map((item, index) => (
              <SwiperSlide
                key={item.id || index}
                className="flex justify-center"
                style={{ width: "305px" }}
              >
                <div className="mx-2">
                  <ProductCard data={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default RealtedProduct
