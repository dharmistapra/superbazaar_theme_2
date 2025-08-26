"use client";
import { use, useEffect, useState } from "react";
import { SlidersHorizontal, LayoutList, Grip, GripVertical, Heart, Package, Shirt, Funnel, LayoutGrid } from "lucide-react";
import ProductCard from "@/app/theme/theme1/components/Cards/ProductCards";
import CategoryProductData from "@/app/data/CategoryProductData";
import Pagination from "@/app/theme/theme1/components/Pagination/Pagination";
import Filtertheme2 from "./Filtertheme2";
import { getCategoryProducts } from "@/app/services/productService";
import Image from "next/image";
import { ImageUrl } from "@/app/helper/imageUrl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Productstheme2 = ({ product, category }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [grid, setGrid] = useState(4);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const totalPages = 50;
    const [products, setProducts] = useState()
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("single");
    const sortOptions = [
        { value: "latest", label: "Latest" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
    ];

    const gridButtons = [
        { icon: LayoutList, value: 2, label: "2 Grid" },
        { icon: Grip, value: 3, label: "3 Grid" },
        { icon: GripVertical, value: 4, label: "4 Grid" },
    ];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getCategoryProducts(category, page, 20, sort, []);
            setProducts(res.data || []);
            setTotalCount(res?.totalCount || 0);
        } catch (err) {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <div className="container mx-auto px-4 mt-7">
                <h1>Category Product</h1>
                <div className="container mx-auto px-2">
                    <div className="row">
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setActiveTab("full");

                                    router.push(`/wholesale/${category}`);
                                }
                                }
                                className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium
            ${activeTab === "full" ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-400 "}`}>
                                <Package size={18} />
                                FULL SET
                            </button>

                            <button
                                onClick={() => setActiveTab("single")}
                                className={`flex items-center gap-2 p-2 rounded shadow text-sm font-medium
            ${activeTab === "single" ? "bg-red-700 text-white" : "bg-white hover:bg-gray-200"}`}
                            >
                                <Shirt size={18} />
                                SINGLE
                            </button>
                        </div>
                        <div className="bg-white border-b px-3 sm:px-4 lg:px-5 py-3 flex flex-wrap items-center justify-between gap-3">

                            {/* Left Tabs */}
                            <div className="flex gap-2 flex-wrap items-center">
                                <h1 className="text-[25px] font-semibold ">Sarees</h1>
                                <p className="text-sm text-gray-500 justify-center">Showing 1–17 of 17 results</p>
                            </div>


                            <div className="flex gap-2 flex-wrap items-center">
                                <button className="flex items-center gap-2 p-2 rounded shadow bg-black text-white hover:bg-gray-800 text-sm">
                                    <Funnel size={18} />
                                    FILTER
                                </button>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="border rounded p-2 text-sm shadow-sm hover:shadow-md"
                                >
                                    <option value="new">New Arrivals</option>
                                    <option value="atoz">A to Z</option>
                                    <option value="ztoa">Z to A</option>
                                    <option value="low">Price: Low to High</option>
                                    <option value="high">Price: High to Low</option>
                                </select>

                                <div className="flex gap-1">
                                    <button className="p-2 rounded bg-black text-white hover:bg-gray-800">
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button className="p-2 rounded bg-red-100 hover:bg-red-200">
                                        <LayoutList size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-1 mt-2">
                        {products?.map((product) => {
                            return (
                                <div className="p-1 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">

                                    <div className="bg-white rounded shadow overflow-hidden relative group">
                                        <Link href={`${pathname}/${product?.url || "/"}`} className="block relative">
                                            <Image
                                                src={ImageUrl(product.mediumImage[0])}
                                                alt={product.name}
                                                className="w-full object-cover transition duration-300 group-hover:opacity-0"
                                                width={300}
                                                height={450}
                                            />
                                            <Image
                                                src={ImageUrl(product.mediumImage[1])}
                                                alt={product.name}
                                                className="w-full object-cover absolute top-0 left-0 opacity-0 transition duration-300 group-hover:opacity-100"
                                                width={300}
                                                height={450}
                                            />
                                        </Link>

                                        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10">
                                            <Heart size={20} className="text-gray-600" />
                                        </button>

                                        <div className="p-3 text-center">
                                            <a
                                                href={product.link}
                                                className="block text-sm font-semibold text-gray-700 truncate mb-1"
                                                title={product.name}
                                            >
                                                {product.name}
                                            </a>
                                            <div className="text-red-600 font-bold">Rs {product.offer_price}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div >


        </>
    );
};


export default Productstheme2;
