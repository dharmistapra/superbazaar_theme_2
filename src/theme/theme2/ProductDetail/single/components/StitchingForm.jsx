"use client";
import { useModal } from "@/hooks/useModal";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";

export default function StitchingForm({ stitchingData, onChange }) {
    const [selectedStitch, setSelectedStitch] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState("stitching");
    const toggle = (section) => {
        setOpen(open === section ? null : section);
    };
    const handleRadioChange = (option) => {
        setSelectedStitch(option.id);
        setFormData({ [option.id]: {} });
        setErrors({});
    };

    const handleCheckboxChange = (option) => {
        setFormData((prev) => {
            const current = prev[option.id];
            if (current) {
                const updated = { ...prev };
                delete updated[option.id];
                return updated;
            } else {
                return { ...prev, [option.id]: {} };
            }
        });
        setErrors({});
    };

    const handleInputChange = (optionId, fieldId, value) => {
        setFormData((prev) => ({
            ...prev,
            [optionId]: {
                ...(prev[optionId] || {}),
                [fieldId]: value,
            },
        }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            if (!value || value.trim() === "") {
                newErrors[`${optionId}_${fieldId}`] = "This field is required";
            } else {
                delete newErrors[`${optionId}_${fieldId}`];
            }
            return newErrors;
        });
    };

    useEffect(() => {
        const finalData = {
            stitching: Object.entries(formData).map(([optionId, fields]) => {
                const option = stitchingData
                    .flatMap((s) => s.stitchingOption)
                    .find((o) => o.id === optionId);

                return {
                    optionid: optionId,
                    measurment:
                        option?.stitchingValues?.map((field) => ({
                            name: field.name,
                            value: fields[field.id] || "",
                        })) || [],
                };
            }),
            isValid: Object.entries(formData).every(([optionId, fields]) => {
                const option = stitchingData
                    .flatMap((s) => s.stitchingOption)
                    .find((o) => o.id === optionId);

                if (!option?.stitchingValues?.length) return true;
                return option.stitchingValues.every(
                    (field) => fields[field.id] && fields[field.id].trim() !== ""
                );
            }),
        };

        onChange?.(finalData);
    }, [formData, stitchingData, onChange]);


    return (
        <>



            <div className="px-4 pb-4 text-sm border-">
                {stitchingData.map((section) => (
                    <div key={section.id} className="mb-6">
                        {/* Section Title */}
                        <h4 className="font-semibold mb-2">{section.name}</h4>

                        {/* Radio Options */}
                        {section.stitchingOption.some((o) => o.type === "Redio") && (
                            <div className="space-y-2">
                                {section.stitchingOption.map(
                                    (option) =>
                                        option.type === "Redio" && (
                                            <label
                                                key={option.id}
                                                className="flex items-start gap-2 mb-2 cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`stitching_${section.id}`}
                                                    value={option.id}
                                                    checked={selectedStitch === option.id}
                                                    onChange={() => handleRadioChange(option)}
                                                    className="mt-1 accent-blue-600"
                                                />
                                                <span>
                                                    <span>{option.name} – ₹{option.price || 0}.00 </span>
                                                    {option.fastDelivery && (
                                                        <span className="text-red-600">(Same day dispatch)</span>
                                                    )}
                                                </span>
                                            </label>
                                        )
                                )}
                            </div>
                        )}

                        {section.stitchingOption.some((o) => o.type === "CheckBox") && (
                            <div className="space-y-2">
                                {section.stitchingOption.map(
                                    (option) =>
                                        option.type === "CheckBox" && (
                                            <label
                                                key={option.id}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={!!formData[option.id]}
                                                    onChange={() => handleCheckboxChange(option)}
                                                    className="w-4 h-4 accent-red-500"
                                                />
                                                <span>
                                                    {option.name} {option.price > 0 && `– ₹${option.price}`}
                                                </span>
                                            </label>
                                        )
                                )}
                            </div>
                        )}

                        {section.stitchingOption
                            .filter((opt) => opt.id === selectedStitch)
                            .map((option) =>
                                option.stitchingValues.length > 0 ? (
                                    <div key={option.id} className="mt-4 pt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {option.stitchingValues.map((field) => (
                                                <div key={field.id} className="flex flex-col">
                                                    <label className="mb-1 font-medium">
                                                        {field.name}{" "}
                                                        {field.range && (
                                                            <span className="text-sm text-gray-500">({field.range})</span>
                                                        )}
                                                    </label>

                                                    {field.type === "TextField" ? (
                                                        <input
                                                            type="number"
                                                            placeholder={field.range}
                                                            value={formData[option.id]?.[field.id] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(option.id, field.id, e.target.value)
                                                            }
                                                            className={`border rounded-lg px-3 py-2 outline-none ${errors[`${option.id}_${field.id}`] ? "border-red-500" : ""
                                                                }`}
                                                        />
                                                    ) : field.type === "Dropdown" ? (
                                                        <select
                                                            value={formData[option.id]?.[field.id] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(option.id, field.id, e.target.value)
                                                            }
                                                            className={`border rounded-lg px-3 py-2 outline-none ${errors[`${option.id}_${field.id}`] ? "border-red-500" : ""
                                                                }`}
                                                        >
                                                            <option value="">Select</option>
                                                            {field.values.split(",").map((val) => (
                                                                <option key={val} value={val}>
                                                                    {val}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : null}

                                                    {errors[`${option.id}_${field.id}`] && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors[`${option.id}_${field.id}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null
                            )}
                    </div>
                ))}
            </div>
        </>
    );
}
