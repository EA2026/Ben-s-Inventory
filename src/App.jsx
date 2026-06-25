import { useMemo, useState } from "react";

const tabs = [
  { name: "Inventory", icon: "📦" },
  { name: "Orders", icon: "🛒" },
  { name: "Packing", icon: "🧳" },
  { name: "Gallery", icon: "📷" },
];

const items = [
  {
    category: "Skincare",
    item: "Neutrogena SPF 70",
    brand: "Neutrogena",
    use: "Both",
    stock: 1,
    reorderAt: 1,
    status: "Stocked",
  },
  {
    category: "Medications",
    item: "Advil",
    brand: "Advil",
    use: "Both",
    stock: 1,
    reorderAt: 1,
    status: "Low",
  },
  {
    category: "Supplements",
    item: "Align Probiotic",
    brand: "Align",
    use: "Home",
    stock: 1,
    reorderAt: 1,
    status: "Stocked",
  },
];

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="text-sm font-semibold text-slate-500">{title}</div>
      <div className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

function InventoryView() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Items" value="0" />
        <StatCard title="Low Stock" value="0" />
        <StatCard title="Requested" value="0" />
        <StatCard title="On Order" value="0" />
      </div>

      <div className="mt-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-500 shadow-sm">
            <span className="text-xl">🔍</span>
            <input
              placeholder="Search..."
              className="w-full border-none bg-transparent text-lg outline-none placeholder:text-slate-400"
            />
          </label>
          <button className="rounded-2xl bg-emerald-700 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-emerald-800">
            + Add item
          </button>
        </div>

        <div className="mt-6 flex items-center gap-10 border-b border-slate-200 pb-4 text-sm font-semibold text-slate-500">
          <button className="border-b-4 border-slate-800 pb-5 text-slate-800">All</button>
          <button>🔴</button>
          <button>⚠️</button>
          <button>⚡</button>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#1f2b4a] text-white">
              <tr>
                <th className="px-6 py-5 text-base font-bold">CATEGORY</th>
                <th className="px-6 py-5 text-base font-bold">ITEM</th>
                <th className="px-6 py-5 text-base font-bold">BRAND</th>
                <th className="px-6 py-5 text-base font-bold">USE</th>
                <th className="px-6 py-5 text-base font-bold">STOCK</th>
                <th className="px-6 py-5 text-base font-bold">REORDER AT</th>
                <th className="px-6 py-5 text-base font-bold">STATUS</th>
                <th className="px-6 py-5 text-base font-bold">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items.map((item) => (
                <tr key={item.item} className="border-t border-slate-100">
                  <td className="px-6 py-5 text-slate-700">{item.category}</td>
                  <td className="px-6 py-5 text-slate-700">{item.item}</td>
                  <td className="px-6 py-5 text-slate-700">{item.brand}</td>
                  <td className="px-6 py-5 text-slate-700">{item.use}</td>
                  <td className="px-6 py-5 text-slate-700">{item.stock}</td>
                  <td className="px-6 py-5 text-slate-700">{item.reorderAt}</td>
                  <td className="px-6 py-5 text-slate-700">{item.status}</td>
                  <td className="px-6 py-5 text-slate-700">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OrdersView() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <SectionHeader
        title="Orders"
        subtitle="Pending requests, items on order, and completed restocks."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Requested", 0],
          ["On Order", 0],
          ["Completed", 0],
        ].map(([label, count]) => (
          <div key={label} className="rounded-3xl bg-slate-50 p-6">
            <div className="text-sm font-semibold text-slate-500">{label}</div>
            <div className="mt-3 text-4xl font-bold text-slate-900">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackingView() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <SectionHeader
        title="Packing"
        subtitle="Track what moves from home stock to travel stock."
      />
      <div className="mt-8 rounded-3xl bg-slate-50 p-8 text-slate-600">
        Packing layout goes here.
      </div>
    </div>
  );
}

function GalleryView() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <SectionHeader
        title="Gallery"
        subtitle="Photos for all inventory items."
      />
      <div className="mt-8 rounded-3xl bg-slate-50 p-8 text-slate-600">
        Gallery layout goes here.
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Inventory");

  const ActiveView = useMemo(() => {
    switch (activeTab) {
      case "Orders":
        return OrdersView;
      case "Packing":
        return PackingView;
      case "Gallery":
        return GalleryView;
      default:
        return InventoryView;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-[#1f2b4a] px-6 py-6 text-white md:px-10">
        <div className="text-2xl font-bold tracking-tight">
          Home & Travel <span className="text-amber-400">Inventory</span>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-[#2f4066] px-4 md:px-10">
        <div className="flex gap-2 overflow-x-auto py-4 md:gap-8">
          {tabs.map((tab) => {
            const isActive = tab.name === activeTab;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-4 px-4 py-3 text-xl font-semibold transition ${
                  isActive
                    ? "border-amber-400 text-white"
                    : "border-transparent text-white/55 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="px-4 py-6 md:px-10 md:py-8">
        <ActiveView />
      </main>
    </div>
  );
}
