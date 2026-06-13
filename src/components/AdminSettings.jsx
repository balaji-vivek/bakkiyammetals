import React, { useEffect, useState } from "react";

const SETTINGS_KEY = "store_settings";

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch (e) { return {}; }
}

function saveSettings(s) { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

const AdminSettings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => setSettings(getSettings()), []);

  function handleChange(e) {
    const { name, value } = e.target;
    setSettings((s) => ({ ...s, [name]: value }));
  }

  function handleSave() {
    saveSettings(settings);
    alert('Settings saved');
  }

  return (
    <section className="admin-settings">
      <h3>Settings</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
        <div className="form-card">
          <h4>Store Information</h4>
          <label>Store Name</label>
          <input name="storeName" value={settings.storeName || "Bakkiyam Metal Mart"} onChange={handleChange} />

          <label>Address</label>
          <textarea name="address" value={settings.address || "8/3712, PN Road, Koothampalayam Pirivu, Tiruppur - 641602"} onChange={handleChange} />
        </div>

        <div className="form-card">
          <h4>Contact Information</h4>
          <label>Phone</label>
          <input name="phone" value={settings.phone || "+91 7010553387"} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={settings.email || "bakkiyammetals@gmail.com"} onChange={handleChange} />
        </div>

        <div className="form-card">
          <h4>Social Media</h4>
          <label>Facebook</label>
          <input name="facebook" value={settings.facebook || "https://www.facebook.com/share/18kpJJu1Rb/?mibextid=wwXIfr"} onChange={handleChange} />

          <label>Instagram</label>
          <input name="instagram" value={settings.instagram || "https://www.instagram.com/bakkiyammetals"} onChange={handleChange} />

          <label>WhatsApp</label>
          <input name="whatsapp" value={settings.whatsapp || "https://wa.me/message/QU3D6U7D35VSH1"} onChange={handleChange} />
        </div>

        <div className="form-card">
          <h4>Branding</h4>
          <label>Logo URL / Path</label>
          <input name="logo" value={settings.logo || "/IMG_4796.jpeg"} onChange={handleChange} />

          <div style={{marginTop:12}}>
            <button className="btn primary" onClick={handleSave}>Save Settings</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
