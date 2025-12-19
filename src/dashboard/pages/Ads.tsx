import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Maximize2,
  Square,
} from "lucide-react";

import {
  useFetchAllAds,
  useCreateAd,
  useUpdateAd,
  useDeleteAd,
  useToggleAdStatus,
  type Ad,
} from "@/api/hooks/ads";

export default function Ads() {
  const { data: ads = [], isLoading } = useFetchAllAds();
  const { mutate: createAd, isPending: creating } = useCreateAd();
  const { mutate: updateAd, isPending: updating } = useUpdateAd();
  const { mutate: deleteAd } = useDeleteAd();
  const { mutate: toggleAdStatus } = useToggleAdStatus();

  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const [form, setForm] = useState({
    title: "",
    type: "horizontal" as "horizontal" | "square",
    link: "",
    isActive: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const openCreate = () => {
    setEditingAd(null);
    setForm({
      title: "",
      type: "horizontal",
      link: "",
      isActive: true,
    });
    setFile(null);
    setPreview("");
    setShowModal(true);
  };

  const openEdit = (ad: Ad) => {
    setEditingAd(ad);
    setForm({
      title: ad.title,
      type: ad.type,
      link: ad.link || "",
      isActive: ad.isActive,
    });
    setPreview(ad.image?.url || "");
    setFile(null);
    setShowModal(true);
  };

  const submit = () => {
    if (!form.title || !form.link) {
      alert("Title and Link are required");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("type", form.type);
    fd.append("link", form.link);
    fd.append("isActive", String(form.isActive));
    if (file) fd.append("image", file);

    if (editingAd) {
      updateAd(
        { id: editingAd._id, data: fd },
        { onSuccess: () => setShowModal(false) }
      );
    } else {
      createAd(fd, { onSuccess: () => setShowModal(false) });
    }
  };

  const remove = (id: string) => {
    if (confirm("Delete this ad?")) deleteAd(id);
  };

  const horizontalAds = ads.filter((a) => a.type === "horizontal");
  const squareAds = ads.filter((a) => a.type === "square");

  if (isLoading) {
    return <p className="p-10 text-center">Loading ads...</p>;
  }

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-900">Ads Manager</h1>
            <p className="text-red-700 text-sm">
              Manage banner and square advertisements
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            <Plus size={18} />
            Add Ad
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Stat label="Total Ads" value={ads.length} icon={<ImageIcon />} />
          <Stat
            label="Horizontal Ads"
            value={horizontalAds.length}
            icon={<Maximize2 />}
          />
          <Stat label="Square Ads" value={squareAds.length} icon={<Square />} />
        </div>

        {/* Horizontal */}
        <AdSection
          title="Horizontal Ads (728x90)"
          ads={horizontalAds}
          onEdit={openEdit}
          onDelete={remove}
          onToggle={toggleAdStatus}
        />

        {/* Square */}
        <AdSection
          title="Square Ads (300x300)"
          ads={squareAds}
          grid
          onEdit={openEdit}
          onDelete={remove}
          onToggle={toggleAdStatus}
        />

        {/* Modal */}
        {showModal && (
          <AdModal
            form={form}
            setForm={setForm}
            preview={preview}
            setFile={setFile}
            setPreview={setPreview}
            onClose={() => setShowModal(false)}
            onSubmit={submit}
            loading={creating || updating}
            isEdit={!!editingAd}
          />
        )}
      </div>
    </div>
  );
}

const Stat = ({ label, value, icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow border">
    <div className="flex items-center gap-3">
      <div className="bg-red-100 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const AdSection = ({ title, ads, grid, onEdit, onDelete, onToggle }: any) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>

    <div className={grid ? "grid md:grid-cols-3 gap-4" : "space-y-4"}>
      {ads.map((ad: Ad) => (
        <div
          key={ad._id}
          className="bg-white border rounded-xl p-4 flex gap-4 items-center"
        >
          <img
            src={ad.image?.url}
            alt={ad.title}
            className="w-24 h-16 object-cover rounded"
          />

          <div className="flex-1">
            <p className="font-semibold">{ad.title}</p>
            <a
              href={ad.link}
              target="_blank"
              className="text-sm text-blue-600 flex items-center gap-1"
            >
              <ExternalLink size={14} /> Visit
            </a>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onToggle(ad._id)}>
              {ad.isActive ? <Eye /> : <EyeOff />}
            </button>
            <button onClick={() => onEdit(ad)}>
              <Edit />
            </button>
            <button onClick={() => onDelete(ad._id)}>
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdModal = ({
  form,
  setForm,
  preview,
  setFile,
  setPreview,
  onClose,
  onSubmit,
  loading,
  isEdit,
}: any) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Ad" : "Create Ad"}
      </h3>

      <div className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="w-full border px-3 py-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="horizontal">Horizontal</option>
          <option value="square">Square</option>
        </select>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Link URL"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />

        {preview && (
          <img src={preview} className="w-full h-40 object-cover rounded" />
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={onSubmit}
          className="px-6 py-2 bg-red-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
);
