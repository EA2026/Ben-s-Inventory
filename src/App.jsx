import { useMemo, useState } from "react";

const tabs = [
  { name: "Inventory", icon: "📦" },
  { name: "Orders", icon: "🛒" },
  { name: "Packing", icon: "🧳" },
  { name: "Gallery", icon: "📷" },
  { name: "New request", icon: "🆕" },
];

const categoryPills = [
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

const rows = [
  {
    category: "Toiletries",
    item: "Razor blades",
    brand: "Gillette\n2-pack",
    use: "🏠✈️ Both",
    homeStock: 4,
    reorderAt: "2 packs left",
    status: "Stocked",
  },
  {
    category: "Toiletries",
    item: "Toothpaste — full size",
    brand: "Sensodyne\nFull tube",
    use: "🏠 Home",
    homeStock: 1,
    reorderAt: "When half empty",
    status: "Low — 1 left",
  },
  {
    category: "Toiletries",
    item: "Toothpaste — travel size",
    brand: "Sensodyne\nTravel tube",
    use: "✈️ Travel",
    homeStock: 2,
    reorderAt: "1 left",
    status: "Stocked",
  },
  {
    category: "Toiletries",
    item: "Dental floss",
    brand: "Oral-B Glide\nStandard",
    use: "🏠✈️ Both",
    homeStock: 1,
    reorderAt: "When low",
    status: "Low — 1 left",
  },
  {
    category: "Skincare",
    item: "Daily moisturizing lotion",
    brand: "CeraVe\n16 fl oz",
    use: "🏠 Home",
    homeStock: 1,
    reorderAt: "When quarter left",
    status: "Low — 1 left",
  },
  {
    category: "Sunscreen",
    item: "Face moisturizer SPF 20",
    brand: "Jack Black\n6.5 fl oz",
    use: "🏠✈️ Both",
    homeStock: 1,
    reorderAt: "When quarter left",
    status: "Low — 1 left",
  },
  {
    category: "Medications",
    item: "Advil ibuprofen 200mg",
    brand: "Advil\nTablets",
    use: "🏠✈️ Both",
    homeStock: 1,
    reorderAt: "When low",
    status: "Low",
  },
  {
    category: "Supplements",
    item: "Align probiotic",
    brand: "Align\n63 capsules",
    use: "🏠 Home",
    homeStock: 1,
    reorderAt: "When low",
    status: "Stocked",
  },
];

const navButtons = [
  "Inventory",
  "Orders",
  "Packing",
  "Gallery",
  "New request",
];

const inventoryStats = [
  { label: "Items", value: 31 },
  { label: "Low stock", value: 14 },
  { label: "Requested", value: 0 },
  { label: "On order", value: 0 },
];

const topBar = {
  background: "linear-gradient(180deg, #213258 0%, #1d2d52 100%)",
  color: "#fff",
};

const navy = "#22345c";
const gold = "#d0a63d";

function Pill({ active, children, small }) {
  return (
    <button
      style={{
        border: "1px solid #d8dfe8",
        background: active ? navy : "#fff",
        color: active ? "#fff" : "#718096",
        borderRadius: 999,
        padding: small ? "6px 12px" : "10px 16px",
        fontSize: small ? 13 : 15,
        fontWeight: 600,
        lineHeight: 1,
        boxShadow: active ? "0 2px 4px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ minWidth: 80 }}>
      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, color: "#fff" }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, letterSpacing: 1.1, textTransform: "uppercase", color: "rgba(255,255,255,0.52)" }}>{label}</div>
    </div>
  );
}

