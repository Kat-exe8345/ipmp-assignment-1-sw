import { LayoutDashboard, Plus, Archive } from "lucide-react";

export function BoardsSection() {
  const dummyBoards = [
    { id: 1, name: "Project A", description: "Main project", tasks: 12 },
    { id: 2, name: "Project B", description: "Secondary project", tasks: 8 },
    { id: 3, name: "Project C", description: "Future initiatives", tasks: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Boards
          </h2>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          New Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyBoards.map((board) => (
          <div
            key={board.id}
            className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition cursor-pointer group"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition">
              {board.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {board.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {board.tasks} tasks
              </span>
              <Archive className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
