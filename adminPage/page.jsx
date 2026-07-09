"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/adminSupabse/page";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchProducts();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) router.push("/adminLogin");
    else setLoading(false);
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
  }

  async function addProduct() {
    if (!name || !price) return alert("Name and price required");

    const { error } = await supabase.from("products").insert([
      {
        name,
        price: parseFloat(price),
        description,
        image,
      },
    ]);

    if (error) alert(error.message);
    else {
      setName("");
      setPrice("");
      setDescription("");
      setImage("");

      fetchProducts();
    }
  }

  async function deleteProduct(id) {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/adminLogin");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Admin Panel</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div style={{ border: "1px solid #ddd", padding: 20, marginBottom: 30 }}>
        <h3>Add Product</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={image}
            // accept="image/*"
            onChange={(e) => setImage(e.target.value)}
          />
          <button onClick={addProduct}>Add</button>
        </div>
      </div>

      <h3>Products</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: 8 }}>Name</th>
            <th style={{ textAlign: "left", padding: 8 }}>Price</th>
            <th style={{ textAlign: "left", padding: 8 }}>Description</th>
            <th style={{ textAlign: "left", padding: 8 }}>value</th>

            <th style={{ padding: 8 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>{p.name}</td>
              <td style={{ padding: 8 }}>${p.price}</td>
              <td style={{ padding: 8 }}>{p.description}</td>
              <td style={{ padding: 8 }}>{p.image}</td>
              <td style={{ padding: 8 }}>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
