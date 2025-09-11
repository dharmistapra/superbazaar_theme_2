"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal, LayoutList, Grip, GripVertical } from "lucide-react";
import { getCategoryProducts, getWholeSaleProductslists } from "@/services/productService";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import CatalogCard from "./component/CatalogCard";
import ProductViewTabs from "../../components/common/ProductViewTabs";
import ProductListToolbar from "../../components/common/ProductListToolbar";

const WholesaleProduct = ({ category, title }) => {
    const [grid, setGrid] = useState(4);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("full");
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getWholeSaleProductslists(category, page, 20, sort);
            setProducts(Array.isArray(res.data) ? res.data : []); // ✅ ensure array
            setTotalCount(res?.totalCount || 0);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sort, category]);

    const sortOptions = [
        { value: "", label: "New Arrivals" },
        { value: "AtoZ", label: "A To Z" },
        { value: "ZtoA", label: "Z To A" },
        { value: "low", label: "Price: Low to High" },
        { value: "high", label: "Price: High to Low" },
    ];

    return (
        <div className="mx-auto px-4 mt-10 w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
            <ProductViewTabs
                category={category}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <ProductListToolbar
                title={title}
                products={products}
                totalCount={totalCount}
                sort={sort}
                setSort={setSort}
                grid={grid}
                setGrid={setGrid}
                open={open}
                setOpen={setOpen}
                type="wholesale"
            />
            <div className={`grid gap-4 ${grid === 2 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2" : ""} ${grid === 3 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : ""} ${grid === 4 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}
            >
                {loading ? (
                    [...Array(grid * 2)].map((_, i) => <ProductCardSkeleton key={i} />)
                ) : Array.isArray(products) && products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index}>
                            <CatalogCard product={item} grid={grid} category={category} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found.
                    </p>
                )}

            </div>

            {/* <div className="flex justify-center items-center ">
                <Pagination
                    currentPage={page}
                    totalCount={totalCount}
                    perPage={20}
                    onPageChange={(p) => setPage(p)}
                />
            </div> */}
        </div>
    );
};

export default WholesaleProduct;
