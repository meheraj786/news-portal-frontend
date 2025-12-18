import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Image,
  ExternalLink,
  Maximize2,
  Square,
} from "lucide-react";

interface Ad {
  id: number;
  title: string;
  type: "horizontal" | "square";
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
  createdAt: string;
}

export default function Ads() {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      title: "Summer Sale Banner",
      type: "horizontal",
      imageUrl: "https://via.placeholder.com/728x90",
      linkUrl: "https://example.com/summer-sale",
      isActive: true,
      createdAt: "2024-12-15",
    },
    {
      id: 2,
      title: "Product Showcase",
      type: "square",
      imageUrl: "https://via.placeholder.com/300x300",
      linkUrl: "https://example.com/products",
      isActive: true,
      createdAt: "2024-12-14",
    },
    {
      id: 3,
      title: "Holiday Special",
      type: "horizontal",
      imageUrl: "https://via.placeholder.com/728x90",
      linkUrl: "https://example.com/holiday",
      isActive: false,
      createdAt: "2024-12-10",
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "horizontal" as "horizontal" | "square",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleAddNew = () => {
    setEditingAd(null);
    setFormData({
      title: "",
      type: "horizontal",
      imageUrl: "",
      linkUrl: "",
      isActive: true,
    });
    setSelectedFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      type: ad.type,
      imageUrl: ad.imageUrl,
      linkUrl: ad.linkUrl,
      isActive: ad.isActive,
    });
    setSelectedFile(null);
    setImagePreview(ad.imageUrl);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds(ads.filter((ad) => ad.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.linkUrl) {
      alert("Please fill all required fields");
      return;
    }

    if (!selectedFile && !editingAd) {
      alert("Please select an image");
      return;
    }

    // Create FormData for backend
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("type", formData.type);
    submitData.append("linkUrl", formData.linkUrl);
    submitData.append("isActive", formData.isActive.toString());

    if (selectedFile) {
      submitData.append("image", selectedFile);
    }

    if (editingAd) {
      submitData.append("id", editingAd.id.toString());
    }

    // Backend API call example
    try {
      // Uncomment this when you have backend ready
      /*
      const response = await fetch('YOUR_API_ENDPOINT/ads', {
        method: editingAd ? 'PUT' : 'POST',
        body: submitData,
        // Don't set Content-Type header, browser will set it automatically with boundary
      });
      
      if (!response.ok) {
        throw new Error('Failed to save ad');
      }
      
      const result = await response.json();
      */

      // For demo: Update local state
      if (editingAd) {
        setAds(
          ads.map((ad) =>
            ad.id === editingAd.id
              ? { ...ad, ...formData, imageUrl: imagePreview || ad.imageUrl }
              : ad
          )
        );
      } else {
        const newAd: Ad = {
          id: Date.now(),
          ...formData,
          imageUrl: imagePreview,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setAds([...ads, newAd]);
      }

      alert("Ad saved successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving ad:", error);
      alert("Failed to save ad. Please try again.");
    }
  };

  const toggleActive = (id: number) => {
    setAds(
      ads.map((ad) => (ad.id === id ? { ...ad, isActive: !ad.isActive } : ad))
    );
  };

  const horizontalAds = ads.filter((ad) => ad.type === "horizontal");
  const squareAds = ads.filter((ad) => ad.type === "square");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-900 mb-2">
              Ads Manager
            </h1>
            <p className="text-red-700">
              Manage your horizontal and square advertisements
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Ad
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Ads</p>
                <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Maximize2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Horizontal Ads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {horizontalAds.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Square className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Square Ads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {squareAds.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Ads Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Maximize2 className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">
              Horizontal Ads (728x90)
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {horizontalAds.length > 0 ? (
              horizontalAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-xl shadow-sm border border-red-100 p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-full lg:w-64 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {ad.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Created: {ad.createdAt}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleActive(ad.id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                              ad.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {ad.isActive ? "Active" : "Inactive"}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <ExternalLink className="w-4 h-4" />
                        <a
                          href={ad.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:underline"
                        >
                          {ad.linkUrl}
                        </a>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(ad)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ad.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-12 text-center">
                <Maximize2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No horizontal ads yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Square Ads Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Square className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">
              Square Ads (300x300)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {squareAds.length > 0 ? (
              squareAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-xl shadow-sm border border-red-100 p-6"
                >
                  <div className="mb-4">
                    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 mb-3">
                      <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {ad.title}
                      </h3>
                      <button
                        onClick={() => toggleActive(ad.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ad.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {ad.isActive ? "Active" : "Inactive"}
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                      Created: {ad.createdAt}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
                      <ExternalLink className="w-3 h-3" />
                      <a
                        href={ad.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline truncate"
                      >
                        {ad.linkUrl}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-red-100 p-12 text-center">
                <Square className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No square ads yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingAd ? "Edit Ad" : "Add New Ad"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter ad title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "horizontal" | "square",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="horizontal">Horizontal (728x90)</option>
                    <option value="square">Square (300x300)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Image *
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Preview:</p>
                        <div
                          className={`${
                            formData.type === "horizontal" ? "h-24" : "h-48"
                          } bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200`}
                        >
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      {formData.type === "horizontal"
                        ? "Recommended: 728x90 pixels"
                        : "Recommended: 300x300 pixels"}
                      {" • Max size: 5MB"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Set as active
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {editingAd ? "Update" : "Add"} Ad
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
