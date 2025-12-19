import { useState } from "react";
import { Mail, Clock, Search, Users } from "lucide-react";
import { useFetchAllSubscriptions } from "@/api/hooks/subscribtion";

interface Subscription {
  id: number;
  email: string;
  subscribedAt: string;
}

export default function Subscription() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: subscriptions } = useFetchAllSubscriptions();
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const filteredSubscriptions = subscriptions?.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-full   rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-6xl  mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-900 mb-2">
            Subscription Dashboard
          </h1>
          <p className="text-red-700">Manage and track your subscribers</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-red-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-red-900">
                {subscriptions?.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Subscribed At
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredSubscriptions?.length &&
                filteredSubscriptions?.length > 0 ? (
                  filteredSubscriptions?.map((sub) => (
                    <tr
                      key={sub._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {sub.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-slate-800 font-medium">
                            {sub.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(sub.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
