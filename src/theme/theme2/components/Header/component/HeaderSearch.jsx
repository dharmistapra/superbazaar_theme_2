"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Search, Truck, Mic, MicOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";

export default function HeaderSearch({ open, onClose }) {
    const BaseURL = process.env.NEXT_PUBLIC_API_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [results, setResults] = useState({ products: [], catalogues: [] });
    const [suggestions, setSuggestions] = useState([]);

    const router = useRouter();
    const inputRef = useRef(null);

    const { isListening, handleVoiceSearch } = useVoiceSearch({
        onResult: (transcript) => {
            setSearchTerm(transcript);
            router.push(`/search?search=${encodeURIComponent(transcript)}`);
            setShowSuggestions(false);
            onClose();
        },
    });

    // Autofocus when opening
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    // Fetch suggestions + results
    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults({ products: [], catalogues: [] });
            setSuggestions([]);
            return;
        }

        const delayFetch = setTimeout(() => {
            axios
                .get(`${BaseURL}api/public/search-filter?q=${encodeURIComponent(searchTerm)}`)
                .then((res) => {
                    setResults({
                        products: res.data.products || [],
                        catalogues: res.data.catalogues || [],
                    });
                    setSuggestions(res.data.suggestions || []);
                })
                .catch(() => {
                    setResults({ products: [], catalogues: [] });
                    setSuggestions([]);
                });
        }, 300);

        return () => clearTimeout(delayFetch);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/search?search=${encodeURIComponent(searchTerm)}`);
        setSearchTerm("");
        setShowSuggestions(false);
        onClose();
    };

    // Closed state
    if (!open) {
        return (
            <div className="border-1 border-dashed border-slate-300 flex items-center justify-center py-2 text-sm">
                <Truck className="mr-2 h-4 w-4 text-red-800" />
                <p className="text-red-800">Only Ready To Ship Products</p>
            </div>
        );
    }

    // Open state
    return (
        <div className="relative w-full">
            <form
                onSubmit={handleSubmit}
                className="flex items-center w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for Salwar"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    className="w-full bg-transparent outline-none text-sm p-1.5"
                    autoComplete="off"
                />

                {searchTerm ? (
                    <X
                        size={18}
                        className="ml-2 text-gray-600 cursor-pointer"
                        onClick={() => setSearchTerm("")}
                    />
                ) : (
                    <button
                        type="submit"
                        className="p-0 border-0 bg-transparent text-gray-600"
                        aria-label="Search"
                    >
                        <Search size={18} />
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`ml-2 ${isListening ? "animate-pulse text-red-500" : "text-gray-600"}`}
                    aria-label="Voice Search"
                >
                    {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
            </form>

            {showSuggestions &&
                (results.catalogues.length > 0 ||
                    results.products.length > 0 ||
                    suggestions.length > 0) && (
                    <div
                        className="absolute w-full mt-2 bg-white border border-gray-200 shadow-md rounded-lg"
                        style={{ zIndex: 9999, maxHeight: "400px", overflowY: "auto" }}
                    >
                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="p-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Related Keywords</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition"
                                            onClick={() => {
                                                setSearchTerm(s);
                                                router.push(`/search?search=${encodeURIComponent(s)}`);
                                                setShowSuggestions(false);
                                                onClose();
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Catalogues */}
                        {results.catalogues.length > 0 && (
                            <div className="p-3 border-b border-gray-100">
                                <h6 className="text-sm font-semibold text-gray-700 mb-2">Catalogues</h6>
                                <div className="space-y-2">
                                    {results.catalogues.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                router.push(`/catalogue/${cat?.categories?.[0]?.url}/${cat.url}`);
                                                setSearchTerm("");
                                                setShowSuggestions(false);
                                                onClose();
                                            }}
                                        >
                                            <div className="relative w-[50px] h-[70px] flex-shrink-0">
                                                <Image
                                                    src={ImageUrl(cat.coverImage)}
                                                    alt={cat.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                                                <p className="text-red-500 text-xs">Rs. {cat.offer_price?.toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">Code: {cat.cat_code}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Products */}
                        {results.products.length > 0 && (
                            <div className="p-3">
                                <h6 className="text-sm font-semibold text-gray-700 mb-2">Products</h6>
                                <div className="space-y-2">
                                    {results.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                router.push(`/retail/${product?.categories?.[0]?.url}/${product.url}`);
                                                setSearchTerm("");
                                                setShowSuggestions(false);
                                                onClose();
                                            }}
                                        >
                                            <div className="relative w-[50px] h-[70px] flex-shrink-0">
                                                <Image
                                                    src={ImageUrl(product.thumbImage?.[0])}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                <p className="text-red-500 text-xs">Rs. {product.offer_price?.toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
        </div>
    );
}