function SectionCard({ title, subtitle, children, right }) {
  return (
    <section
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(31, 43, 74, 0.08)",
        border: "1px solid #e6ebf2",
      }}
    >
      <div
        style={{
          background: navy,
          color: "#fff",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{title}</div>
          {subtitle ? <div style={{ marginTop: 4, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{subtitle}</div> : null}
        </div>
        {right}
      </div>
      <div>{children}</div>
    </section>
  );
}

function InventoryView() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: "1 1 420px",
            background: "#fff",
            border: "1px solid #dde3ec",
            borderRadius: 16,
            padding: "14px 16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <span style={{ fontSize: 20, opacity: 0.65 }}>🔎</span>
          <input
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: 16,
              color: "#334155",
              background: "transparent",
            }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {categoryPills.map((pill, idx) => (
            <Pill key={pill} active={idx === 0} small>
              {pill}
            </Pill>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <Pill active small>
            Table
          </Pill>
          <Pill small>Cards</Pill>
          <button
            style={{
              background: "#1f7a3f",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "11px 16px",
              fontWeight: 800,
              fontSize: 14,
              boxShadow: "0 4px 10px rgba(31,122,63,0.18)",
            }}
          >
            + Add item
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "center", borderBottom: "1px solid #e5e9f0", paddingBottom: 10, color: "#64748b", fontWeight: 700 }}>
        <span style={{ color: navy, borderBottom: `4px solid ${navy}`, paddingBottom: 10 }}>All</span>
        <span>🔴 Low stock</span>
        <span>⚠️ Monitor</span>
        <span>⚡ Active orders</span>
        <span>🏠 Home only</span>
        <span>✈️ Travel only</span>
      </div>

      <div
        style={{
          overflow: "hidden",
          borderRadius: 18,
          border: "1px solid #dfe5ee",
          background: "#fff",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: navy, color: "#fff" }}>
              {["Category", "Item", "Brand", "Use", "Home stock", "Reorder at", "Status", "Action"].map((head) => (
                <th key={head} style={{ textAlign: "left", padding: "14px 16px", fontSize: 14, letterSpacing: 0.4 }}>
                  {head.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} style={{ borderTop: "1px solid #eef2f7", background: row.status.startsWith("Low") ? "#fff7f7" : "#fff" }}>
                <td style={{ padding: "16px", width: 120 }}>
                  <span style={{ background: "#eaf1fb", color: "#5370a1", borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 700 }}>{row.category}</span>
                </td>
                <td style={{ padding: "16px", fontWeight: 700, color: "#232b3a" }}>{row.item}</td>
                <td style={{ padding: "16px", color: "#6b7280", whiteSpace: "pre-line" }}>{row.brand}</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ background: row.use.includes("Home") ? "#eef3f8" : row.use.includes("Travel") ? "#f2f0ff" : "#eef8f2", color: row.use.includes("Travel") ? "#6d56cf" : row.use.includes("Home") ? "#7b8797" : "#2f8a4c", borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 700 }}>{row.use}</span>
                </td>
                <td style={{ padding: "16px", minWidth: 120 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #dbe1ea", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                    <span style={{ padding: "6px 10px", borderRight: "1px solid #dbe1ea" }}>−</span>
                    <span style={{ padding: "6px 16px", background: "#fff6d6", color: "#335536", fontWeight: 800 }}>{row.homeStock}</span>
                    <span style={{ padding: "6px 10px", borderLeft: "1px solid #dbe1ea" }}>+</span>
                  </div>
                </td>
                <td style={{ padding: "16px", color: "#6b7280" }}>{row.reorderAt}</td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      background: row.status.startsWith("Low") ? "#fff4cf" : "#e5f4e8",
                      color: row.status.startsWith("Low") ? "#a97a17" : "#2d8d4d",
                      borderRadius: 999,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button style={{ background: "#5f60c7", color: "#fff", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 800, fontSize: 13 }}>🛒 Request restock</button>
                    <button style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid #df6b6b", background: "#fff", color: "#cc4b4b" }}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersView() {
  return (
    <SectionCard title="Order management" subtitle="Approve · Track · Restock" right={<div style={{ display: "flex", gap: 26, color: "rgba(255,255,255,0.9)", fontWeight: 800 }}><div><div style={{ fontSize: 30, lineHeight: 1 }}>0</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>REQUESTED</div></div><div><div style={{ fontSize: 30, lineHeight: 1 }}>0</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>ON ORDER</div></div><div><div style={{ fontSize: 30, lineHeight: 1 }}>0</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>DONE</div></div></div>}>
      <div style={{ padding: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            ["Requested", 0],
            ["On order", 0],
            ["Done", 0],
          ].map(([label, count]) => (
            <div key={label} style={{ border: "1px solid #dfe5ee", borderRadius: 16, background: "#fff", minHeight: 120, overflow: "hidden" }}>
              <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 800, color: "#1f2b4a" }}>{label}</div>
                <span style={{ background: count ? "#e5f4e8" : "#fff3cd", color: count ? "#2d8d4d" : "#ad8e19", borderRadius: 999, padding: "2px 8px", fontSize: 12, fontWeight: 800 }}>{count}</span>
              </div>
              <div style={{ borderTop: "1px solid #eef2f7", padding: 24, textAlign: "center", color: "#6b7280" }}>None</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: navy, color: "#fff", padding: "14px 16px", fontWeight: 800 }}>Select an order above to manage it</div>
          <div style={{ padding: 56, textAlign: "center", color: "#6b7280" }}>Click any item in the pipeline to review, approve, log details, or confirm restocking.</div>
        </div>
      </div>
    </SectionCard>
  );
}

function PackingView() {
  return (
    <SectionCard title="Packing list" subtitle="Pack from home · Auto-deducts · Unpack when back" right={<div style={{ display: "flex", gap: 10 }}><button style={{ background: "#d0a63d", color: navy, border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 900 }}>↩ Unpack all</button><button style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "10px 16px", fontWeight: 800 }}>🗑 Clear</button></div>}>
      <div style={{ padding: 18, display: "grid", gap: 14 }}>
        <div style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: navy, color: "#fff", padding: "12px 16px", fontWeight: 800 }}>Trip name</div>
          <div style={{ padding: 14, color: "#6b7280" }}>e.g. NYC business trip, June 2026</div>
        </div>
        <div style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: navy, color: "#fff", padding: "12px 16px", fontWeight: 800 }}>Pack an item</div>
          <div style={{ padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 96px", gap: 10, alignItems: "end" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", marginBottom: 6 }}>ITEM</div>
                <div style={{ border: "1px solid #dfe5ee", borderRadius: 10, padding: 12, color: "#6b7280" }}>Choose item...</div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", marginBottom: 6 }}>QTY</div>
                <div style={{ display: "inline-flex", border: "1px solid #dfe5ee", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                  <span style={{ padding: "10px 12px", borderRight: "1px solid #dfe5ee" }}>−</span>
                  <span style={{ padding: "10px 18px", fontWeight: 800 }}>1</span>
                  <span style={{ padding: "10px 12px", borderLeft: "1px solid #dfe5ee" }}>+</span>
                </div>
              </div>
              <button style={{ background: navy, color: "#fff", border: "none", borderRadius: 12, padding: "12px 14px", fontWeight: 800 }}>+ Pack</button>
            </div>
            <div style={{ marginTop: 12, padding: 12, border: "1px solid #edf1f5", borderRadius: 12, background: "#fafbfd", color: "#374151" }}>Select an item to see available home stock.</div>
          </div>
        </div>
        <div style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: navy, color: "#fff", padding: "12px 16px", fontWeight: 800 }}>What's packed</div>
          <div style={{ padding: 34, textAlign: "center", color: "#6b7280" }}>No items packed yet.<br />Use the form above to pack from home stock.</div>
        </div>
      </div>
    </SectionCard>
  );
}

