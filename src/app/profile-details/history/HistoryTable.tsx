"use client";

import React, { useEffect, useState } from "react";
import { OrderType, userService } from "@/shared/services/userService";
import Spinner from "@/components/common/spinner/Spinner";

const HistoryTable: React.FC = () => {
    const [orders, setOrders] = useState<OrderType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<OrderType | null>(null);
    const [animateIn, setAnimateIn] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await userService.getUserProfile();
                setOrders(data?.orders || []);
            } catch (err) {
                console.error("Failed to load orders", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // trigger enter animation when modal opens
    useEffect(() => {
        if (selected) {
            // give next tick so transition runs
            requestAnimationFrame(() => setAnimateIn(true));
        } else {
            setAnimateIn(false);
        }
    }, [selected]);

    const closeModal = () => {
        // run exit animation then actually close
        setAnimateIn(false);
        setTimeout(() => setSelected(null), 200); // match duration below
    };

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleString() : "-";

    if (loading) return <div className="p-6"><Spinner /></div>;

    if (!orders || orders.length === 0)
        return (
            <div className="p-6 text-neutral-400">
                Nemate prethodnih narudžbi.
            </div>
        );

    return (
        <>
            <div className="overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-800 w-full">
                <table className="min-w-full w-full text-left">
                    <thead className="bg-neutral-900/30">
                        <tr>
                            <th className="px-4 py-3 text-sm text-neutral-300">Broj narudžbe</th>
                            <th className="px-4 py-3 text-sm text-neutral-300">Datum</th>
                            <th className="px-4 py-3 text-sm text-neutral-300">Iznos</th>
                            <th className="px-4 py-3 text-sm text-neutral-300">Status</th>
                            <th className="px-4 py-3 text-sm text-neutral-300">Proizvodi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr
                                key={o.id}
                                onClick={() => setSelected(o)}
                                className="cursor-pointer hover:bg-neutral-700 transition-colors border-t border-neutral-700"
                            >
                                <td className="px-4 py-3 text-sm text-white">{o.orderNumber}</td>
                                <td className="px-4 py-3 text-sm text-neutral-300">{formatDate(o.createdAt)}</td>
                                <td className="px-4 py-3 text-sm text-white">{o.total} KM</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${o.status === "DECLINED" ? "bg-red-600 text-white" :
                                        o.status === "COMPLETED" ? "bg-green-600 text-white" :
                                            "bg-yellow-600 text-white"
                                        }`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-300">{o.products?.length ?? 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-[rgba(17,17,17,0.7)]"
                        onClick={closeModal}
                    />
                    <div
                        // popup animation: opacity + translate + scale with transition
                        className={`relative z-10 w-full max-w-3xl mx-4 bg-neutral-800 border border-neutral-700 rounded-xl p-6 shadow-lg transform transition-all duration-200 ease-out
                          ${animateIn ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{selected.orderNumber}</h3>
                                <p className="text-sm text-neutral-400">{formatDate(selected.createdAt)}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-neutral-400 hover:text-white"
                                aria-label="Zatvori"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-300">
                            <div className="space-y-2">
                                <div><span className="text-neutral-400">Ime:</span> {selected.fullName}</div>
                                <div><span className="text-neutral-400">Email:</span> {selected.email}</div>
                                <div><span className="text-neutral-400">Telefon:</span> {selected.phone}</div>
                                <div><span className="text-neutral-400">Adresa:</span> {selected.street}, {selected.city} {selected.postCode}</div>
                            </div>

                            <div className="space-y-2">
                                <div><span className="text-neutral-400">Ukupno:</span> {selected.total} KM</div>
                                <div><span className="text-neutral-400">Isporuka:</span> {selected.shippingPrice} KM</div>
                                <div><span className="text-neutral-400">Popust:</span> {selected.discount} KM</div>
                                <div><span className="text-neutral-400">Bodovi:</span> {selected.points}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-neutral-300 mb-2">Proizvodi</h4>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                {(selected.products || []).map((p: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between gap-4 p-3 bg-neutral-900 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />}
                                            <div>
                                                <div className="text-sm text-white">{p.name || p.title || "Proizvod"}</div>
                                                {p.sku && <div className="text-xs text-neutral-400">SKU: {p.sku}</div>}
                                            </div>
                                        </div>
                                        <div className="text-sm text-neutral-300">{p.quantity ? `${p.quantity} x ${p.price}` : p.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selected.description && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-neutral-300 mb-1">Napomena</h4>
                                <p className="text-sm text-neutral-400">{selected.description}</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg"
                            >
                                Zatvori
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HistoryTable;