import React, { useState, type ReactNode } from "react";
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
  X,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  useFetchAllAds,
  useCreateAd,
  useUpdateAd,
  useDeleteAd,
  useToggleAdStatus,
  type Ad,
} from "@/api/hooks/ads";

type AdForm = {
  title: string;
  type: "horizontal" | "square" | string;
  link: string;
  isActive: boolean;
};

export default function Ads() {
  const { data: ads = [], isLoading } = useFetchAllAds();
  const { mutate: createAd, isPending: creating } = useCreateAd();
  const { mutate: updateAd, isPending: updating } = useUpdateAd();
  const { mutate: deleteAd } = useDeleteAd();
  const { mutate: toggleAdStatus } = useToggleAdStatus();

  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const [form, setForm] = useState<AdForm>({
    title: "",
    type: "horizontal",
    link: "",
    isActive: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const openCreate = () => {
    setEditingAd(null);
    setForm({ title: "", type: "horizontal", link: "", isActive: true });
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

  if (isLoading)
    return (
      <p className="p-10 text-center font-bold text-red-600 animate-pulse">
        Loading ads...
      </p>
    );

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-red-900 tracking-tight">
              Ads Manager
            </h1>
            <p className="text-red-700 text-xs md:text-sm">
              Manage banner and square advertisements
            </p>
          </div>
          <button
            onClick={openCreate}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} />
            <span className="font-bold">Add New Ad</span>
          </button>
        </div>

        {/* Stats Section - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Stat
            label="Total Ads"
            value={ads.length}
            icon={<ImageIcon size={20} />}
          />
          <Stat
            label="Horizontal"
            value={horizontalAds.length}
            icon={<Maximize2 size={20} />}
          />
          <Stat label="Square Ads" value={squareAds.length} icon={<Square />} />
        </div>

        {/* Ad Sections */}
        <AdSection
          title="Horizontal Ads (728x90)"
          ads={horizontalAds}
          onEdit={openEdit}
          onDelete={remove}
          onToggle={toggleAdStatus}
        />

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
          className="bg-white border border-gray-100 rounded-2xl p-3 md:p-4 flex gap-3 md:gap-4 items-center shadow-sm hover:shadow-md transition-all group"
        >
          {/* Ad Image Container */}
          <div className="shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
            <img
              src={ad.image?.url}
              alt=""
              className={`${
                grid ? "w-14 h-14 md:w-16 md:h-16" : "w-20 h-12 md:w-28 md:h-16"
              } object-cover`}
            />
          </div>

          {/* Ad Content */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-sm md:text-base truncate group-hover:text-red-600 transition-colors">
              {ad.title}
            </p>
            <a
              href={ad.link}
              target="_blank"
              className="text-[10px] md:text-xs text-blue-500 flex items-center gap-1 hover:underline mt-0.5 font-medium"
            >
              <ExternalLink size={12} /> Visit
            </a>
          </div>

          {/* Action Buttons - Fixed size so they don't squash */}
          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <button
              onClick={() => onToggle(ad._id)}
              className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                ad.isActive
                  ? "text-green-600 bg-green-50"
                  : "text-gray-400 bg-gray-50 hover:bg-gray-100"
              }`}
              title="Toggle Status"
            >
              {ad.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <button
              onClick={() => onEdit(ad)}
              className="p-1.5 md:p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              title="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(ad._id)}
              className="p-1.5 md:p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- DESIGNED RESPONSIVE MODAL ---
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

      {/* Modal Footer */}
      <div className="bg-gray-50 px-6 py-5 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-100">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-3 font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
        >
          Dismiss
        </button>
        <button
          disabled={loading}
          onClick={onSubmit}
          className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {isEdit ? "Update Ad" : "Publish Now"}
        </button>
      </div>
    </div>
  </div>
);
