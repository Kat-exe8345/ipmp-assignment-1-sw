import { User, Mail, Calendar } from "lucide-react";

export function ProfileSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-blue-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-6">
            <div>
              <p className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </p>
              <p className="text-lg text-gray-900 dark:text-white">John Doe</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    john@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Joined
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    Jan 15, 2024
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
