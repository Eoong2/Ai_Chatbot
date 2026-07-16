import type { DatasetResult } from '../types/chat';

interface DataSidebarProps {
  apiResponse?: {
    data?: {
      answer?: string;
      resultCount?: number;
      results?: DatasetResult[];
    };
  };
}

export const DataSidebar = ({ apiResponse }: DataSidebarProps) => {
  const items = apiResponse?.data?.results || [];

  return (
    <aside className="w-80 bg-white p-5 rounded-2xl border border-gray-200">
      <h2 className="font-bold text-lg mb-6">답변에 사용된 데이터셋 {items.length > 0 && `(${items.length})`}</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-2xl hover:border-gray-300 transition-all">
            {/* 상단 태그 및 출처 */}
            <div className="flex justify-between items-center mb-3">
              <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">{item.format || item.listType}</span>
              <span className="text-[11px] text-gray-400">{item.institution}</span>
            </div>

            {/* 제목 및 설명 */}
            <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
            <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
              {item.description}
            </p>

            {/* 고유 ID (참고용) */}
            <div className="flex flex-wrap gap-1.5 mb-4">
               <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                 ID: {item.publicDataPk}
               </span>
            </div>

            {/* 상세보기 버튼 */}
            <button 
              onClick={() => window.open(item.url, '_blank')}
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border transition-colors flex items-center justify-center">
              데이터 상세보기 →
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-sm text-gray-400 text-center mt-10">질문을 입력하시면 추천 데이터셋이 표시됩니다.</div>
        )}
      </div>
    </aside>
  );
};