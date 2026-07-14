export interface DatasetItem {
  [key: string]: any;
}

interface DataSidebarProps {
  apiResponse?: {
    data?: {
      message?: string;
      items?: DatasetItem[];
    };
  };
}

const DataSidebar = ({ apiResponse }: DataSidebarProps) => {
  const items = apiResponse?.data?.items || [];
  const message = apiResponse?.data?.message || "데이터를 불러오는 중입니다.";

  return (
    <aside className="w-80 bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="font-bold mb-6 text-lg">답변에 사용된 데이터셋</h2>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-xs text-gray-400">데이터가 없습니다.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                {Object.values(item)[1] || "정보"}
              </h3>
              
              <p className="text-xs text-gray-500 mb-2">
                {message}
              </p>

              <div className="text-[10px] text-gray-400 border-t pt-2 mt-2">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-0.5">
                    <span className="font-medium text-gray-600">{key}</span>
                    <span className="text-gray-800">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default DataSidebar;