function GalleryView() {
  const photos = [
    ["CeraVe Daily Moisturizing Lotion", "CeraVe · 16 fl oz"],
    ["Neutrogena Sunscreen SPF 70", "Neutrogena · 5 fl oz"],
    ["Advil Ibuprofen 200mg", "Advil · Tablets"],
    ["Jack Black Skincare Set", "Jack Black · SPF 20, Serum, Face Cream, Scrub"],
    ["Precision1 Contact Lenses", "Alcon · Daily lenses"],
    ["Supplements & Medications Shelf", "Nature Made B12 & D3 · Zyrtec · Align · Advil 360ct"],
    ["Travel Toiletries", "Degree Deodorant · Band-aids · Metamucil packets"],
    ["Travel Sink Items", "ReNu solution · Advil travel · Neutrogena SPF 45"],
    ["Grooming Kit", "Gillette razor · Shaving cream · Floss · Sensodyne · Listerine"],
    ["Nature Made Vitamin B12", "Nature Made · 1000 mcg · 90 softgels"],
    ["Nature Made Vitamin D3", "Nature Made · 1000 IU · 100 tablets"],
    ["Align Probiotic", "Align · 63 capsules"],
  ];

  return (
    <SectionCard title="Product gallery" subtitle="Photos of all inventory products — tap any photo to enlarge" right={<button style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 800 }}>📷 Add photo & item</button>}>
      <div style={{ padding: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
          {photos.map(([title, subtitle], idx) => (
            <div key={title} style={{ border: "1px solid #dfe5ee", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 8px 18px rgba(31,43,74,0.05)" }}>
              <div style={{ height: 180, background: idx % 2 === 0 ? "linear-gradient(135deg, #f2f6fb, #dfe8f5)" : "linear-gradient(135deg, #f7f1e8, #ece2d7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontWeight: 700, fontSize: 15 }}>Photo preview</div>
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 800, color: "#111827" }}>{title}</div>
                <div style={{ marginTop: 6, color: "#6b7280", fontSize: 14 }}>{subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function NewRequestView() {
  return (
    <SectionCard title="New item requests" subtitle="Request a brand new item · Owner approves · Added to inventory on delivery" right={<button style={{ background: "#1f7a3f", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 800 }}>+ Submit new request</button>}>
      <div style={{ padding: 34, textAlign: "center", color: "#6b7280" }}>No requests yet.<br />Click "+ Submit new request" to request a brand new item.</div>
    </SectionCard>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Inventory");

  const content = useMemo(() => {
    switch (activeTab) {
      case "Orders":
        return <OrdersView />;
      case "Packing":
        return <PackingView />;
      case "Gallery":
        return <GalleryView />;
      case "New request":
        return <NewRequestView />;
      default:
        return <InventoryView />;
    }
  }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", color: "#0f172a" }}>
      <header style={{ ...topBar, padding: "24px 28px 20px", boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.2 }}>
          Home & Travel <span style={{ color: gold }}>Inventory</span>
        </div>
      </header>

      <nav style={{ background: "#33476f", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 34, alignItems: "center", overflowX: "auto" }}>
          {tabs.map((tab) => {
            const active = tab.name === activeTab;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.45)",
                  fontSize: 16,
                  fontWeight: 800,
                  padding: "16px 4px 18px",
                  borderBottom: active ? `3px solid ${gold}` : "3px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main style={{ padding: 20 }}>{content}</main>
    </div>
  );
}
