"use client";
import { use, useEffect, useState } from "react";
import { SlidersHorizontal, LayoutList, Grip, GripVertical, Heart, Package, Shirt, Funnel, LayoutGrid } from "lucide-react";
import CategoryProductData from "@/app/data/CategoryProductData";
import Pagination from "@/app/theme/theme1/components/Pagination/Pagination";
import Filtertheme2 from "./Filtertheme2";
import { getCategoryProducts } from "@/app/services/productService";
import Image from "next/image";
import { ImageUrl } from "@/app/helper/imageUrl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "../ProductComponent/ProductCard";
import Accordian from "../components/Accordian/Accordian";
import FilterSidebar from "./FilterSidebar";

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

    const gridButtons = [
        { icon: LayoutList, value: 2, label: "2 Grid" },
        { icon: Grip, value: 3, label: "3 Grid" },
        { icon: GripVertical, value: 4, label: "4 Grid" },
    ];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getCategoryProducts(category, page, 20, sort, []);
            console.log(res, "res");

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
    console.log("product", category);

    return (
        <>
            <Accordian />
            <div className="container mx-auto px-4 mt-7">
                <div className="row">
                    <div className="flex gap-2 mb-3">
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
                            className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium
            ${activeTab === "single" ? "bg-red-700 text-white" : "bg-white hover:bg-gray-200"}`}
                        >
                            <Shirt size={18} />
                            SINGLE
                        </button>
                    </div>
                    <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-5 py-3 flex flex-wrap items-center justify-between gap-3">

                        {/* Left Tabs */}
                        <div className="flex gap-2 flex-wrap items-center">
                            <h1 className="text-[25px] font-semibold ">Sarees</h1>
                            <p className="text-sm text-gray-500 justify-center">Showing 1–17 of 17 results</p>
                        </div>


                        {/* Right Controls */}
                        <div className="flex gap-2 flex-wrap items-center">
                            {/* Filter Button */}
                            <button
                                onClick={() => setOpen(!open)}  // toggle filter open/close
                                className="flex items-center gap-2 p-2 rounded shadow bg-black text-white hover:bg-gray-800 text-sm"
                            >
                                <Funnel size={18} />
                                FILTER
                            </button>


                            {/* Sort Dropdown */}
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

                            {/* Grid/List Toggle */}
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
                <div className="flex flex-wrap mx-1 mt-3">
                    {products?.map((product) => {
                        console.log("product", product);
                        return (
                            <ProductCard key={product.id} product={product} pathname={`${pathname}/${product?.url || "/"}`} />

                        )
                    })}
                </div>
            </div>

            {/* <div className="flex justify-center items-center ">
                    <Pagination
                        currentPage={page}
                        totalCount={500}
                        perPage={10}
                        onPageChange={(p) => setPage(p)}
                    />
                </div> */}
            {/* {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-50 flex"
                    onClick={() => setOpen(false)} // closes when clicking outside sidebar
                >
                    <div
                        className="bg-white w-72 max-w-full h-full p-4 overflow-y-auto transform transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <FilterSidebar open={open} setOpen={setOpen} />
                    </div>
                </div>
            )} */}

        </>
    );
};

export default Productstheme2;
