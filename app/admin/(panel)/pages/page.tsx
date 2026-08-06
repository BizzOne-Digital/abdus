"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PageRow = {
  _id: string;
  slug: string;
  title: string;
  sections?: unknown[];
  updatedAt?: string;
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageRow[]>([]);

  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then(setPages)
      .catch(() => setPages([]));
  }, []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Pages</h1>
          <p>Edit every public page — content matches the live website.</p>
        </div>
      </div>
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Sections</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page._id}>
                <td>{page.title}</td>
                <td>/{page.slug === "home" ? "" : page.slug}</td>
                <td>{page.sections?.length ?? 0}</td>
                <td>
                  <Link className="btn-admin" href={`/admin/pages/${page.slug}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
