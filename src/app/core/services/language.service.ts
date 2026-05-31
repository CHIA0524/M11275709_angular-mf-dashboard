import { Injectable, signal } from '@angular/core';

export type SupportedLanguage = 'zh-TW' | 'en-US' | 'ja-JP';
export type TranslationKey = string;

export interface LanguageOption {
  code: SupportedLanguage;
  nativeLabel: string;
  englishLabel: string;
}

interface LanguageChangedDetail {
  sourceId: string;
  language: SupportedLanguage;
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  'zh-TW': {
    '載入資料中...': '載入資料中...',
    '儀表板洞察': '儀表板洞察',
    '情境模擬': '情境模擬',
    '配置解讀': '配置解讀',
    '資料模式': '資料模式',
    '假資料即時推演': '假資料即時推演',
    '圖表數量': '圖表數量',
    '2 組主視覺分析': '2 組主視覺分析',
    '模擬能力': '模擬能力',
    '支援公式情境切換': '支援公式情境切換',
    '總資產': '總資產',
    '月收入': '月收入',
    '月支出': '月支出',
    '淨值': '淨值',
    '本月': '本月',
    '（非本月資料）': '（非本月資料）',
    '淨資產趨勢分析': '淨資產趨勢分析',
    '歷史資產變化': '歷史資產變化',
    '近 6 個月': '近 6 個月',
    '近 1 年': '近 1 年',
    '近 2 年': '近 2 年',
    '近 3 年': '近 3 年',
    '折線圖': '折線圖',
    '長條圖': '長條圖',
    '載入圖表...': '載入圖表...',
    '支出分類分析': '支出分類分析',
    '查看本月': '查看本月',
    '模擬高運算場景：': '模擬高運算場景：',
    '此頁面包含複雜的圖表渲染與資料運算，用於測試微前端架構下的效能表現。': '此頁面包含複雜的圖表渲染與資料運算，用於測試微前端架構下的效能表現。'
  },
  'en-US': {
    '載入資料中...': 'Loading data...',
    '儀表板洞察': 'Dashboard insights',
    '情境模擬': 'Scenario planning',
    '配置解讀': 'Allocation review',
    '資料模式': 'Data mode',
    '假資料即時推演': 'Live mock-data simulation',
    '圖表數量': 'Chart count',
    '2 組主視覺分析': 'Two primary visual analyses',
    '模擬能力': 'Simulation capability',
    '支援公式情境切換': 'Supports formula-based scenario switching',
    '總資產': 'Total assets',
    '月收入': 'Monthly income',
    '月支出': 'Monthly expense',
    '淨值': 'Net worth',
    '本月': 'Current month',
    '（非本月資料）': '(not current month)',
    '淨資產趨勢分析': 'Net worth trend analysis',
    '歷史資產變化': 'Historical asset changes',
    '近 6 個月': 'Last 6 months',
    '近 1 年': 'Last 1 year',
    '近 2 年': 'Last 2 years',
    '近 3 年': 'Last 3 years',
    '折線圖': 'Line chart',
    '長條圖': 'Bar chart',
    '載入圖表...': 'Loading chart...',
    '支出分類分析': 'Expense breakdown analysis',
    '查看本月': 'View current month',
    '模擬高運算場景：': 'High-compute simulation:',
    '此頁面包含複雜的圖表渲染與資料運算，用於測試微前端架構下的效能表現。': 'This page contains heavier chart rendering and data processing to stress-test the microfrontend architecture.'
  },
  'ja-JP': {
    '載入資料中...': 'データを読み込み中...',
    '儀表板洞察': 'ダッシュボード洞察',
    '情境模擬': 'シナリオ計画',
    '配置解讀': '配分レビュー',
    '資料模式': 'データモード',
    '假資料即時推演': 'モックデータ即時シミュレーション',
    '圖表數量': 'チャート数',
    '2 組主視覺分析': '主要な可視化を2種搭載',
    '模擬能力': 'シミュレーション機能',
    '支援公式情境切換': '数式ベースのシナリオ切替に対応',
    '總資產': '総資産',
    '月收入': '月間収入',
    '月支出': '月間支出',
    '淨值': '純資産',
    '本月': '今月',
    '（非本月資料）': '（今月以外のデータ）',
    '淨資產趨勢分析': '純資産トレンド分析',
    '歷史資產變化': '資産の推移',
    '近 6 個月': '直近6か月',
    '近 1 年': '直近1年',
    '近 2 年': '直近2年',
    '近 3 年': '直近3年',
    '折線圖': '折れ線グラフ',
    '長條圖': '棒グラフ',
    '載入圖表...': 'グラフを読み込み中...',
    '支出分類分析': '支出カテゴリ分析',
    '查看本月': '今月を見る',
    '模擬高運算場景：': '高負荷シミュレーション:',
    '此頁面包含複雜的圖表渲染與資料運算，用於測試微前端架構下的效能表現。': 'このページには重いチャート描画とデータ計算が含まれ、マイクロフロントエンド構成の性能確認に使われます。'
  }
};

const supportedLanguages: LanguageOption[] = [
  { code: 'zh-TW', nativeLabel: '繁體中文', englishLabel: 'Traditional Chinese' },
  { code: 'en-US', nativeLabel: 'English', englishLabel: 'English' },
  { code: 'ja-JP', nativeLabel: '日本語', englishLabel: 'Japanese' }
];

const storageKey = 'workspace.language';
const languageChangedEvent = 'microfrontends:language-changed';

const isSupportedLanguage = (value: string | null | undefined): value is SupportedLanguage =>
  value === 'zh-TW' || value === 'en-US' || value === 'ja-JP';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly supportedLanguages = supportedLanguages;
  readonly currentLanguage = signal<SupportedLanguage>(this.resolveInitialLanguage());
  private readonly sourceId = Math.random().toString(36).slice(2);

  constructor() {
    this.applyLanguage(this.currentLanguage(), false);

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange);
      window.addEventListener(languageChangedEvent, this.handleLanguageChanged as EventListener);
    }
  }

  translate(key: TranslationKey): string {
    return translations[this.currentLanguage()][key] ?? translations['zh-TW'][key] ?? key;
  }

  setLanguage(language: SupportedLanguage): void {
    this.applyLanguage(language, true);
  }

  getLanguageOption(language: SupportedLanguage): LanguageOption {
    return this.supportedLanguages.find((option) => option.code === language) ?? this.supportedLanguages[0];
  }

  private resolveInitialLanguage(): SupportedLanguage {
    if (typeof localStorage !== 'undefined') {
      const storedLanguage = localStorage.getItem(storageKey);
      if (isSupportedLanguage(storedLanguage)) {
        return storedLanguage;
      }
    }

    return 'zh-TW';
  }

  private applyLanguage(language: SupportedLanguage, shouldBroadcast: boolean): void {
    this.currentLanguage.set(language);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, language);
    }

    if (shouldBroadcast && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent<LanguageChangedDetail>(languageChangedEvent, {
          detail: {
            sourceId: this.sourceId,
            language
          }
        })
      );
    }
  }

  private handleStorageChange = (event: StorageEvent): void => {
    if (event.key !== storageKey || !isSupportedLanguage(event.newValue)) {
      return;
    }

    this.applyLanguage(event.newValue, false);
  };

  private handleLanguageChanged = (event: Event): void => {
    const customEvent = event as CustomEvent<LanguageChangedDetail>;

    if (!customEvent.detail || customEvent.detail.sourceId === this.sourceId) {
      return;
    }

    this.applyLanguage(customEvent.detail.language, false);
  };
}