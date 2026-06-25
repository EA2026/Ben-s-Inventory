import { useEffect, useMemo, useState } from "react";

const NAVS = [
  { name: "Inventory", icon: "📦" },
  { name: "Orders", icon: "🛒" },
  { name: "Packing", icon: "🧳" },
  { name: "Gallery", icon: "📷" },
  { name: "New request", icon: "🆕" },
];

const CATEGORIES = [
  "All",
  "Toiletries",
  "Skincare",
  "Sunscreen",
  "Medications",
  "Supplements",
  "Vision Care",
  "Travel Gear",
  "Household",
];

const INITIAL_INVENTORY = [
  { id: "razor-blades", category: "Toiletries", item: "Razor blades", brand: "Gillette", use: "Both", homeStock: 4, travelStock: 0, reorderAt: 2, notes: "2-pack", photo: "", requested: false },
  { id: "toothpaste-full", category: "Toiletries", item: "Toothpaste — full size", brand: "Sensodyne", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Full tube", photo: "", requested: false },
  { id: "toothpaste-travel", category: "Toiletries", item: "Toothpaste — travel size", brand: "Sensodyne", use: "Travel", homeStock: 2, travelStock: 0, reorderAt: 1, notes: "Travel tube", photo: "", requested: false },
  { id: "floss", category: "Toiletries", item: "Dental floss", brand: "Oral-B Glide", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Standard", photo: "", requested: false },
  { id: "mouthwash-full", category: "Toiletries", item: "Mouthwash — full size", brand: "Listerine", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Full bottle", photo: "", requested: false },
  { id: "mouthwash-travel", category: "Toiletries", item: "Mouthwash — travel size", brand: "Listerine", use: "Travel", homeStock: 2, travelStock: 0, reorderAt: 1, notes: "3 fl oz", photo: "", requested: false },
  { id: "deodorant", category: "Toiletries", item: "Deodorant", brand: "Degree", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "2.7 oz", photo: "", requested: false },
  { id: "cotton-swabs", category: "Toiletries", item: "Cotton swabs", brand: "Unknown", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Jar", photo: "", requested: false },

  { id: "cerave-lotion", category: "Skincare", item: "Daily moisturizing lotion", brand: "CeraVe", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "16 fl oz", photo: "", requested: false },
  { id: "jackblack-spf20", category: "Skincare", item: "Face moisturizer SPF 20", brand: "Jack Black", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "6.5 fl oz", photo: "", requested: false },
  { id: "jackblack-serum", category: "Skincare", item: "Protein booster serum", brand: "Jack Black", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Dropper", photo: "", requested: false },
  { id: "jackblack-face-cream", category: "Skincare", item: "Ultra-calming face cream", brand: "Jack Black", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Travel tube", photo: "", requested: false },
  { id: "jackblack-scrub", category: "Skincare", item: "Energizing face scrub", brand: "Jack Black", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "6 fl oz", photo: "", requested: false },

  { id: "spf70", category: "Sunscreen", item: "Sunscreen SPF 70", brand: "Neutrogena", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "5 fl oz", photo: "", requested: false },
  { id: "spf70-travel", category: "Sunscreen", item: "Sunscreen — travel size", brand: "Neutrogena", use: "Travel", homeStock: 2, travelStock: 0, reorderAt: 1, notes: "3 fl oz", photo: "", requested: false },
  { id: "bens-sunscreen", category: "Sunscreen", item: "Ben's sunscreen", brand: "TBD", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "TBD", photo: "", requested: false },

  { id: "advil-home", category: "Medications", item: "Ibuprofen 200mg", brand: "Advil", use: "Home", homeStock: 360, travelStock: 0, reorderAt: 100, notes: "360ct", photo: "", requested: false },
  { id: "advil-travel", category: "Medications", item: "Ibuprofen — travel pack", brand: "Advil", use: "Travel", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Small bottle", photo: "", requested: false },
  { id: "zyrtec", category: "Medications", item: "Allergy tablets", brand: "Zyrtec", use: "Both", homeStock: 50, travelStock: 0, reorderAt: 10, notes: "10mg", photo: "", requested: false },
  { id: "bandaids", category: "Medications", item: "Band-aids / first aid", brand: "Band-Aid", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Assorted", photo: "", requested: false },
  { id: "metamucil", category: "Medications", item: "Fiber supplement packets", brand: "Metamucil", use: "Travel", homeStock: 4, travelStock: 0, reorderAt: 2, notes: "Packets", photo: "", requested: false },

  { id: "b12", category: "Supplements", item: "Vitamin B12", brand: "Nature Made", use: "Home", homeStock: 90, travelStock: 0, reorderAt: 20, notes: "1000 mcg", photo: "", requested: false },
  { id: "d3", category: "Supplements", item: "Vitamin D3", brand: "Nature Made", use: "Home", homeStock: 100, travelStock: 0, reorderAt: 20, notes: "1000 IU", photo: "", requested: false },
  { id: "align", category: "Supplements", item: "Probiotic", brand: "Align", use: "Home", homeStock: 63, travelStock: 0, reorderAt: 15, notes: "Capsules", photo: "", requested: false },

  { id: "contacts-left", category: "Vision Care", item: "Daily contacts — left", brand: "Precision1", use: "Both", homeStock: 10, travelStock: 0, reorderAt: 5, notes: "Daily", photo: "", requested: false },
  { id: "contacts-right", category: "Vision Care", item: "Daily contacts — right", brand: "Precision1", use: "Both", homeStock: 10, travelStock: 0, reorderAt: 5, notes: "Daily", photo: "", requested: false },
  { id: "contact-solution", category: "Vision Care", item: "Contact lens solution", brand: "ReNu", use: "Travel", homeStock: 2, travelStock: 0, reorderAt: 1, notes: "Travel bottle", photo: "", requested: false },

  { id: "dopp-kit", category: "Travel Gear", item: "Toiletry / dopp kit", brand: "Tumi", use: "Travel", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Medium", photo: "", requested: false },
  { id: "battery-pack", category: "Travel Gear", item: "Portable battery pack", brand: "Unknown", use: "Travel", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Slim bar", photo: "", requested: false },

  { id: "magic-eraser", category: "Household", item: "Magic Eraser pads", brand: "Mr. Clean", use: "Home", homeStock: 10, travelStock: 0, reorderAt: 3, notes: "10-pack", photo: "", requested: false },
  { id: "medical-pen", category: "Household", item: "Medical pen device", brand: "TBD", use: "Both", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "Confirm label", photo: "", requested: false },
];

const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const uid = () => Math.random().toString(36).slice(2, 10);

function statColor(kind) {
  if (kind === "good") return { bg: "#e6f5ea", fg: "#2d8d4d" };
  if (kind === "warn") return { bg: "#fff2cc", fg: "#9f7b17" };
  return { bg: "#eef2ff", fg: "#4f46e5" };
}

function calcStatus(item, order) {
  if (order?.status === "on order") return "On order";
  if (item.requested || order?.status === "requested") return "Requested";
  if (item.homeStock <= 0) return "Out";
  if (item.homeStock <= item.reorderAt) return `Low — ${item.homeStock} left`;
  return "Stocked";
}

function Pill({ active, children, onClick, small }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid #d9e0ea",
        background: active ? "#22345c" : "#fff",
        color: active ? "#fff" : "#72819b",
        borderRadius: 999,
        padding: small ? "7px 12px" : "10px 16px",
        fontSize: small ? 13 : 15,
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: active ? "0 3px 10px rgba(34,52,92,.18)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function Badge({ text, tone = "good" }) {
  const c = statColor(tone);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 800,
        color: c.fg,
        background: c.bg,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

function TopStat({ label, value }) {
  return (
    <div style={{ minWidth: 82 }}>
      <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, color: "#fff" }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, letterSpacing: 1.1, textTransform: "uppercase", color: "rgba(255,255,255,.52)" }}>{label}</div>
    </div>
  );
}

function Panel({ title, subtitle, children, right }) {
  return (
    <section style={{ borderRadius: 18, overflow: "hidden", background: "#fff", border: "1px solid #e4e9f2", boxShadow: "0 10px 30px rgba(31,43,74,.07)" }}>
      <div style={{ background: "#22345c", color: "#fff", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>{title}</div>
          {subtitle ? <div style={{ marginTop: 4, color: "rgba(255,255,255,.55)", fontSize: 14 }}>{subtitle}</div> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.55)", zIndex: 60, display: "grid", placeItems: "center", padding: 16 }} onClick={onClose}>
      <div style={{ width: "min(760px, 96vw)", maxHeight: "92vh", overflow: "auto", background: "#fff", borderRadius: 20, boxShadow: "0 30px 80px rgba(0,0,0,.25)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #e5eaf2", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#22345c" }}>{title}</div>
          <button onClick={onClose} style={{ border: "none", background: "#eef2f8", borderRadius: 12, padding: "8px 12px", fontWeight: 800 }}>✕</button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Inventory");
  const [inventory, setInventory] = useState(() => loadJSON("inventory-items", INITIAL_INVENTORY));
  const [orders, setOrders] = useState(() => loadJSON("inventory-orders", []));
  const [tripName, setTripName] = useState(() => loadJSON("inventory-trip-name", ""));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [inventoryMode, setInventoryMode] = useState("Table");
  const [inventoryFilter, setInventoryFilter] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [packItemId, setPackItemId] = useState(INITIAL_INVENTORY[0].id);
  const [packQty, setPackQty] = useState(1);
  const [newRequest, setNewRequest] = useState({ item: "", brand: "", category: "Household", use: "Home", qty: 1, note: "" });
  const [draft, setDraft] = useState({ item: "", brand: "", category: "Household", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "", photo: "" });

  useEffect(() => localStorage.setItem("inventory-items", JSON.stringify(inventory)), [inventory]);
  useEffect(() => localStorage.setItem("inventory-orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("inventory-trip-name", JSON.stringify(tripName)), [tripName]);

  useEffect(() => {
    if (!packItemId && inventory.length) setPackItemId(inventory[0].id);
  }, [inventory, packItemId]);

  const currentOrders = useMemo(() => orders.filter((o) => o.status !== "done" && o.status !== "declined"), [orders]);
  const orderCounts = useMemo(() => ({ requested: orders.filter((o) => o.status === "requested").length, onOrder: orders.filter((o) => o.status === "on order").length, done: orders.filter((o) => o.status === "done").length }), [orders]);
  const stats = useMemo(() => ({ items: inventory.length, low: inventory.filter((i) => i.homeStock <= i.reorderAt).length, requested: orders.filter((o) => o.status === "requested").length, onOrder: orders.filter((o) => o.status === "on order").length }), [inventory, orders]);
  const categoriesForFilter = useMemo(() => ["All", ...new Set(inventory.map((i) => i.category))], [inventory]);

  const filteredInventory = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inventory.filter((item) => {
      const order = orders.find((o) => o.itemId === item.id && o.status !== "done" && o.status !== "declined");
      const status = calcStatus(item, order);
      const matchesSearch = !q || [item.category, item.item, item.brand, item.use, item.notes].join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "All" || item.category === category;
      const matchesInventoryFilter = inventoryFilter === "All"
        || (inventoryFilter === "Low stock" && item.homeStock <= item.reorderAt)
        || (inventoryFilter === "Monitor" && item.homeStock <= item.reorderAt)
        || (inventoryFilter === "Active orders" && (item.requested || order?.status === "requested" || order?.status === "on order"))
        || (inventoryFilter === "Home only" && item.use === "Home")
        || (inventoryFilter === "Travel only" && item.use === "Travel");
      return matchesSearch && matchesCategory && matchesInventoryFilter && !!status;
    });
  }, [inventory, search, category, inventoryFilter, orders]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || currentOrders[0] || null;
  const packableItems = inventory.filter((i) => i.homeStock > 0);
  const packedItems = inventory.filter((i) => i.travelStock > 0);

  function saveDraftItem() {
    const next = { id: editingId || uid(), category: draft.category, item: draft.item.trim(), brand: draft.brand.trim(), use: draft.use, homeStock: Number(draft.homeStock) || 0, travelStock: Number(draft.travelStock) || 0, reorderAt: Number(draft.reorderAt) || 1, notes: draft.notes.trim(), photo: draft.photo || "", requested: false };
    if (!next.item) return;
    setInventory((prev) => (editingId ? prev.map((i) => (i.id === editingId ? next : i)) : [next, ...prev]));
    setShowModal(false);
    setEditingId(null);
  }

  function openAddItem() {
    setEditingId(null);
    setDraft({ item: "", brand: "", category: "Household", use: "Home", homeStock: 1, travelStock: 0, reorderAt: 1, notes: "", photo: "" });
    setShowModal(true);
  }

  function openEditItem(item) {
    setEditingId(item.id);
    setDraft({ item: item.item, brand: item.brand, category: item.category, use: item.use, homeStock: item.homeStock, travelStock: item.travelStock, reorderAt: item.reorderAt, notes: item.notes || "", photo: item.photo || "" });
    setShowModal(true);
  }

  function deleteItem(id) {
    if (!window.confirm("Delete this item?")) return;
    setInventory((prev) => prev.filter((i) => i.id !== id));
    setOrders((prev) => prev.filter((o) => o.itemId !== id));
    if (packItemId === id) setPackItemId("");
  }

  function adjustHome(id, delta) {
    setInventory((prev) => prev.map((i) => (i.id === id ? { ...i, homeStock: Math.max(0, i.homeStock + delta) } : i)));
  }

  function requestRestock(itemId) {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;
    setInventory((prev) => prev.map((i) => (i.id === itemId ? { ...i, requested: true } : i)));
    setOrders((prev) => {
      const existing = prev.find((o) => o.itemId === itemId && o.status !== "done" && o.status !== "declined");
      if (existing) return prev.map((o) => (o.id === existing.id ? { ...o, status: "requested" } : o));
      return [{ id: uid(), kind: "restock", itemId, item: item.item, brand: item.brand, category: item.category, qty: 1, status: "requested", note: "" }, ...prev];
    });
    setActiveTab("Orders");
  }

  function setOrderStatus(orderId, status) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    if (order.kind === "restock" && status === "done" && order.status !== "done" && order.itemId) {
      setInventory((prev) => prev.map((i) => (i.id === order.itemId ? { ...i, homeStock: i.homeStock + (Number(order.qty) || 1), requested: false } : i)));
    }

    if (order.kind === "restock" && (status === "done" || status === "declined") && order.itemId) {
      setInventory((prev) => prev.map((i) => (i.id === order.itemId ? { ...i, requested: false } : i)));
    }

    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    if (order?.kind === "new" && status === "done") {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  }

  function addNewRequest() {
    if (!newRequest.item.trim()) return;
    setOrders((prev) => [{ id: uid(), kind: "new", itemId: null, item: newRequest.item.trim(), brand: newRequest.brand.trim(), category: newRequest.category, qty: Number(newRequest.qty) || 1, use: newRequest.use, status: "requested", note: newRequest.note.trim() }, ...prev]);
    setNewRequest({ item: "", brand: "", category: "Household", use: "Home", qty: 1, note: "" });
    setActiveTab("New request");
  }

  function approveNewRequest(orderId) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const newItem = { id: uid(), category: order.category, item: order.item, brand: order.brand, use: order.use, homeStock: order.qty, travelStock: 0, reorderAt: 1, notes: order.note, photo: "", requested: false };
    setInventory((prev) => [newItem, ...prev]);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "done" } : o)));
    setSelectedOrderId(null);
  }

  function packItem() {
    const qty = Math.max(1, Number(packQty) || 1);
    const item = inventory.find((i) => i.id === packItemId);
    if (!item || item.homeStock < qty) return;
    setInventory((prev) => prev.map((i) => (i.id === packItemId ? { ...i, homeStock: i.homeStock - qty, travelStock: i.travelStock + qty } : i)));
  }

  function unpackAll() {
    setInventory((prev) => prev.map((i) => (i.travelStock > 0 ? { ...i, homeStock: i.homeStock + i.travelStock, travelStock: 0 } : i)));
  }

  function unpackOne(id) {
    setInventory((prev) => prev.map((i) => (i.id === id && i.travelStock > 0 ? { ...i, homeStock: i.homeStock + 1, travelStock: i.travelStock - 1 } : i)));
  }

  function onUploadPhoto(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => callback(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  const inventoryView = (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 380px", background: "#fff", border: "1px solid #dde4ee", borderRadius: 14, padding: "8px 14px", boxShadow: "0 4px 12px rgba(0,0,0,.04)" }}>
          <span style={{ fontSize: 20, opacity: 0.65 }}>🔎</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ border: "none", outline: "none", width: "100%", fontSize: 14, background: "transparent" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categoriesForFilter.map((c) => <Pill key={c} active={category === c} small onClick={() => setCategory(c)}>{c}</Pill>)}
        </div>

        <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" }}>
          <Pill active={inventoryMode === "Table"} small onClick={() => setInventoryMode("Table")}>Table</Pill>
          <Pill active={inventoryMode === "Cards"} small onClick={() => setInventoryMode("Cards")}>Cards</Pill>
          <button onClick={openAddItem} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "8px 14px", fontWeight: 900, fontSize: 13, boxShadow: "0 4px 10px rgba(31,122,63,.18)" }}>+ Add item</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "center", borderBottom: "1px solid #e5e9f0", paddingBottom: 10, color: "#64748b", fontWeight: 700, overflowX: "auto" }}>
        {["All", "Low stock", "Monitor", "Active orders", "Home only", "Travel only"].map((f) => (
          <button key={f} onClick={() => setInventoryFilter(f)} style={{ background: "transparent", border: "none", borderBottom: inventoryFilter === f ? "4px solid #22345c" : "4px solid transparent", paddingBottom: 10, color: inventoryFilter === f ? "#22345c" : "#64748b", fontWeight: 800 }}>
            {f === "Monitor" ? "⚠️ Monitor" : f === "Active orders" ? "⚡ Active orders" : f === "Home only" ? "🏠 Home only" : f === "Travel only" ? "✈️ Travel only" : f === "Low stock" ? "🔴 Low stock" : f}
          </button>
        ))}
      </div>

      {inventoryMode === "Table" ? (
        <div style={{ overflow: "hidden", borderRadius: 18, border: "1px solid #dfe5ee", background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ background: "#22345c", color: "#fff" }}>
                {["Category", "Item", "Brand", "Use", "Home stock", "Reorder at", "Status", "Action"].map((head) => <th key={head} style={{ textAlign: "left", padding: "14px 16px", fontSize: 14, letterSpacing: 0.4 }}>{head.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const order = orders.find((o) => o.itemId === item.id && o.status !== "done" && o.status !== "declined");
                const status = calcStatus(item, order);
                const tone = status === "Stocked" ? "good" : status.startsWith("Low") || status === "Out" ? "warn" : "info";
                return (
                  <tr key={item.id} style={{ borderTop: "1px solid #eef2f7", background: status.startsWith("Low") || status === "Out" ? "#fff7f7" : "#fff" }}>
                    <td style={{ padding: 16 }}><Badge text={item.category} tone="info" /></td>
                    <td style={{ padding: 16, fontWeight: 800, color: "#232b3a" }}>{item.item}</td>
                    <td style={{ padding: 16, color: "#6b7280", whiteSpace: "pre-line" }}>{item.brand}{item.notes ? `\n${item.notes}` : ""}</td>
                    <td style={{ padding: 16 }}><Badge text={item.use === "Both" ? "🏠✈️ Both" : item.use === "Home" ? "🏠 Home" : "✈️ Travel"} tone="info" /></td>
                    <td style={{ padding: 16, minWidth: 120 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #dbe1ea", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                        <button onClick={() => adjustHome(item.id, -1)} style={{ padding: "6px 12px", border: "none", background: "#fff", borderRight: "1px solid #dbe1ea", fontWeight: 900 }}>−</button>
                        <span style={{ padding: "6px 16px", background: "#fff6d6", color: "#335536", fontWeight: 900 }}>{item.homeStock}</span>
                        <button onClick={() => adjustHome(item.id, 1)} style={{ padding: "6px 12px", border: "none", background: "#fff", borderLeft: "1px solid #dbe1ea", fontWeight: 900 }}>+</button>
                      </div>
                    </td>
                    <td style={{ padding: 16, color: "#6b7280" }}>{item.reorderAt === 1 ? "When low" : `${item.reorderAt} left`}</td>
                    <td style={{ padding: 16 }}><Badge text={status} tone={tone} /></td>
                    <td style={{ padding: 16 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={() => requestRestock(item.id)} style={{ background: order ? "#e5e7ff" : "#5f60c7", color: order ? "#4749a9" : "#fff", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 900, fontSize: 13 }}>{order ? "Requested" : "🛒 Request restock"}</button>
                        <button onClick={() => openEditItem(item)} style={{ border: "1px solid #dfe5ee", background: "#fff", borderRadius: 10, width: 38, height: 38, fontWeight: 900 }}>✎</button>
                        <button onClick={() => deleteItem(item.id)} style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid #df6b6b", background: "#fff", color: "#cc4b4b" }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
          {filteredInventory.map((item) => {
            const order = orders.find((o) => o.itemId === item.id && o.status !== "done" && o.status !== "declined");
            const status = calcStatus(item, order);
            return (
              <div key={item.id} style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 8px 18px rgba(31,43,74,.05)", cursor: "pointer" }} onClick={() => openEditItem(item)}>
                <div style={{ height: 180, background: item.photo ? `url(${item.photo}) center/cover` : "linear-gradient(135deg, #f2f6fb, #dfe8f5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontWeight: 700 }}>{item.photo ? "" : "Photo preview"}</div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 900, color: "#111827" }}>{item.item}</div>
                  <div style={{ marginTop: 6, color: "#6b7280", fontSize: 14 }}>{item.brand} · {item.category}</div>
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Badge text={status} tone={status === "Stocked" ? "good" : status.startsWith("Low") || status === "Out" ? "warn" : "info"} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={(e) => { e.stopPropagation(); openEditItem(item); }} style={{ border: "1px solid #dfe5ee", background: "#fff", borderRadius: 10, padding: "8px 10px", fontWeight: 800 }}>Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} style={{ border: "1px solid #df6b6b", background: "#fff", color: "#cc4b4b", borderRadius: 10, padding: "8px 10px", fontWeight: 800 }}>Delete</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={(e) => { e.stopPropagation(); requestRestock(item.id); }} style={{ flex: 1, background: "#5f60c7", color: "#fff", border: "none", borderRadius: 10, padding: "10px 12px", fontWeight: 900 }}>🛒 Request restock</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const ordersView = (
    <div style={{ display: "grid", gap: 18 }}>
      <section style={{ borderRadius: 18, background: "#22345c", color: "#fff", padding: 18, display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Order management</div>
          <div style={{ marginTop: 4, color: "rgba(255,255,255,.55)" }}>Approve · Track · Restock</div>
        </div>
        <div style={{ display: "flex", gap: 18, textAlign: "center" }}>
          <TopStat label="Requested" value={orderCounts.requested} />
          <TopStat label="On order" value={orderCounts.onOrder} />
          <TopStat label="Done" value={orderCounts.done} />
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[["requested", "Requested", "#fff3cd"], ["on order", "On order", "#e5f4e8"], ["done", "Done", "#e5f4e8"]].map(([status, label, bg]) => (
          <div key={status} style={{ border: "1px solid #dfe5ee", borderRadius: 16, background: "#fff", minHeight: 130, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 900, color: "#1f2b4a" }}>
              <div>{label}</div>
              <span style={{ background: bg, borderRadius: 999, padding: "2px 8px", fontSize: 12, fontWeight: 900 }}>{orders.filter((o) => o.status === status).length}</span>
            </div>
            <div style={{ borderTop: "1px solid #eef2f7", padding: 18 }}>
              {orders.filter((o) => o.status === status).length ? orders.filter((o) => o.status === status).map((o) => (
                <button key={o.id} onClick={() => setSelectedOrderId(o.id)} style={{ display: "block", width: "100%", textAlign: "left", background: selectedOrderId === o.id ? "#eef2ff" : "#fff", border: "1px solid #e5ebf2", borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
                  <div style={{ fontWeight: 800 }}>{o.item}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{o.brand} · {o.kind === "new" ? "New request" : "Restock"}</div>
                </button>
              )) : <div style={{ textAlign: "center", color: "#6b7280", padding: 20 }}>None</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #dfe5ee" }}>
        <div style={{ background: "#22345c", color: "#fff", padding: "14px 16px", fontWeight: 900 }}>Select an order above to manage it</div>
        <div style={{ padding: 18, display: "grid", gap: 14 }}>
          {selectedOrder ? (
            <>
              <div style={{ display: "grid", gap: 8 }}>
                <div><strong>Item:</strong> {selectedOrder.item}</div>
                <div><strong>Brand:</strong> {selectedOrder.brand || "—"}</div>
                <div><strong>Category:</strong> {selectedOrder.category}</div>
                <div><strong>Status:</strong> {selectedOrder.status}</div>
                {selectedOrder.note ? <div><strong>Note:</strong> {selectedOrder.note}</div> : null}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {selectedOrder.kind === "new" ? (
                  <>
                    <button onClick={() => approveNewRequest(selectedOrder.id)} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>Approve & add to inventory</button>
                    <button onClick={() => setOrderStatus(selectedOrder.id, "declined")} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>Decline</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setOrderStatus(selectedOrder.id, "on order")} style={{ background: "#22345c", color: "#fff", border: "none", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>Mark on order</button>
                    <button onClick={() => setOrderStatus(selectedOrder.id, "done")} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>Mark done</button>
                    <button onClick={() => setOrderStatus(selectedOrder.id, "declined")} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>Remove</button>
                  </>
                )}
              </div>
            </>
          ) : <div style={{ textAlign: "center", color: "#6b7280", padding: 36 }}>Click any item in the pipeline to review, approve, log details, or confirm restocking.</div>}
        </div>
      </div>
    </div>
  );

  const packingView = (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel title="Packing list" subtitle="Pack from home · Auto-deducts · Unpack when back" right={<div style={{ display: "flex", gap: 10 }}><button onClick={unpackAll} style={{ background: "#d0a63d", color: "#22345c", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 900 }}>↩ Unpack all</button><button onClick={() => setInventory((prev) => prev.map((i) => ({ ...i, travelStock: 0 })))} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "10px 16px", fontWeight: 900 }}>🗑 Clear</button></div>}>
        <div style={{ padding: 18, display: "grid", gap: 14 }}>
          <div style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ background: "#22345c", color: "#fff", padding: "12px 16px", fontWeight: 900 }}>Trip name</div>
            <div style={{ padding: 14 }}><input value={tripName} onChange={(e) => setTripName(e.target.value)} placeholder="e.g. NYC business trip, June 2026" style={{ width: "100%", border: "1px solid #dfe5ee", borderRadius: 12, padding: 14, fontSize: 16, outline: "none" }} /></div>
          </div>
          <div style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ background: "#22345c", color: "#fff", padding: "12px 16px", fontWeight: 900 }}>Pack an item</div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 96px", gap: 10, alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "#64748b", marginBottom: 6 }}>ITEM</div>
                  <select value={packItemId} onChange={(e) => setPackItemId(e.target.value)} style={{ width: "100%", border: "1px solid #dfe5ee", borderRadius: 10, padding: 12, fontSize: 15, outline: "none" }}>
                    {packableItems.map((i) => <option key={i.id} value={i.id}>{i.item}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "#64748b", marginBottom: 6 }}>QTY</div>
                  <div style={{ display: "inline-flex", border: "1px solid #dfe5ee", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                    <button onClick={() => setPackQty((q) => Math.max(1, Number(q) - 1))} style={{ padding: "10px 12px", border: "none", background: "#fff", borderRight: "1px solid #dfe5ee", fontWeight: 900 }}>−</button>
                    <span style={{ padding: "10px 18px", fontWeight: 900 }}>{packQty}</span>
                    <button onClick={() => setPackQty((q) => Number(q) + 1)} style={{ padding: "10px 12px", border: "none", background: "#fff", borderLeft: "1px solid #dfe5ee", fontWeight: 900 }}>+</button>
                  </div>
                </div>
                <button onClick={packItem} style={{ background: "#22345c", color: "#fff", border: "none", borderRadius: 12, padding: "12px 14px", fontWeight: 900 }}>+ Pack</button>
              </div>
              <div style={{ marginTop: 12, padding: 12, border: "1px solid #edf1f5", borderRadius: 12, background: "#fafbfd", color: "#374151" }}>{(() => { const item = inventory.find((i) => i.id === packItemId); if (!item) return "Select an item to see available home stock."; return `${item.item} — Home: ${item.homeStock} → after packing: ${Math.max(0, item.homeStock - Number(packQty || 1))}`; })()}</div>
            </div>
          </div>
          <div style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ background: "#22345c", color: "#fff", padding: "12px 16px", fontWeight: 900 }}>What's packed</div>
            <div style={{ padding: 18 }}>
              {packedItems.length ? packedItems.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "12px 0", borderBottom: "1px solid #edf1f5" }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{item.item}</div>
                    <div style={{ color: "#6b7280", fontSize: 14 }}>{item.brand} · Home {item.homeStock} · Travel {item.travelStock}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => unpackOne(item.id)} style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 10, padding: "8px 10px", fontWeight: 900 }}>Unpack 1</button>
                    <button onClick={() => setInventory((prev) => prev.map((i) => i.id === item.id ? { ...i, homeStock: i.homeStock + i.travelStock, travelStock: 0 } : i))} style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 10, padding: "8px 10px", fontWeight: 900 }}>Unpack all</button>
                  </div>
                </div>
              )) : <div style={{ textAlign: "center", color: "#6b7280", padding: 34 }}>No items packed yet.<br />Use the form above to pack from home stock.</div>}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );

  const galleryView = (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel title="Product gallery" subtitle="Photos of all inventory products — tap any photo to enlarge" right={<button onClick={openAddItem} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 900 }}>📷 Add photo & item</button>}>
        <div style={{ padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
            {inventory.map((item) => (
              <div key={item.id} style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 8px 18px rgba(31,43,74,.05)", cursor: "pointer" }} onClick={() => openEditItem(item)}>
                <div style={{ height: 180, background: item.photo ? `url(${item.photo}) center/cover` : "linear-gradient(135deg, #f2f6fb, #dfe8f5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontWeight: 700 }}>{item.photo ? "" : "Photo preview"}</div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 900, color: "#111827" }}>{item.item}</div>
                  <div style={{ marginTop: 6, color: "#6b7280", fontSize: 14 }}>{item.brand} · {item.category}</div>
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Badge text={`Home ${item.homeStock}`} tone={item.homeStock <= item.reorderAt ? "warn" : "good"} />
                    <Badge text={`Travel ${item.travelStock}`} tone="info" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );

  const newRequestView = (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel title="New item requests" subtitle="Request a brand new item · Owner approves · Added to inventory on delivery" right={<button onClick={addNewRequest} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 900 }}>+ Submit new request</button>}>
        <div style={{ padding: 18, display: "grid", gap: 18 }}>
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
            <input value={newRequest.item} onChange={(e) => setNewRequest((p) => ({ ...p, item: e.target.value }))} placeholder="Item name" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input value={newRequest.brand} onChange={(e) => setNewRequest((p) => ({ ...p, brand: e.target.value }))} placeholder="Brand" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <select value={newRequest.category} onChange={(e) => setNewRequest((p) => ({ ...p, category: e.target.value }))} style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }}>
              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={newRequest.use} onChange={(e) => setNewRequest((p) => ({ ...p, use: e.target.value }))} style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }}>
              <option>Home</option><option>Travel</option><option>Both</option>
            </select>
            <input type="number" min="1" value={newRequest.qty} onChange={(e) => setNewRequest((p) => ({ ...p, qty: e.target.value }))} placeholder="Qty" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input value={newRequest.note} onChange={(e) => setNewRequest((p) => ({ ...p, note: e.target.value }))} placeholder="Note" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #dfe5ee" }}>
            <div style={{ background: "#22345c", color: "#fff", padding: "12px 16px", fontWeight: 900 }}>Pending requests</div>
            <div style={{ padding: 18 }}>
              {orders.filter((o) => o.kind === "new" && o.status !== "done" && o.status !== "declined").length ? orders.filter((o) => o.kind === "new" && o.status !== "done" && o.status !== "declined").map((o) => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", border: "1px solid #e5ebf2", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{o.item}</div>
                    <div style={{ color: "#6b7280", fontSize: 14 }}>{o.brand} · {o.category} · Qty {o.qty}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => approveNewRequest(o.id)} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 10, padding: "8px 12px", fontWeight: 900 }}>Approve</button>
                    <button onClick={() => setOrderStatus(o.id, "declined")} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 12px", fontWeight: 900 }}>Decline</button>
                  </div>
                </div>
              )) : <div style={{ textAlign: "center", color: "#6b7280", padding: 34 }}>No requests yet.<br />Click "+ Submit new request" to request a brand new item.</div>}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );

  return (
   <div
  style={{
    minHeight: "100vh",
    background: "#f6f8fc",
    color: "#0f172a",
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    lineHeight: 1.35,
  }}
>
      <header style={{ background: "linear-gradient(180deg, #213258 0%, #1d2d52 100%)", color: "#fff", padding: "18px 32px 20px", boxShadow: "inset 0 -1px 0 rgba(255,255,255,.08)" }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>Home & Travel <span style={{ color: "#d0a63d" }}>Inventory</span></div>
      </header>

      <nav style={{ background: "#33476f", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 34, alignItems: "center", overflowX: "auto" }}>
          {NAVS.map((tab) => {
            const active = activeTab === tab.name;
            return (
              <button key={tab.name} onClick={() => setActiveTab(tab.name)} style={{ border: "none", background: "transparent", color: active ? "#fff" : "rgba(255,255,255,.45)", fontSize: 16, fontWeight: 900, padding: "16px 4px 18px", borderBottom: active ? "3px solid #d0a63d" : "3px solid transparent", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <section style={{ background: "#22345c", color: "#fff", padding: "18px 20px 16px", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
        <TopStat label="Items" value={stats.items} />
        <TopStat label="Low stock" value={stats.low} />
        <TopStat label="Requested" value={stats.requested} />
        <TopStat label="On order" value={stats.onOrder} />
      </section>

      <main style={{ padding: 20 }}>
        {activeTab === "Inventory" ? inventoryView : null}
        {activeTab === "Orders" ? ordersView : null}
        {activeTab === "Packing" ? packingView : null}
        {activeTab === "Gallery" ? galleryView : null}
        {activeTab === "New request" ? newRequestView : null}
      </main>

      {showModal ? (
        <Modal title={editingId ? "Edit item" : "Add item"} onClose={() => setShowModal(false)}>
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <input value={draft.item} onChange={(e) => setDraft((p) => ({ ...p, item: e.target.value }))} placeholder="Item name" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input value={draft.brand} onChange={(e) => setDraft((p) => ({ ...p, brand: e.target.value }))} placeholder="Brand" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <select value={draft.category} onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value }))} style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }}>
              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={draft.use} onChange={(e) => setDraft((p) => ({ ...p, use: e.target.value }))} style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }}>
              <option>Home</option><option>Travel</option><option>Both</option>
            </select>
            <input type="number" min="0" value={draft.homeStock} onChange={(e) => setDraft((p) => ({ ...p, homeStock: e.target.value }))} placeholder="Home stock" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input type="number" min="0" value={draft.travelStock} onChange={(e) => setDraft((p) => ({ ...p, travelStock: e.target.value }))} placeholder="Travel stock" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input type="number" min="0" value={draft.reorderAt} onChange={(e) => setDraft((p) => ({ ...p, reorderAt: e.target.value }))} placeholder="Reorder at" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input value={draft.notes} onChange={(e) => setDraft((p) => ({ ...p, notes: e.target.value }))} placeholder="Notes" style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12 }} />
            <input type="file" accept="image/*" onChange={(e) => onUploadPhoto(e.target.files?.[0], (photo) => setDraft((p) => ({ ...p, photo })))} style={{ border: "1px solid #dfe5ee", borderRadius: 12, padding: 12, gridColumn: "1 / -1" }} />
            {draft.photo ? <img src={draft.photo} alt="preview" style={{ gridColumn: "1 / -1", width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 14, border: "1px solid #dfe5ee" }} /> : null}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
            <button onClick={() => setShowModal(false)} style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>Cancel</button>
            <button onClick={saveDraftItem} style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 14px", fontWeight: 900 }}>{editingId ? "Save changes" : "Add item"}</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
