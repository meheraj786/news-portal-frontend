import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  X,
} from "lucide-react";

interface SocialMedia {
  _id: string;
  platform: string;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
}

const platformIcons: { [key: string]: React.ReactNode } = {
  facebook: <Facebook className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  website: <Globe className="w-5 h-5" />,
};

const platformColors: { [key: string]: string } = {
  facebook: "bg-blue-600",
  twitter: "bg-sky-500",
  instagram: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
  linkedin: "bg-blue-700",
  youtube: "bg-red-600",
  website: "bg-gray-700",
};

export default function SocialMediaDashboard() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
    {
      _id: "1",
      platform: "facebook",
      name: "Facebook",
      url: "https://facebook.com/yourpage",
      icon: "facebook",
      isActive: true,
      createdAt: "2024-12-15",
    },
    {
      _id: "2",
      platform: "twitter",
      name: "Twitter",
      url: "https://twitter.com/yourhandle",
      icon: "twitter",
      isActive: true,
      createdAt: "2024-12-14",
    },
    {
      _id: "3",
      platform: "instagram",
      name: "Instagram",
      url: "https://instagram.com/yourprofile",
      icon: "instagram",
      isActive: false,
      createdAt: "2024-12-13",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialMedia | null>(null);
  const [formData, setFormData] = useState({
    platform: "facebook",
    name: "",
    url: "",
    isActive: true,
  });

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      platform: "facebook",
      name: "",
      url: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (item: SocialMedia) => {
    setEditingItem(item);
    setFormData({
      platform: item.platform,
      name: item.name,
      url: item.url,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.url) {
      alert("Please fill all fields");
      return;
    }

    // URL validation
    try {
      new URL(formData.url);
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    try {
      // TODO: Replace with your actual API call
      /*
      const endpoint = editingItem 
        ? `YOUR_API/social-media/${editingItem._id}` 
        : 'YOUR_API/social-media';
      
      const response = await fetch(endpoint, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save');
      */

      // Demo: Update local state
      if (editingItem) {
        setSocialMedia(
          socialMedia.map((item) =>
            item._id === editingItem._id
              ? {
                  ...item,
                  platform: formData.platform,
                  name: formData.name,
                  url: formData.url,
                  isActive: formData.isActive,
                  icon: formData.platform,
                }
              : item
          )
        );
      } else {
        const newItem: SocialMedia = {
          _id: Date.now().toString(),
          platform: formData.platform,
          name: formData.name,
          url: formData.url,
          icon: formData.platform,
          isActive: formData.isActive,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setSocialMedia([...socialMedia, newItem]);
      }

      setShowModal(false);
      alert("Social media link saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      // TODO: Replace with your actual API call
      /*
      const response = await fetch(`YOUR_API/social-media/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete');
      */

      setSocialMedia(socialMedia.filter((item) => item._id !== id));
      alert("Link deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const toggleActive = async (id: string) => {
    const item = socialMedia.find((s) => s._id === id);
    if (!item) return;

    try {
      // TODO: Replace with your actual API call
      /*
      const response = await fetch(`YOUR_API/social-media/${id}/toggle`, {
        method: 'PATCH'
      });

      if (!response.ok) throw new Error('Failed to toggle');
      */

      setSocialMedia(
        socialMedia.map((s) =>
          s._id === id ? { ...s, isActive: !s.isActive } : s
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-900 mb-2">
              Social Media Links
            </h1>
            <p className="text-red-700">
              Manage your social media platform links
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Platform
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Platforms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {socialMedia.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Links</p>
                <p className="text-2xl font-bold text-gray-900">
                  {socialMedia.filter((s) => s.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inactive Links</p>
                <p className="text-2xl font-bold text-gray-900">
                  {socialMedia.filter((s) => !s.isActive).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialMedia.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`${
                      platformColors[item.platform]
                    } text-white p-3 rounded-lg`}
                  >
                    {platformIcons[item.platform] || (
                      <Globe className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {item.platform}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleActive(item._id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="mb-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1 break-all"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  {item.url}
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {socialMedia.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-sm border border-red-100 p-12 text-center">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No social media links yet</p>
              <button
                onClick={handleAddNew}
                className="mt-4 text-red-600 hover:text-red-700 font-medium"
              >
                Add your first platform
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {editingItem ? "Edit Platform" : "Add Platform"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Platform *
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="website">Website</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Our Facebook Page"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Active Status
                        </p>
                        <p className="text-sm text-gray-500">
                          Show this link publicly
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        formData.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {formData.isActive ? "Active" : "Inactive"}
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  {editingItem ? "Update" : "Add"} Platform
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
