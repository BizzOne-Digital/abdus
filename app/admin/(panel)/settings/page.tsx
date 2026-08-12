"use client";

import { useEffect, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

type Settings = {
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  logo: string;
  siteName: string;
  tagline: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => setSettings(null));
  }, []);

  async function save() {
    if (!settings) return;
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Save failed");
      return;
    }
    setSettings(data);
    setMessage("Saved. Refresh the site (Ctrl+F5) — footer and contact pages update too.");
  }

  if (!settings) return <p>Loading…</p>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Settings</h1>
          <p>Contact info and site identity.</p>
        </div>
        <button className="btn-admin primary" type="button" onClick={save}>
          Save settings
        </button>
      </div>
      {message ? <p>{message}</p> : null}
      <div className="admin-card form-grid">
        <label>
          Site name
          <input
            value={settings.siteName || ""}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
          />
        </label>
        <label>
          Tagline
          <textarea
            value={settings.tagline || ""}
            onChange={(e) =>
              setSettings({ ...settings, tagline: e.target.value })
            }
          />
        </label>
        <ImageUploader
          label="Logo"
          folder="misc"
          value={settings.logo || ""}
          onChange={(url) => setSettings({ ...settings, logo: url })}
        />
        <label>
          Email
          <input
            value={settings.email || ""}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />
        </label>
        <label>
          Phone
          <input
            value={settings.phone || ""}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
          />
        </label>
        <label>
          Address
          <input
            value={settings.address || ""}
            onChange={(e) =>
              setSettings({ ...settings, address: e.target.value })
            }
          />
        </label>
        <label>
          Facebook
          <input
            value={settings.facebook || ""}
            onChange={(e) =>
              setSettings({ ...settings, facebook: e.target.value })
            }
          />
        </label>
        <label>
          Instagram
          <input
            value={settings.instagram || ""}
            onChange={(e) =>
              setSettings({ ...settings, instagram: e.target.value })
            }
          />
        </label>
        <label>
          Twitter / X
          <input
            value={settings.twitter || ""}
            onChange={(e) =>
              setSettings({ ...settings, twitter: e.target.value })
            }
          />
        </label>
        <label>
          YouTube
          <input
            value={settings.youtube || ""}
            onChange={(e) =>
              setSettings({ ...settings, youtube: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
}
