import { Settings, Bell, Lock, Eye } from "lucide-react";

export function AccountSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-blue-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Privacy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Control who can see your profile
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium transition"
            >
              Manage
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage notification preferences
                </p>
              </div>
            </div>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Password
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Change your password regularly
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium transition"
            >
              Change
            </button>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-700/10 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="font-semibold text-red-900 dark:text-gray-300 mb-3">
            Danger Zone
          </h3>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
