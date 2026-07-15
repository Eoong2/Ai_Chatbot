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

export const DataSidebar = ({ apiResponse }: DataSidebarProps) => {
  const items = apiResponse?.data?.items || [];

  return (
    <aside className="w-80 bg-white p-5 rounded-2xl border border-gray-200">
      <h2 className="font-bold text-lg mb-6">답변에 사용된 데이터셋</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-2xl hover:border-gray-300 transition-all">
            {/* 상단 태그 및 출처 */}
            <div className="flex justify-between items-center mb-3">
              <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">교통</span>
              <span className="text-[11px] text-gray-400">부산 공공데이터</span>
            </div>

            {/* 제목 및 설명 */}
            <h3 className="font-bold text-gray-900 text-base mb-2">부산 도시철도 역별 승하차 정보</h3>
            <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
              부산 도시철도의 역별 승하차 인원과 시간대별 이용현황을 제공합니다.
            </p>

            {/* 해시태그 */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['#지하철', '#교통', '#승하차'].map(tag => (
                <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* 상세 정보 리스트 */}
            <div className="space-y-1.5 text-[12px] text-gray-600 mb-5 border-t pt-4">
              <div className="flex justify-between"><span>제공기관</span><span className="text-gray-900">부산교통공사</span></div>
              <div className="flex justify-between"><span>조회수</span><span className="text-gray-900">12,541</span></div>
              <div className="flex justify-between"><span>최신 수정일</span><span className="text-gray-900">2026-07-04</span></div>
            </div>

            {/* 상세보기 버튼 */}
            <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border transition-colors flex items-center justify-center">
              데이터 상세보기 →
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};