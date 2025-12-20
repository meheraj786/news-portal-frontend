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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4 md:p-8">
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
          <Stat
            label="Square"
            value={squareAds.length}
            icon={<Square size={20} />}
          />
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

// --- Responsive Stat Card ---
const Stat = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-50 flex items-center gap-4">
    <div className="bg-red-50 p-3 rounded-xl text-red-600 shrink-0">{icon}</div>
    <div>
      <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xl md:text-2xl font-black text-gray-800 leading-none mt-1">
        {value}
      </p>
    </div>
  </div>
);

// --- Responsive Ad Section ---
const AdSection = ({ title, ads, grid, onEdit, onDelete, onToggle }: any) => (
  <div className="mb-12">
    <h2 className="text-lg md:text-xl font-black text-gray-800 mb-5 flex items-center gap-3">
      <span className="w-1.5 h-6 bg-red-600 rounded-full block"></span>
      {title}
      <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
        {ads.length}
      </span>
    </h2>

    {/* Responsive Layout: Mobile rows, MD grids */}
    <div
      className={
        grid
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-4"
      }
    >
      {ads.map((ad: any) => (
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
  <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md flex items-center justify-center z-50 p-3 md:p-4 animate-in fade-in duration-300">
    <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl overflow-hidden transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
      {/* Modal Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <ImageIcon className="text-white" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
            {isEdit ? "Edit Ad Details" : "New Advertisement"}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="p-5 md:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
            Ad Title
          </label>
          <input
            className="w-full border-2 border-gray-100 px-4 py-3 rounded-2xl focus:border-red-500 focus:outline-none transition-all bg-gray-50 focus:bg-white font-medium"
            placeholder="Promotion Name..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Type Selection - Responsive Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
            Layout Style
          </label>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button
              onClick={() => setForm({ ...form, type: "horizontal" })}
              className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:p-4 rounded-2xl border-2 transition-all ${
                form.type === "horizontal"
                  ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                  : "border-gray-100 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Maximize2 size={18} />{" "}
              <span className="font-bold text-sm">Horizontal</span>
            </button>
            <button
              onClick={() => setForm({ ...form, type: "square" })}
              className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:p-4 rounded-2xl border-2 transition-all ${
                form.type === "square"
                  ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                  : "border-gray-100 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Square size={18} />{" "}
              <span className="font-bold text-sm">Square</span>
            </button>
          </div>
        </div>

        {/* Link */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
            Redirect Link
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <LinkIcon size={18} />
            </div>
            <input
              className="w-full border-2 border-gray-100 pl-12 pr-4 py-3 rounded-2xl focus:border-red-500 focus:outline-none transition-all bg-gray-50 focus:bg-white font-medium"
              placeholder="https://..."
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
            Creative Asset
          </label>
          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-gray-300 rounded-[20px] cursor-pointer hover:border-red-400 hover:bg-red-50/50 transition-all">
              <div className="bg-red-100 p-3 rounded-full mb-2 text-red-600">
                <Upload size={20} />
              </div>
              <p className="text-xs font-bold text-gray-600">
                Click to upload banner
              </p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }}
              />
            </label>
          ) : (
            <div className="relative group rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
              <img
                src={preview}
                className={`w-full ${
                  form.type === "horizontal" ? "h-20" : "h-40"
                } object-contain mx-auto p-2`}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setPreview("");
                    setFile(null);
                  }}
                  className="bg-white text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-50"
                >
                  Remove & Change
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle - Active Status */}
        <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 pr-2 min-w-0">
            <div
              className={`shrink-0 p-2 rounded-lg ${
                form.isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {form.isActive ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800">Live Status</p>
              <p className="text-[10px] text-gray-500 truncate">
                {form.isActive ? "Visible to public" : "Draft / Hidden"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setForm({ ...form, isActive: !form.isActive })}
            className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              form.isActive ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                form.isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
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
