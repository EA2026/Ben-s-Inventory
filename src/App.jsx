function App() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Ben's Inventory</h2>
        <ul>
          <li>Dashboard</li>
          <li>Inventory</li>
          <li>Gallery</li>
          <li>Packing</li>
          <li>Orders</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="main">
        <div className="header">
          <h1>Dashboard</h1>
          <button className="primary-btn">+ Add Item</button>
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
    </div>
  );
}

export default App;
