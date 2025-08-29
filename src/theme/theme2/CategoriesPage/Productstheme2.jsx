"use client";
import { useEffect, useState } from "react";
import { Package, Shirt, Funnel, Columns2, Columns3, Columns4 } from "lucide-react";
import { getCategoryFilter, getCategoryProducts } from "@/services/productService";
import { usePathname, useRouter } from "next/navigation";
import ProductCard from "../ProductComponent/ProductCard";
import FilterSidebar from "./FilterSidebar";
import Pagination from "@/theme/theme1/components/Pagination/Pagination";
import cleanFilters from "@/helper/FilterClean";
import SelectedFilters from "@/components/SelctedFilter";

const Productstheme2 = ({ category }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [grid, setGrid] = useState(4);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("single");
    const [filterData, setFilterData] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const gridButtons = [
        { icon: Columns2, value: 2, label: "2 Grid" },
        { icon: Columns3, value: 3, label: "3 Grid" },
        { icon: Columns4, value: 4, label: "4 Grid" },
    ];
    const buildFilterQuery = (selectedAttributes) => {
        const params = new URLSearchParams();

        Object.entries(selectedAttributes).forEach(([key, values]) => {
            if (values.length > 0) {
                params.set(key, values.map((v) => v.value).join(","));
            }
        });

        return params.toString();
    };


    useEffect(() => {
        const queryString = buildFilterQuery(selectedAttributes);
        const newUrl = `/retail/new-arrivals${queryString ? `?${queryString}` : ""}`;

        // Replace URL without reloading the page
        router.replace(newUrl);
    }, [selectedAttributes]);

    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
            const cleanFilter = cleanFilters(filters);
            const res = await getCategoryProducts(category, page, 20, sort, cleanFilter);
            setProducts(res.data || []);
            setTotalCount(res?.totalCount || 0);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sort, category]);

    useEffect(() => {
        const fetchFilter = async () => {
            const res = await getCategoryFilter(category);
            setFilterData(res.data || []);
        };
        fetchFilter();
    }, [category]);

    const handleApplyFilters = (filters) => fetchProducts(filters);

    return (
        <>
            <div className="container mx-auto px-4 mt-7">
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => {
                            setActiveTab("full");
                            router.push(`/wholesale/${category}`);
                        }}
                        className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium ${activeTab === "full" ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-400"
                            }`}
                    >
                        <Package size={18} />
                        FULL SET
                    </button>

                    <button
                        onClick={() => setActiveTab("single")}
                        className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium ${activeTab === "single" ? "bg-red-700 text-white" : "bg-white hover:bg-gray-200"
                            }`}
                    >
                        <Shirt size={18} />
                        SINGLE
                    </button>
                </div>

                <div className="bg-white border-b border-gray-200 sm:px-4 lg:px-5 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2 flex-wrap items-center">
                        <h1 className="text-[25px] font-semibold">Sarees</h1>
                        <p className="text-sm text-gray-500 justify-center">
                            Showing 1–{products.length} of {totalCount} results
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 p-2 rounded shadow bg-black text-white hover:bg-gray-800 text-sm lg:hidden"
                        >
                            <Funnel size={18} />
                            FILTER
                        </button>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border rounded p-2 text-sm shadow-sm hover:shadow-md"
                        >
                            <option value="">New Arrivals</option>
                            <option value="AtoZ">A to Z</option>
                            <option value="ZtoA">Z to A</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>

                        <div className="flex gap-1">
                            {gridButtons.map((btn) => {
                                const Icon = btn.icon;
                                return (
                                    <button
                                        key={btn.value}
                                        onClick={() => setGrid(btn.value)}
                                        className={`p-2 rounded ${grid === btn.value ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                    >
                                        <Icon size={18} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <FilterSidebar
                    open={open}
                    setOpen={setOpen}
                    filterData={filterData}
                    onApply={handleApplyFilters}
                    setSelectedAttributes={setSelectedAttributes}
                    selectedAttributes={selectedAttributes}
                    mobile={true}
                />

                <div className="flex flex-wrap">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-1/4 px-2">
                        <FilterSidebar
                            open={true}
                            filterData={filterData}
                            onApply={handleApplyFilters}
                            setSelectedAttributes={setSelectedAttributes}
                            selectedAttributes={selectedAttributes}
                            mobile={false}
                        />
                    </div>
                    <div className="w-full lg:w-3/4 px-2">
                        {/* Active Filters - SHOW ABOVE PRODUCTS */}
                        <SelectedFilters
                            selectedAttributes={selectedAttributes}
                            onFiltersChange={handleApplyFilters}
                            setSelectedAttributes={setSelectedAttributes}
                            fetchProducts={fetchProducts}
                        />

                        <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-${grid}`}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    pathname={`${pathname}/${product?.url || "/"}`}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Product Grid */}
                    {/* <div className={`w-full lg:w-3/4 px-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-${grid}`}>

                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} pathname={`${pathname}/${product?.url || "/"}`} />
                        ))}
                    </div> */}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center my-4">
                <Pagination currentPage={page} totalCount={totalCount} perPage={20} onPageChange={(p) => setPage(p)} />
            </div>
        </>
    );
};

export default Productstheme2;
