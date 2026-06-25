import { useState } from "react";

const navItems = ["Dashboard", "Inventory", "Gallery", "Packing", "Orders", "Settings"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Ben's Inventory</h2>
        <ul>
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                background: activeTab === item ? "#32456E" : "transparent",
                fontWeight: activeTab === item ? "700" : "400",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
        <div className="header">
          <h1>{activeTab}</h1>
          <button className="primary-btn" onClick={() => setShowAddModal(true)}>
            + Add Item
          </button>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Home Stock</h3>
            <h2>126</h2>
          </div>
          <div className="card">
            <h3>Travel Stock</h3>
            <h2>38</h2>
          </div>
          <div className="card">
            <h3>Low Stock</h3>
            <h2>4</h2>
          </div>
          <div className="card">
            <h3>Orders Pending</h3>
            <h2>3</h2>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Brand</th>
              <th>Home</th>
              <th>Travel</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Skincare</td>
              <td>Neutrogena SPF 70</td>
              <td>Neutrogena</td>
              <td>1</td>
              <td>1</td>
              <td>Stocked</td>
            </tr>
            <tr>
              <td>Medications</td>
              <td>Advil</td>
              <td>Advil</td>
              <td>1</td>
              <td>1</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>Supplements</td>
              <td>Align Probiotic</td>
              <td>Align</td>
              <td>1</td>
              <td>0</td>
              <td>Stocked</td>
            </tr>
          </tbody>
        </table>
      </main>

      {showAddModal ? (
        <div
          onClick={() => setShowAddModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "18px",
              minWidth: "320px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Add Item</h2>
            <p style={{ marginBottom: "16px" }}>
              This button is now clickable.
            </p>
            <button className="primary-btn" onClick={() => setShowAddModal(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
